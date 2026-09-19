/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { StepByStepGuide } from './components/StepByStepGuide';
import { GitHubWorkflowViewer } from './components/GitHubWorkflowViewer';
import { AppConfigPanel } from './components/AppConfigPanel';
import { LocalCliGuide } from './components/LocalCliGuide';
import { SigningGuide } from './components/SigningGuide';
import { MobileDevicePreview } from './components/MobileDevicePreview';
import { DEFAULT_APP_CONFIG } from './data';
import { AppConfig } from './types';
import { CheckCircle2, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'workflow' | 'config' | 'local' | 'signing'>('guide');
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [appConfig, setAppConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Content Area */}
          <div className={`flex-1 w-full transition-all ${showPreview ? 'lg:max-w-[calc(100%-380px)]' : 'w-full'}`}>
            {activeTab === 'guide' && (
              <StepByStepGuide
                onGoToWorkflow={() => setActiveTab('workflow')}
                onGoToConfig={() => setActiveTab('config')}
              />
            )}
            {activeTab === 'workflow' && <GitHubWorkflowViewer />}
            {activeTab === 'config' && (
              <AppConfigPanel config={appConfig} setConfig={setAppConfig} />
            )}
            {activeTab === 'local' && <LocalCliGuide />}
            {activeTab === 'signing' && <SigningGuide />}
          </div>

          {/* Sticky Device Preview Column */}
          {showPreview && (
            <div className="w-full lg:w-[360px] lg:sticky lg:top-24 shrink-0 flex flex-col items-center">
              <div className="mb-2 text-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Android Frame Preview
                </span>
              </div>
              <MobileDevicePreview config={appConfig} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Pre-configured for GitHub Actions • Capacitor Android Ready</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Workflow file:</span>
            <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono text-[11px] border border-slate-800">
              .github/workflows/build-apk.yml
            </code>
          </div>
        </div>
      </footer>
    </div>
  );
}
