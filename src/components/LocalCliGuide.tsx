import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, HardDrive, Laptop } from 'lucide-react';

export const LocalCliGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Local Commands & Offline Development
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          While GitHub Actions builds your APK completely in the cloud without needing local tools, you can also run and debug locally using these commands:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Command 1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              1. Build Web Assets & Sync
            </span>
            <button
              onClick={() => copy('npm run build && npx cap sync android', 'cmd-1')}
              className="inline-flex items-center text-xs text-slate-400 hover:text-white"
            >
              {copiedKey === 'cmd-1' ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              <span>{copiedKey === 'cmd-1' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Compiles the Vite web app into <code className="text-emerald-300">dist/</code> and copies all HTML/JS/CSS assets into the Android native project.
          </p>
          <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto">
            npm run build<br />
            npx cap sync android
          </pre>
        </div>

        {/* Command 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              2. Compile Debug APK with Gradle
            </span>
            <button
              onClick={() => copy('cd android && ./gradlew assembleDebug', 'cmd-2')}
              className="inline-flex items-center text-xs text-slate-400 hover:text-white"
            >
              {copiedKey === 'cmd-2' ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              <span>{copiedKey === 'cmd-2' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Executes the Gradle wrapper directly to produce <code className="text-blue-300">app-debug.apk</code>.
          </p>
          <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto">
            cd android<br />
            ./gradlew assembleDebug
          </pre>
        </div>

        {/* Command 3 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              3. Open in Android Studio
            </span>
            <button
              onClick={() => copy('npx cap open android', 'cmd-3')}
              className="inline-flex items-center text-xs text-slate-400 hover:text-white"
            >
              {copiedKey === 'cmd-3' ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              <span>{copiedKey === 'cmd-3' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Opens the native project directly in Android Studio for emulation, USB device debugging, and profiling.
          </p>
          <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto">
            npx cap open android
          </pre>
        </div>

        {/* Command 4 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              4. Locate Built APK File
            </span>
            <button
              onClick={() => copy('ls android/app/build/outputs/apk/debug/app-debug.apk', 'cmd-4')}
              className="inline-flex items-center text-xs text-slate-400 hover:text-white"
            >
              {copiedKey === 'cmd-4' ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              <span>{copiedKey === 'cmd-4' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Where the compiled APK resides after running assembleDebug:
          </p>
          <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-purple-300 border border-slate-800 overflow-x-auto">
            android/app/build/outputs/apk/debug/app-debug.apk
          </pre>
        </div>
      </div>
    </div>
  );
};
