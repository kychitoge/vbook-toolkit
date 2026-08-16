/**
 * vBook Rule Tester Core Engine
 * Ported from vbook-rule-tester extension by duongden
 */

export interface RuleItem {
  line: number;
  source: string;
  pattern: string;
  translation: string;
}

export interface CompiledRule {
  regex: string;
  types: string[];
  approximate: boolean;
  literalLength: number;
  wildcardCapacity: number;
}

export interface MatchResult extends RuleItem {
  original: string;
  translated: string;
  index: number;
  approximate: boolean;
  literalLength: number;
  wildcardCapacity: number;
}

export interface ExampleResult {
  input: string;
  output: string;
}

export interface ValidationIssue {
  line: number;
  source: string;
  code: string;
  message: string;
  hard: boolean;
  pattern?: string;
  replacement?: string;
}

export interface ValidationSummary {
  issues: ValidationIssue[];
  validCount: number;
  hardCount: number;
  warningCount: number;
}

/**
 * Phân tích danh sách Rule từ chuỗi văn bản (hỗ trợ ' = ', '=', '"..."="..."', tab)
 */
export function parseRulesFromText(content: string): RuleItem[] {
  const lines = content.split(/\r?\n/);
  const rules: RuleItem[] = [];

  for (let line = 0; line < lines.length; line++) {
    const source = lines[line];
    const trimmed = source.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('===')) {
      continue;
    }

    // 1. Định dạng có bọc dấu ngoặc kép: "pattern"="translation" hoặc "pattern" = "translation"
    if (trimmed.startsWith('"')) {
      const match = trimmed.match(/^"([^"]+)"\s*=\s*"([^"]*)"$/);
      if (match) {
        rules.push({
          line,
          source,
          pattern: match[1].trim(),
          translation: match[2].trim(),
        });
        continue;
      }
    }

    // 2. Định dạng dấu bằng: pattern = translation hoặc pattern=translation
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      let pattern = trimmed.slice(0, eqIndex).trim();
      let translation = trimmed.slice(eqIndex + 1).trim();

      // Bỏ dấu ngoặc kép bao quanh nếu có
      if (pattern.startsWith('"') && pattern.endsWith('"')) {
        pattern = pattern.slice(1, -1);
      }
      if (translation.startsWith('"') && translation.endsWith('"')) {
        translation = translation.slice(1, -1);
      }

      if (pattern) {
        rules.push({
          line,
          source,
          pattern,
          translation,
        });
        continue;
      }
    }

    // 3. Định dạng phân tách bằng phím Tab (\t)
    const tabIndex = trimmed.indexOf('\t');
    if (tabIndex > 0) {
      let pattern = trimmed.slice(0, tabIndex).trim();
      let translation = trimmed.slice(tabIndex + 1).trim();
      if (pattern.startsWith('"') && pattern.endsWith('"')) pattern = pattern.slice(1, -1);
      if (translation.startsWith('"') && translation.endsWith('"')) translation = translation.slice(1, -1);
      if (pattern) {
        rules.push({
          line,
          source,
          pattern,
          translation,
        });
      }
    }
  }

  return rules;
}

/**
 * Chuyển ký tự chữ số Hán tự sang chữ số Latin
 */
export function digit(c: string): string {
  const map: Record<string, string> = {
    '〇': '0',
    '零': '0',
    '一': '1',
    '二': '2',
    '两': '2',
    '兩': '2',
    '三': '3',
    '四': '4',
    '五': '5',
    '六': '6',
    '七': '7',
    '八': '8',
    '九': '9',
  };
  return map[c] ?? c;
}

/**
 * Chuyển số tiếng Trung dạng Hán tự (chính xác với BigInt)
 */
export function chineseNumber(s: string): string {
  if (/^\d+$/.test(s)) return s;
  if (!/[十百千万萬亿億兆]/.test(s)) {
    return [...s].map(digit).join('');
  }

  const small: Record<string, bigint> = { 十: 10n, 百: 100n, 千: 1000n };
  const large: Record<string, bigint> = {
    万: 10000n,
    萬: 10000n,
    亿: 100000000n,
    億: 100000000n,
    兆: 1000000000000n,
  };

  let total = 0n;
  let section = 0n;
  let num = 0n;

  for (const c of s) {
    if (c in small) {
      if (num === 0n) num = 1n;
      section += num * small[c];
      num = 0n;
    } else if (c in large) {
      section += num;
      if (section === 0n) section = 1n;
      total += section * large[c];
      section = 0n;
      num = 0n;
    } else {
      num = num * 10n + BigInt(digit(c) || '0');
    }
  }

  return String(total + section + num);
}

