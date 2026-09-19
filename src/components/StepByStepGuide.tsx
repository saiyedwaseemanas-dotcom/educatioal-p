import React, { useState } from 'react';
import {
  Github,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Download,
  Terminal,
  Cpu,
  ShieldCheck,
  Layers,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { BUILD_STEPS } from '../data';

interface StepByStepGuideProps {
  onGoToWorkflow: () => void;
  onGoToConfig: () => void;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({
  onGoToWorkflow,
  onGoToConfig,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Repository is 100% Pre-Configured</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Build Android APKs Automatically on GitHub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We have already installed <span className="text-emerald-400 font-mono">Capacitor</span>, configured the native <span className="text-emerald-400 font-mono">android/</span> project structure, and generated the complete <span className="text-emerald-400 font-mono">.github/workflows/build-apk.yml</span> file.
              Whenever you push to GitHub, GitHub Actions compiles the APK in the cloud.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={onGoToWorkflow}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>View Workflow YAML</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToConfig}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm transition-colors"
            >
              <span>App ID & Package Name</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ready Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-start space-x-3.5">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Capacitor Native Bridge</h3>
            <p className="text-xs text-slate-400 mt-1">
              Capacitor 8.5+ with Android platform created and webDir pointed to <code className="text-emerald-400">dist/</code>.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-start space-x-3.5">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">GitHub Actions Pipeline</h3>
            <p className="text-xs text-slate-400 mt-1">
              Java 17, Android SDK & Gradle assembleDebug preconfigured in <code className="text-blue-400">build-apk.yml</code>.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-start space-x-3.5">
          <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20 shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Direct Artifact Output</h3>
            <p className="text-xs text-slate-400 mt-1">
              Generates ready-to-install <code className="text-purple-400">app-debug.apk</code> under GitHub Actions Artifacts.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Core Steps */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
          <span>The 3-Step Process to Download Your APK</span>
        </h2>

        <div className="space-y-4">
          {/* STEP 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-700">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-base shrink-0">
                1
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Export or Push This Project to GitHub
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    AI Studio Settings or Git CLI
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  All the Android files, Capacitor configuration, and GitHub Actions workflow are already created in your project workspace.
                  You just need to push this code to a GitHub repository:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Option A: AI Studio UI (Fastest)
                    </span>
                    <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                      <li>Click the <strong className="text-white">Settings / Menu</strong> icon in AI Studio</li>
                      <li>Select <strong className="text-white">"Export to GitHub"</strong> or "Download ZIP"</li>
                      <li>Authorize your GitHub account and choose repository name</li>
                    </ol>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        Option B: Git Commands
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            'git init\ngit add .\ngit commit -m "feat: setup capacitor and github actions apk builder"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git\ngit push -u origin main',
                            'git-init'
                          )
                        }
                        className="inline-flex items-center text-xs text-slate-400 hover:text-white"
                      >
                        {copiedIndex === 'git-init' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 mr-1" />
                        )}
                        <span>{copiedIndex === 'git-init' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono bg-slate-900/90 text-slate-300 p-2.5 rounded-lg overflow-x-auto leading-relaxed border border-slate-800">
                      git add .<br />
                      git commit -m "setup android apk builder"<br />
                      git push origin main
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-700">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-base shrink-0">
                2
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    GitHub Actions Automatically Builds the APK
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    No Local Android SDK Needed
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  As soon as you push your commit, GitHub triggers the job specified in <code className="text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded">.github/workflows/build-apk.yml</code>:
                </p>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Automated Cloud Steps in GitHub:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Sets up Node.js 20 & Java 17</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Initializes Android SDK & Build Tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Runs <code className="text-emerald-300">npm run build</code> (Vite)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Syncs assets into native Android project</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Compiles <code className="text-emerald-300">./gradlew assembleDebug</code></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Packages & uploads <code className="text-emerald-300">app-debug.apk</code></span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 flex items-center space-x-3 text-xs text-blue-200">
                  <Terminal className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    You can also manually trigger builds anytime on GitHub under <strong>Actions &gt; Build Android APK &gt; "Run workflow"</strong> and choose between <em>Debug</em> or <em>Release</em> mode!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-700">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold text-base shrink-0">
                3
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Download & Install Your APK
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    GitHub Actions Artifacts
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Once the build completes (usually takes about 2 minutes), your APK is available for download:
                </p>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start space-x-3">
                    <span className="bg-purple-500/20 text-purple-400 font-bold px-2 py-0.5 rounded text-xs">Step A</span>
                    <div>
                      Go to your GitHub repository and click the <strong>"Actions"</strong> tab.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-purple-500/20 text-purple-400 font-bold px-2 py-0.5 rounded text-xs">Step B</span>
                    <div>
                      Click the top workflow run (marked with a green checkmark <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />).
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-purple-500/20 text-purple-400 font-bold px-2 py-0.5 rounded text-xs">Step C</span>
                    <div>
                      Scroll down to the <strong>"Artifacts"</strong> section at the bottom of the page and click <strong>android-apk-xxxx</strong> to download the ZIP file.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-purple-500/20 text-purple-400 font-bold px-2 py-0.5 rounded text-xs">Step D</span>
                    <div>
                      Extract the ZIP to get <strong className="text-emerald-400">app-debug.apk</strong>. Send it to your phone (via USB, Google Drive, or WhatsApp/Telegram) and tap to install!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Tips and FAQ */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <strong className="text-slate-100 block mb-1">
              Q: Will Android show "Blocked by Play Protect" when installing?
            </strong>
            <p className="text-slate-400 leading-relaxed">
              Because <code className="text-emerald-300">app-debug.apk</code> is signed with Android's default development debug key, Android will show a standard prompt: "Unknown app. Do you want to install?". Tap <strong>"More details &gt; Install anyway"</strong>. For production Google Play Store releases, check our <strong>"Release Keystore & Play Store"</strong> tab to sign with your personal key.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <strong className="text-slate-100 block mb-1">
              Q: What if I make changes to the React code?
            </strong>
            <p className="text-slate-400 leading-relaxed">
              Every time you commit and push any changes to your GitHub repository, GitHub Actions automatically rebuilds the web bundle, syncs it into Capacitor, and compiles a fresh APK for you!
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <strong className="text-slate-100 block mb-1">
              Q: Can I create automatic GitHub Releases?
            </strong>
            <p className="text-slate-400 leading-relaxed">
              Yes! Our workflow is configured so that if you push a git tag like <code className="text-purple-300">v1.0.0</code>, it will automatically create a GitHub Release with the APK attached for direct public download!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
