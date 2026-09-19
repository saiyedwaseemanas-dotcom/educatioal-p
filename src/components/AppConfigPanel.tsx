import React, { useState } from 'react';
import { Settings, Copy, Check, Save, Smartphone, Shield, Globe } from 'lucide-react';
import { AppConfig } from '../types';

interface AppConfigPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

export const AppConfigPanel: React.FC<AppConfigPanelProps> = ({ config, setConfig }) => {
  const [copied, setCopied] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const handleTextChange = (field: keyof AppConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePermissionChange = (perm: keyof AppConfig['permissions']) => {
    setConfig((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: !prev.permissions[perm],
      },
    }));
  };

  const generatedCapacitorConfig = JSON.stringify(
    {
      appId: config.appId,
      appName: config.appName,
      webDir: 'dist',
      server: {
        androidScheme: config.androidScheme,
      },
    },
    null,
    2
  );

  const copyConfig = () => {
    navigator.clipboard.writeText(generatedCapacitorConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateSave = () => {
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              <span>Android App Identity & Capacitor Config</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Configure package name, versioning, and native Android parameters for your APK.
            </p>
          </div>

          <button
            onClick={simulateSave}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-md shadow-emerald-500/20"
          >
            {saveFeedback ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
            <span>{saveFeedback ? 'Config Saved!' : 'Apply Configuration'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Inputs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-slate-400">
            Basic Android App Metadata
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                App Display Name
              </label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => handleTextChange('appName', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                placeholder="My Awesome App"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                The name visible under your app icon on the Android home screen.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Application ID / Package Name (reverse domain)
              </label>
              <input
                type="text"
                value={config.appId}
                onChange={(e) => handleTextChange('appId', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                placeholder="com.mycompany.myapp"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Must be unique, e.g. <code className="text-slate-400">com.yourcompany.appname</code>. Used by Android & Google Play.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Version Name
                </label>
                <input
                  type="text"
                  value={config.versionName}
                  onChange={(e) => handleTextChange('versionName', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  placeholder="1.0.0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Version Code (Integer)
                </label>
                <input
                  type="number"
                  value={config.versionCode}
                  onChange={(e) => handleTextChange('versionCode', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Android Web Scheme
                </label>
                <select
                  value={config.androidScheme}
                  onChange={(e) => handleTextChange('androidScheme', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                >
                  <option value="https">https (Recommended)</option>
                  <option value="http">http</option>
                  <option value="capacitor">capacitor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Orientation Lock
                </label>
                <select
                  value={config.orientation}
                  onChange={(e) => handleTextChange('orientation', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                  <option value="unspecified">Auto-rotate (Sensor)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Android Permissions Checklist</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(config.permissions).map(([key, enabled]) => (
                <label
                  key={key}
                  className="flex items-center space-x-2 p-2 bg-slate-950/80 rounded-lg border border-slate-800/80 cursor-pointer hover:bg-slate-950"
                >
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => handlePermissionChange(key as keyof AppConfig['permissions'])}
                    className="rounded border-slate-700 text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-slate-900"
                  />
                  <span className="capitalize text-slate-300">{key}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Live capacitor.config.json representation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-emerald-400 font-mono">capacitor.config.json</span>
              </div>
              <button
                onClick={copyConfig}
                className="inline-flex items-center text-xs text-slate-400 hover:text-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
              <pre>{generatedCapacitorConfig}</pre>
            </div>

            <div className="mt-4 p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">💡 Syncing with Android:</div>
              <p>
                After updating your configuration, run <code className="text-emerald-400 font-mono">npm run cap:sync</code> or push to GitHub. The GitHub Actions workflow will automatically read this file during the build!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
            Output Path in Workflow: <code className="text-slate-400">android/app/build/outputs/apk/debug/app-debug.apk</code>
          </div>
        </div>
      </div>
    </div>
  );
};