/**
 * Chuyển giá trị capture theo loại token
 */
export function convert(value: string, type: string): string {
  if (type === 'n') return chineseNumber(value);
  if (type === 'y') return [...value].map(digit).join('');
  if (type === 'L') {
    const labelMap: Record<string, string> = {
      章: 'Chương',
      卷: 'Quyển',
      集: 'Tập',
      节: 'Tiết',
      節: 'Tiết',
      幕: 'Màn',
      回: 'Hồi',
      折: 'Chiết',
    };
    return labelMap[value] || value;
  }
  return value;
}

export function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Biên dịch Pattern vBook QT thành RegExp có khả năng capture và tính priority
 */
export function compile(pattern: string): CompiledRule {
  let out = '';
  const types: string[] = [];
  let approximate = false;
  let literalLength = 0;
  let wildcardCapacity = 0;
  let i = 0;

  while (i < pattern.length) {
    if (pattern[i] === '<') {
      const end = pattern.indexOf('>', i);
      if (end < 0) throw new Error('Unclosed tag');

      const spec = pattern.slice(i + 1, end);
      const parts = spec.split(':');
      const choices = parts[0].split('|');
      const range = parts[1] || '';

      let min = 1;
      let max = 12;
      if (range) {
        const mm = range.split('-').map(Number);
        min = mm[0];
        max = mm[1] || mm[0];
      }

      const numeric = choices.every((x) => x === 'n' || x === 'y');
      const label = choices.every((x) => x === 'L');
      let body: string;
      let type: string;

      if (numeric) {
        body = '[〇零一二两兩三四五六七八九十百千万萬亿億兆0-9]';
        type = choices[0];
      } else if (label) {
        body = '[章卷集节節幕回折]';
        type = 'L';
      } else {
        body = '[\\p{Script=Han}A-Za-z0-9]';
        type = 'dict';
        approximate = true;
      }

      out += '(' + body + '{' + min + ',' + max + '})';
      types.push(type);
      wildcardCapacity += max;
      i = end + 1;
      continue;
    }

    if (pattern[i] === '(') {
      const end = pattern.indexOf(')', i);
      if (end < 0) throw new Error('Unclosed parentheses');

      const raw = pattern.slice(i + 1, end).split('|');
      const alternatives = raw.map(escapeRe).join('|');
      const optional = pattern[end + 1] === '?';

      out += '(?:' + alternatives + ')' + (optional ? '?' : '');
      if (!optional) literalLength += Math.max(...raw.map((x) => x.length));
      i = end + 1 + (optional ? 1 : 0);
      continue;
    }

    out += escapeRe(pattern[i]);
    literalLength++;
    i++;
  }

  return { regex: out, types, approximate, literalLength, wildcardCapacity };
}

/**
 * Thực thi kiểm tra văn bản tiếng Trung trên toàn bộ tập rule
 */
export function executeRules(
  rules: RuleItem[],
  text: string
): { matches: MatchResult[]; hasApproximate: boolean } {
  const trimmed = text.trim();
  if (!trimmed) return { matches: [], hasApproximate: false };

  const matches: MatchResult[] = [];
  let hasApproximate = false;

  for (const rule of rules) {
    try {
      const compiled = compile(rule.pattern);
      const re = new RegExp(compiled.regex, 'gu');
      let m: RegExpExecArray | null;

      while ((m = re.exec(trimmed))) {
        const values = m.slice(1).map((v, idx) => convert(v, compiled.types[idx]));
        const translated = rule.translation.replace(/\{(\d+)\}/g, (_, n) => values[+n] ?? '{' + n + '}');

        matches.push({
          ...rule,
          original: m[0],
          translated,
          index: m.index,
          approximate: compiled.approximate,
          literalLength: compiled.literalLength,
          wildcardCapacity: compiled.wildcardCapacity,
        });

        hasApproximate ||= compiled.approximate;
        if (!m[0].length) re.lastIndex++;
      }
    } catch {
      // Bỏ qua rule không compile được
    }
  }

  // Sắp xếp theo ưu tiên chuẩn của QuickTranslate
  matches.sort(
    (a, b) =>
      a.index - b.index ||
      b.literalLength - a.literalLength ||
      a.wildcardCapacity - b.wildcardCapacity ||
      b.original.length - a.original.length ||
      a.line - b.line
  );

  // Lọc non-overlapping matches
  const selected: MatchResult[] = [];
  let cursor = 0;

  while (true) {
    const candidates = matches.filter((m) => m.index >= cursor);
    if (!candidates.length) break;

    const firstIndex = candidates[0].index;
    const chosen = candidates.find((m) => m.index === firstIndex);
    if (!chosen) break;

    selected.push(chosen);
    cursor = chosen.index + Math.max(1, chosen.original.length);
  }

  return { matches: selected, hasApproximate };
}

