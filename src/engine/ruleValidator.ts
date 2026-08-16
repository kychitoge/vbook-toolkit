/**
 * vBook Rule Validator
 * Ported from vbook-rule-tester extension by duongden
 */

import { RuleItem } from './ruleEngine';

export interface ValidationIssue {
  code: string;
  message: string;
  hard: boolean;
}

export interface RuleWithIssue extends RuleItem, ValidationIssue {}

export interface ValidationSummary {
  validCount: number;
  hardCount: number;
  warningCount: number;
  issues: RuleWithIssue[];
}

/**
 * Tìm ký tự neo (Anchor) của một pattern
 */
export function findAnchor(pattern: string): string {
  let clean = '';
  let depth = 0;

  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];

    if (c === '<') {
      const end = pattern.indexOf('>', i);
      if (end < 0) break;
      i = end;
      continue;
    }

    if (c === '(') {
      depth++;
      continue;
    }

    if (c === ')') {
      depth = Math.max(0, depth - 1);
      if (pattern[i + 1] === '?') i++;
      continue;
    }

    if (!depth && !/[\s\d.,，．%"“”'：:;；!?！？]/u.test(c)) {
      clean += c;
    }
  }

  return clean;
}

/**
 * Soát lỗi cú pháp của một quy tắc riêng lẻ
 */
export function validateOneRule(rule: RuleItem): ValidationIssue[] {
  const out: ValidationIssue[] = [];
  const tokens: { spec: string; choices: string[]; range?: string }[] = [];
  let syntaxError = '';
  const tokenRe = /<([^>]*)>/g;
  let m: RegExpExecArray | null;

  while ((m = tokenRe.exec(rule.pattern))) {
    const spec = m[1];
    const parts = spec.split(':');
    const choices = parts[0].split('|');

    if (!choices.length || choices.some((x) => !['n', 'y', 'L', 'ne', 'pn', 'vp', 'hv', 'w'].includes(x))) {
      syntaxError = 'Token không được hỗ trợ: <' + spec + '>';
    }

    if (parts.length > 2) {
      syntaxError = 'Cú pháp giới hạn token không hợp lệ: <' + spec + '>';
    }

    if (parts[1]) {
      const mm = parts[1].split('-').map(Number);
      if (mm.some((x) => !Number.isInteger(x) || x < 1) || mm.length > 2 || (mm[1] && mm[0] > mm[1])) {
        syntaxError = 'Giới hạn token không hợp lệ: <' + spec + '>';
      }
    }

    tokens.push({ spec, choices, range: parts[1] });
  }

  if (
    (rule.pattern.match(/</g) || []).length !== tokens.length ||
    (rule.pattern.match(/>/g) || []).length !== tokens.length
  ) {
    syntaxError = 'Thiếu dấu < hoặc > trong token.';
  }

  let depth = 0;
  for (const c of rule.pattern) {
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (depth < 0) syntaxError = 'Nhóm ngoặc không cân bằng.';
  }
  if (depth !== 0) syntaxError = 'Nhóm ngoặc không cân bằng.';

  if (syntaxError) out.push({ code: 'syntax', message: syntaxError, hard: true });

  if (!tokens.length) {
    out.push({ code: 'no_wildcard', message: 'Mẫu cần ít nhất một wildcard.', hard: true });
  }

  const anchor = findAnchor(rule.pattern);
  if (!anchor) {
    out.push({ code: 'no_anchor', message: 'Mẫu cần ít nhất một ký tự cố định để tìm kiếm.', hard: true });
  } else if ([...anchor].every((c) => '的了是不存在在上下个個'.includes(c))) {
    out.push({
      code: 'common_anchor',
      message: '“' + anchor + '” quá phổ biến — rule có thể kích hoạt trong hầu hết câu.',
      hard: true,
    });
  }

  if (rule.translation.includes('¦')) {
    out.push({ code: 'multi_meaning', message: 'Rule chỉ được có một bản dịch, không dùng ¦.', hard: true });
  }

  const refs = [...rule.translation.matchAll(/\{(\d+)\}/g)].map((x) => +x[1]);
  if (refs.some((x) => x >= tokens.length)) {
    out.push({ code: 'bad_placeholder', message: 'Bản dịch tham chiếu capture không tồn tại.', hard: true });
  }

  for (let i = 0; i < tokens.length; i++) {
    if (!refs.includes(i)) {
      out.push({ code: 'unused_capture', message: 'Capture {' + i + '} chưa được dùng trong bản dịch.', hard: true });
    }
  }

  for (const token of tokens) {
    if (['ne', 'pn', 'vp', 'w'].some((x) => token.choices.includes(x)) && !token.range) {
      out.push({
        code: 'unbounded_wildcard',
        message: 'Wildcard từ điển <' + token.spec + '> chưa giới hạn độ dài.',
        hard: false,
      });
    }
  }

  return out;
}

/**
 * Soát lỗi toàn bộ tập Rule, bao gồm cả phát hiện trùng lặp và nhóm neo quá đông
 */
export function validateAllRules(rules: RuleItem[]): ValidationSummary {
  const hard: RuleWithIssue[] = [];
  const warnings: RuleWithIssue[] = [];
  const patternMap = new Map<string, RuleItem[]>();
  const anchorMap = new Map<string, RuleItem[]>();

  for (const rule of rules) {
    const issues = validateOneRule(rule);
    for (const issue of issues) {
      if (issue.hard) {
        hard.push({ ...rule, ...issue });
      } else {
        warnings.push({ ...rule, ...issue });
      }
    }

    const same = patternMap.get(rule.pattern) || [];
    same.push(rule);
    patternMap.set(rule.pattern, same);

    const anchor = findAnchor(rule.pattern);
    if (anchor) {
      const list = anchorMap.get(anchor) || [];
      list.push(rule);
      anchorMap.set(anchor, list);
    }
  }

  // Cảnh báo pattern bị lặp
  for (const list of patternMap.values()) {
    if (list.length > 1) {
      for (const rule of list) {
        warnings.push({
          ...rule,
          code: 'duplicate',
          message: 'Pattern bị lặp lại trong file.',
          hard: false,
        });
      }
    }
  }

  // Cảnh báo neo quá đông (> 20 rule)
  for (const [anchor, list] of anchorMap) {
    if (list.length > 20) {
      for (const rule of list) {
        warnings.push({
          ...rule,
          code: 'crowded_anchor',
          message: 'Quá nhiều rule dùng neo “' + anchor + '” (' + list.length + ' rule); có thể làm chậm quá trình dịch.',
          hard: false,
        });
      }
    }
  }

  const validLineSet = new Set<number>(rules.map((r) => r.line));
  for (const issue of hard) {
    validLineSet.delete(issue.line);
  }

  const allIssues = [...hard, ...warnings];

  return {
    validCount: validLineSet.size,
    hardCount: hard.length,
    warningCount: warnings.length,
    issues: allIssues,
  };
}
