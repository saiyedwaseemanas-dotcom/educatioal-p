import React, { useState } from 'react';
import { Copy, Check, FileCode, CheckCircle2, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { GITHUB_WORKFLOW_CONTENT } from '../data';

export const GitHubWorkflowViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(GITHUB_WORKFLOW_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = GITHUB_WORKFLOW_CONTENT.trim().split('\n');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              GitHub Actions Workflow Configuration
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            File located at: <code className="text-emerald-400 font-mono">.github/workflows/build-apk.yml</code> (already saved in your workspace)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const blob = new Blob([GITHUB_WORKFLOW_CONTENT], { type: 'text/yaml' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'build-apk.yml';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download build-apk.yml</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-md shadow-emerald-500/20"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Workflow Code'}</span>
          </button>
        </div>
      </div>

      {/* Workflow highlights cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-xs font-semibold text-emerald-400">⚡ Automated Triggers</div>
          <p className="text-xs text-slate-400">
            Push to <code className="text-slate-300 font-mono">main</code>, <code className="text-slate-300 font-mono">tags</code>, or manual dispatch with debug/release toggle.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-xs font-semibold text-blue-400">☕ JDK 17 & Android SDK</div>
          <p className="text-xs text-slate-400">
            Temurin Java 17 and official Android Build Tools configured automatically on Ubuntu.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-xs font-semibold text-amber-400">🛠️ Gradle Compilation</div>
          <p className="text-xs text-slate-400">
            Executes <code className="text-slate-300 font-mono">./gradlew assembleDebug</code> directly inside container runner.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-xs font-semibold text-purple-400">📦 Artifact Upload</div>
          <p className="text-xs text-slate-400">
            Stores APK in GitHub Actions Artifacts for 30 days retention with auto-tagging.
          </p>
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-xs text-slate-400">.github/workflows/build-apk.yml</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">YAML</span>
        </div>

        <div className="p-4 overflow-x-auto max-h-[580px] font-mono text-xs leading-relaxed text-slate-300 selection:bg-emerald-500/30">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => {
                const isComment = line.trim().startsWith('#');
                const isKey = line.includes(':') && !line.trim().startsWith('-');
                const isStep = line.trim().startsWith('- name:');

                return (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="w-10 pr-4 text-right select-none text-slate-600 border-r border-slate-800/80">
                      {idx + 1}
                    </td>
                    <td className="pl-4 whitespace-pre">
                      {isComment ? (
                        <span className="text-slate-500 italic">{line}</span>
                      ) : isStep ? (
                        <span className="text-emerald-400 font-semibold">{line}</span>
                      ) : isKey ? (
                        <span>
                          <span className="text-blue-400">{line.split(':')[0]}:</span>
                          <span className="text-slate-300">{line.slice(line.split(':')[0].length + 1)}</span>
                        </span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
