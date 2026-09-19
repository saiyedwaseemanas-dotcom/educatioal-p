import React, { useState } from 'react';
import { ShieldCheck, Key, Copy, Check, Lock, ExternalLink, Sparkles } from 'lucide-react';

export const SigningGuide: React.FC = () => {
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
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Release Keystore & Google Play Store Signing
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          While <code className="text-emerald-300">app-debug.apk</code> is ready to test immediately on any phone, production apps published to Google Play or distributed to customers must be cryptographically signed with your private release keystore.
        </p>
      </div>

      <div className="space-y-4">
        {/* Step 1: Generate Keystore */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Step 1: Generate Your Release Keystore</span>
            </h3>
            <button
              onClick={() =>
                copy(
                  'keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias',
                  'keytool'
                )
              }
              className="inline-flex items-center text-xs text-slate-400 hover:text-white"
            >
              {copiedKey === 'keytool' ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              <span>{copiedKey === 'keytool' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Run this one-time command on your terminal (requires JDK installed) to generate a secure keystore file:
          </p>
          <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
            keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
          </pre>
        </div>

        {/* Step 2: Encode for GitHub Secrets */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Step 2: Base64 Encode Your Keystore</span>
            </h3>
            <button
              onClick={() => copy('base64 -w 0 my-release-key.jks > keystore_base64.txt', 'base64')}
              className="inline-flex items-center text-xs text-slate-400 hover:text-white"
            >
              {copiedKey === 'base64' ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              <span>{copiedKey === 'base64' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Convert the binary file into a text string safe for GitHub Repository Secrets:
          </p>
          <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-blue-300 border border-slate-800 overflow-x-auto">
            # On Linux / macOS:<br />
            base64 -w 0 my-release-key.jks &gt; keystore_base64.txt<br />
            # On Windows PowerShell:<br />
            [Convert]::ToBase64String([IO.File]::ReadAllBytes('my-release-key.jks')) | Out-File keystore_base64.txt
          </pre>
        </div>

        {/* Step 3: Add to GitHub Secrets */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Step 3: Add Secrets in GitHub Settings</span>
          </h3>
          <p className="text-xs text-slate-300">
            Go to your GitHub repo &gt; <strong>Settings &gt; Secrets and variables &gt; Actions</strong> and add:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="font-mono text-emerald-400 font-semibold block">ANDROID_KEYSTORE_BASE64</span>
              <span className="text-slate-400 text-[11px]">The contents of your generated keystore_base64.txt</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="font-mono text-emerald-400 font-semibold block">KEYSTORE_PASSWORD</span>
              <span className="text-slate-400 text-[11px]">The password you chose during keytool creation</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="font-mono text-emerald-400 font-semibold block">KEY_ALIAS</span>
              <span className="text-slate-400 text-[11px]">e.g. <code className="text-slate-300">my-key-alias</code></span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="font-mono text-emerald-400 font-semibold block">KEY_PASSWORD</span>
              <span className="text-slate-400 text-[11px]">Key password (same as keystore password)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