export function matchRules(text: string, rules: RuleItem[]): MatchResult[] {
  return executeRules(rules, text).matches;
}

/**
 * Soát lỗi cú pháp toàn bộ danh sách quy tắc
 */
export function validateAllRules(content: string): ValidationSummary {
  const rules = parseRulesFromText(content);
  const issues: ValidationIssue[] = [];

  for (const rule of rules) {
    // 1. Kiểm tra pattern rỗng
    if (!rule.pattern) {
      issues.push({
        line: rule.line,
        source: rule.source,
        code: 'EMPTY_PATTERN',
        message: 'Pattern không được để trống',
        hard: true,
      });
      continue;
    }

    // 2. Thử compile regex
    try {
      const compiled = compile(rule.pattern);

      // Kiểm tra tham chiếu {n} trong translation
      const refMatches = [...rule.translation.matchAll(/\{(\d+)\}/g)];
      for (const rm of refMatches) {
        const refIdx = Number(rm[1]);
        if (refIdx >= compiled.types.length) {
          issues.push({
            line: rule.line,
            source: rule.source,
            code: 'INVALID_REF_INDEX',
            message: `Tham chiếu {${refIdx}} vượt quá số lượng token capture (${compiled.types.length})`,
            hard: true,
            pattern: rule.pattern,
            replacement: rule.translation,
          });
        }
      }

      // Kiểm tra wildcard liên tiếp không an toàn
      if (/<[^>]+><[^>]+>/.test(rule.pattern)) {
        issues.push({
          line: rule.line,
          source: rule.source,
          code: 'MULTIPLE_CONSECUTIVE_WILDCARDS',
          message: 'Hai wildcard đứng liền nhau có thể gây chậm hoặc nuốt từ',
          hard: false,
          pattern: rule.pattern,
          replacement: rule.translation,
        });
      }
    } catch (err: any) {
      issues.push({
        line: rule.line,
        source: rule.source,
        code: 'SYNTAX_ERROR',
        message: `Lỗi cú pháp: ${err.message || 'Không thể phân tích pattern'}`,
        hard: true,
        pattern: rule.pattern,
        replacement: rule.translation,
      });
    }
  }

  const hardCount = issues.filter((i) => i.hard).length;
  const warningCount = issues.length - hardCount;
  const validCount = Math.max(0, rules.length - hardCount);

  return {
    issues,
    validCount,
    hardCount,
    warningCount,
  };
}

/**
 * Tự động tạo câu ví dụ minh họa Input -> Output từ Pattern
 */
export function makeExample(rule: { pattern: string; translation: string }): ExampleResult | null {
  try {
    let input = '';
    let i = 0;

    while (i < rule.pattern.length) {
      if (rule.pattern[i] === '<') {
        const end = rule.pattern.indexOf('>', i);
        if (end < 0) return null;

        const spec = rule.pattern.slice(i + 1, end);
        const parts = spec.split(':');
        const choices = parts[0].split('|');
        const min = Math.max(1, Number((parts[1] || '1').split('-')[0]) || 1);

        let value: string;
        if (choices.every((x) => x === 'n' || x === 'y')) {
          value = '一'.repeat(min);
        } else if (choices.every((x) => x === 'L')) {
          value = '章';
        } else {
          value = '人'.repeat(min);
        }

        input += value;
        i = end + 1;
        continue;
      }

      if (rule.pattern[i] === '(') {
        const end = rule.pattern.indexOf(')', i);
        if (end < 0) return null;

        input += rule.pattern.slice(i + 1, end).split('|')[0];
        i = end + 1;
        if (rule.pattern[i] === '?') i++;
        continue;
      }

      input += rule.pattern[i++];
    }

    const compiled = compile(rule.pattern);
    const match = new RegExp('^' + compiled.regex + '$', 'u').exec(input);
    if (!match) return null;

    const values = match.slice(1).map((v, index) => convert(v, compiled.types[index]));
    const output = rule.translation.replace(/\{(\d+)\}/g, (_, n) => values[+n] ?? '{' + n + '}');

    return { input, output };
  } catch {
    return null;
  }
}
