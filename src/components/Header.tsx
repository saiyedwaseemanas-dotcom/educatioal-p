import React from 'react';
import { Smartphone, Github, CheckCircle2, FileCode, Play, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'guide' | 'workflow' | 'config' | 'local' | 'signing';
  setActiveTab: (tab: 'guide' | 'workflow' | 'config' | 'local' | 'signing') => void;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  showPreview,
  setShowPreview,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold">
              <Smartphone className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-lg tracking-tight text-white">APK Cloud Builder</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Workflow Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Automated Android APK compilation on GitHub Actions via Capacitor
              </p>
            </div>
          </div>

          {/* Device Mockup Toggle & Status */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                showPreview
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{showPreview ? 'Hide Device View' : 'Live Android View'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-4 border-t border-slate-800/80 pt-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'guide'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            🚀 3-Step GitHub Build Guide
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'workflow'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            📄 .github/workflows/build-apk.yml
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'config'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            ⚙️ App & Package Config
          </button>
          <button
            onClick={() => setActiveTab('local')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'local'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            💻 Local CLI Commands
          </button>
          <button
            onClick={() => setActiveTab('signing')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'signing'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            🔐 Release Keystore & Play Store
          </button>
        </div>
      </div>
    </header>
  );
};
