import React, { useState, useRef, useMemo } from 'react';
import {
  Code2,
  Play,
  CheckCircle2,
  AlertTriangle,
  Upload,
  RotateCcw,
  Sparkles,
  Download,
  Copy,
  Check,
  Trash2,
  FileText,
  Info,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { useToast } from '../components/Toast';
import {
  parseRulesFromText,
  matchRules,
  validateAllRules,
  MatchResult,
  ValidationSummary,
  ValidationIssue,
} from '../engine/ruleEngine';
import { SAMPLE_RULES_CONTENT } from '../config/sampleRules';

export const RuleTesterPage: React.FC = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [ruleSource, setRuleSource] = useState<string>(SAMPLE_RULES_CONTENT);
  const [fileName, setFileName] = useState<string>('sample_rules.txt');
  const [testText, setTestText] = useState<string>('我有36台电脑，明天去第5层楼。');
  const [testResults, setTestResults] = useState<MatchResult[]>([]);
  const [validationSummary, setValidationSummary] = useState<ValidationSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'test' | 'validate'>('test');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [displayIssueLimit, setDisplayIssueLimit] = useState<number>(60);

  // Parse rules client-side
  const parsedRules = useMemo(() => {
    return parseRulesFromText(ruleSource);
  }, [ruleSource]);

  // Kiểm tra xem có kết quả nào là approximate không
  const hasApproximate = useMemo(() => {
    return testResults.some((r) => r.approximate);
  }, [testResults]);

  // Xử lý nạp bộ rule mẫu
  const handleLoadSample = () => {
    setRuleSource(SAMPLE_RULES_CONTENT);
    setFileName('sample_rules.txt');
    setTestText('我有36台电脑，明天去第5层楼。');
    setTestResults([]);
    setValidationSummary(null);
    showToast('Đã nạp bộ quy tắc mẫu', 'success');
  };

  // Đọc file .txt tải lên
  const handleFileProcess = (file: File) => {
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.dic')) {
      showToast('Vui lòng chỉ tải lên file định dạng .txt hoặc .dic', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setRuleSource(content);
      setFileName(file.name);
      setTestResults([]);
      setValidationSummary(null);
      showToast(`Đã tải lên "${file.name}"`, 'success');
    };
    reader.onerror = () => {
      showToast('Không thể đọc nội dung file', 'error');
    };
    reader.readAsText(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileProcess(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Xuất file .txt đã chỉnh sửa
  const handleExportFile = () => {
    if (!ruleSource.trim()) {
      showToast('Không có nội dung để xuất file', 'warning');
      return;
    }
    const blob = new Blob([ruleSource], { type: 'text/plain;charset=utf-8' });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName || 'vbook_rules.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    showToast('Đã xuất file .txt thành công', 'success');
  };

  // Chạy kiểm tra thử nghiệm dịch trên câu mẫu
  const handleRunTest = () => {
    if (!testText.trim()) {
      showToast('Vui lòng nhập câu tiếng Trung để thử nghiệm', 'warning');
      return;
    }

    if (parsedRules.length === 0) {
      showToast('Chưa có quy tắc nào được nạp', 'warning');
      return;
    }

    const results = matchRules(testText, parsedRules);
    setTestResults(results);
    setActiveTab('test');

    if (results.length > 0) {
      showToast(`Khớp ${results.length} đoạn quy tắc`, 'success');
    } else {
      showToast('Không có quy tắc nào khớp với câu này', 'info');
    }
  };

  // Chạy soát lỗi toàn bộ rule
  const handleValidateRules = () => {
    if (!ruleSource.trim()) {
      showToast('Vui lòng nhập quy tắc cần kiểm tra', 'warning');
      return;
    }

    const summary = validateAllRules(ruleSource);
    setValidationSummary(summary);
    setDisplayIssueLimit(60);
    setActiveTab('validate');

    if (summary.issues.length === 0) {
      showToast(`Hoàn hảo! ${summary.validCount} rule đều hợp lệ`, 'success');
    } else {
      showToast(
        `Phát hiện ${summary.hardCount} lỗi và ${summary.warningCount} cảnh báo`,
        summary.hardCount > 0 ? 'error' : 'warning'
      );
    }
  };

  // Tạo ví dụ minh họa tự động cho issue
  const makeExample = (issue: { code: string; pattern?: string; replacement?: string }) => {
    if (issue.code === 'NE_NUMBER_IN_REPLACEMENT') {
      return {
        input: '36台电脑',
        output: '36 chiếc {1}',
      };
    }
    if (issue.code === 'MULTIPLE_CONSECUTIVE_WILDCARDS') {
      return {
        input: '<w><w>',
        output: 'Không thể tách từ chính xác',
      };
    }
    return null;
  };

  // Xóa một rule lỗi khỏi danh sách
  const handleDeleteRule = (lineIdx: number, source: string) => {
    const lines = ruleSource.split(/\r?\n/);
    if (lines[lineIdx] && lines[lineIdx].trim() === source.trim()) {
      lines.splice(lineIdx, 1);
      const newSource = lines.join('\n');
      setRuleSource(newSource);
      showToast('Đã xóa rule khỏi danh sách', 'success');
      // Chạy lại validate nếu đang ở tab validate
      if (activeTab === 'validate') {
        const summary = validateAllRules(newSource);
        setValidationSummary(summary);
      }
    } else {
      showToast('Nội dung file đã thay đổi, hãy soát lại danh sách', 'warning');
    }
  };

  // Sao chép thông tin
  const handleCopy = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(`Đã sao chép ${label}`, 'success');
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Xử lý phím tắt Ctrl+Enter / Cmd+Enter trên ô nhập văn bản thử
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunTest();
    }
  };

  return (
    <div className="space-y-5 w-full">
      {/* Tiêu đề trang tối giản */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-brand-primary" />
            <span>vBook Rule Tester</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Soát lỗi cú pháp quy tắc QuickTranslate
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {/* Link sang Kho Data QT Collection */}
          <a
            href="https://qt.vbookext.me/collections"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-1.5 px-2.5 flex items-center gap-1.5 text-brand-primary hover:text-brand-dark border-brand-primary/30 bg-brand-tint dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60"
            title="Tìm kiếm và tải Data QT từ kho cộng đồng"
          >
            <Layers className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Kho Data QT</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Nút Xuất File .txt */}
          <button
            type="button"
            onClick={handleExportFile}
            className="btn-secondary text-xs py-1.5 px-2.5 flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            title="Tải file .txt đã chỉnh sửa về máy"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Xuất file .txt</span>
          </button>

          <button
            onClick={handleLoadSample}
            className="btn-secondary text-xs py-1.5 px-2.5 flex items-center gap-1"
            title="Nạp bộ rule mẫu"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Nạp mẫu</span>
          </button>
          <button
            onClick={() => {
              setRuleSource('');
              setFileName('untitled.txt');
              setTestResults([]);
              setValidationSummary(null);
            }}
            className="btn-secondary text-xs py-1.5 px-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            title="Xóa trắng editor"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bố cục 2 Cột */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* CỘT 1: QUẢN LÝ VÀ BIÊN TẬP RULE */}
        <div className="card-flat p-4 sm:p-5 space-y-3.5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                1. Danh Sách Quy Tắc (Rules)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded">
                {parsedRules.length} rule
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
              {fileName}
            </span>
          </div>

          {/* Vùng Kéo Thả & Tải File .txt */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-3 rounded-lg border-2 border-dashed transition-all cursor-pointer flex items-center justify-between gap-2 text-xs ${
              isDragOver
                ? 'border-brand-primary bg-sky-50 dark:bg-sky-950/40 text-brand-dark dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Kéo thả file <strong>.txt</strong> hoặc bấm để chọn</span>
            </div>
            <span className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded font-mono text-slate-500 dark:text-slate-300">
              Chọn file
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Trình soạn thảo Rule */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Cú pháp: <code>pattern = translation</code></span>
              <span className="text-[10px]">Hỗ trợ # comment</span>
            </div>
            <textarea
              value={ruleSource}
              onChange={(e) => setRuleSource(e.target.value)}
              placeholder="# Nhập rule tại đây, ví dụ:&#10;<n>台(手机|电脑) = {0} chiếc {1}&#10;第<n><L> = {1} {0}"
              rows={14}
              className="input-flat font-mono text-xs leading-relaxed transition-all"
              style={{ minHeight: '320px', maxHeight: '520px' }}
            />
          </div>
        </div>

        {/* CỘT 2: THỬ NGHIỆM & KẾT QUẢ KHỚP / SOÁT LỖI */}
        <div className="card-flat p-4 sm:p-5 space-y-3.5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              2. Thử Nghiệm
            </span>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('test')}
                className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                  activeTab === 'test'
                    ? 'bg-white dark:bg-slate-900 text-brand-primary dark:text-sky-400 font-bold shadow-sm border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`}
              >
                Kết quả dịch ({testResults.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!validationSummary) {
                    handleValidateRules();
                  } else {
                    setActiveTab('validate');
                  }
                }}
                className={`px-2.5 py-1 text-xs rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === 'validate'
                    ? 'bg-white dark:bg-slate-900 text-brand-primary dark:text-sky-400 font-bold shadow-sm border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`}
              >
                <span>Lỗi cú pháp</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    validationSummary && validationSummary.hardCount > 0
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : validationSummary && validationSummary.warningCount > 0
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {validationSummary?.issues.length || 0}
                </span>
              </button>
            </div>
          </div>

          {/* Ô Nhập Câu Tiếng Trung Cần Thử */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="test_sentence" className="font-semibold text-slate-700 dark:text-slate-300">
                Câu văn bản tiếng Trung cần thử:
              </label>
              <span className="text-[10.5px] text-slate-400 font-mono">
                Phím tắt: <strong>Ctrl + Enter</strong>
              </span>
            </div>
            <textarea
              id="test_sentence"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu tiếng Trung tại đây..."
              rows={3}
              className="input-flat text-xs font-mono"
            />
          </div>

          {/* 2 NÚT HÀNH ĐỘNG TRÊN CÙNG 1 DÒNG Ở CỘT PHẢI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleRunTest}
              className="btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              title="Kiểm tra dịch trên câu tiếng Trung (Ctrl+Enter)"
            >
              <Play className="w-4 h-4 fill-current flex-shrink-0" />
              <span>Kiểm tra thử nghiệm</span>
            </button>

            <button
              type="button"
              onClick={handleValidateRules}
              className="py-2.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-950/90 shadow-sm cursor-pointer"
              title="Soát lỗi toàn bộ cú pháp tập rule"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Soát lỗi cú pháp</span>
            </button>
          </div>

          {/* Thông báo nếu có approximate match */}
          {hasApproximate && activeTab === 'test' && (
            <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Lưu ý: Token từ điển <code>&lt;ne&gt;</code>, <code>&lt;pn&gt;</code>, <code>&lt;vp&gt;</code>, <code>&lt;w&gt;</code> được thử gần đúng vì Web không tích hợp sẵn bộ từ điển đầy đủ của app.
              </span>
            </div>
          )}

          {/* HIỂN THỊ KẾT QUẢ THEO TAB ĐANG CHỌN (DÙNG HIDDEN/BLOCK ĐỂ TRÁNH FLASH & RE-RENDER) */}
          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            {/* TAB 1: KẾT QUẢ THỬ NGHIỆM VĂN BẢN */}
            <div className={activeTab === 'test' ? 'block space-y-2' : 'hidden'}>
              {testResults.length > 0 ? (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {testResults.map((match, idx) => {
                    const copyText = [
                      `Văn bản gốc: ${match.original}`,
                      `Kết quả dịch: ${match.translated}`,
                      `Rule: ${match.source}`,
                      `Pattern: ${match.pattern}`,
                      `Dòng: ${match.line + 1}`,
                      match.approximate ? 'Trạng thái: gần đúng' : '',
                    ]
                      .filter(Boolean)
                      .join('\n');

                    return (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg space-y-2 hover:border-slate-300 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded">
                              {match.original}
                            </span>
                            <span className="text-slate-400 text-xs">→</span>
                            <span className="font-bold text-xs text-brand-primary dark:text-sky-400 truncate">
                              {match.translated}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopy(copyText, `test_${idx}`, 'kết quả')}
                              className="btn-secondary p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                              title="Sao chép thông tin khớp"
                            >
                              {copiedId === `test_${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRule(match.line, match.source)}
                              className="btn-secondary p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                              title="Xóa rule này khỏi file"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>{match.pattern}</span>
                          <span>Dòng {match.line + 1}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 text-xs space-y-1">
                  <FileText className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="font-medium text-slate-500 dark:text-slate-400">Chưa có kết quả khớp nào</p>
                  <p className="text-[11px]">Nhập câu tiếng Trung và bấm "Kiểm tra thử nghiệm"</p>
                </div>
              )}
            </div>

            {/* TAB 2: BẢNG SOÁT LỖI CÚ PHÁP */}
            <div className={activeTab === 'validate' ? 'block space-y-2.5' : 'hidden'}>
              {validationSummary ? (
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {validationSummary.validCount} rule hợp lệ
                    </span>
                    <div className="flex items-center gap-2 text-[11px]">
                      {validationSummary.hardCount > 0 && (
                        <span className="font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-200 dark:border-rose-800">
                          {validationSummary.hardCount} lỗi
                        </span>
                      )}
                      {validationSummary.warningCount > 0 && (
                        <span className="font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                          {validationSummary.warningCount} cảnh báo
                        </span>
                      )}
                    </div>
                  </div>

                  {validationSummary.issues.length > 0 ? (
                    <>
                      {validationSummary.issues.slice(0, displayIssueLimit).map((issue: ValidationIssue, idx: number) => {
                        const example = makeExample(issue);
                        const copyText = [
                          `Rule: ${issue.source}`,
                          `Lỗi: ${issue.message}`,
                          `Mã lỗi: ${issue.code}`,
                          `Dòng: ${issue.line + 1}`,
                          example ? `Ví dụ: ${example.input} → ${example.output}` : '',
                        ]
                          .filter(Boolean)
                          .join('\n');

                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                              issue.hard
                                ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
                                : 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-0.5 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <AlertTriangle
                                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                                      issue.hard ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                                    }`}
                                  />
                                  <span className="font-bold">{issue.message}</span>
                                </div>
                                <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate">
                                  <code>{issue.source}</code>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleCopy(copyText, `val_${idx}`, 'thông tin lỗi')}
                                  className="btn-secondary p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                  title="Sao chép chi tiết lỗi"
                                >
                                  {copiedId === `val_${idx}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRule(issue.line, issue.source)}
                                  className="btn-secondary p-1 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/60"
                                  title="Xóa rule lỗi này"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {example && (
                              <div className="p-1.5 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 rounded text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                <span className="text-slate-400">Ví dụ:</span>
                                <code className="font-bold text-slate-800 dark:text-slate-200">{example.input}</code>
                                <span>→</span>
                                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{example.output}</span>
                              </div>
                            )}

                            <div className="text-[10.5px] text-slate-400 flex items-center justify-between">
                              <span>Mã: {issue.code}</span>
                              <span>Dòng {issue.line + 1}</span>
                            </div>
                          </div>
                        );
                      })}

                      {/* Nút Xem thêm khi có quá nhiều lỗi */}
                      {validationSummary.issues.length > displayIssueLimit && (
                        <button
                          type="button"
                          onClick={() => setDisplayIssueLimit((prev) => prev + 100)}
                          className="btn-secondary w-full py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          Hiển thị thêm (còn {validationSummary.issues.length - displayIssueLimit} lỗi/cảnh báo)
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="p-6 text-center border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/30 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs">
                      <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                      <p className="font-bold">Tất cả rule đều hợp lệ!</p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Không phát hiện lỗi cú pháp hay cảnh báo nào.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 text-xs space-y-1">
                  <FileText className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="font-medium text-slate-500 dark:text-slate-400">Chưa chạy soát lỗi</p>
                  <p className="text-[11px]">Bấm nút "Soát lỗi cú pháp" để kiểm tra toàn bộ tập rule</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
