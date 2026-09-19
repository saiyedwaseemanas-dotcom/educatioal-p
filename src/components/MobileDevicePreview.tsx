import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  Signal,
  Vibrate,
  Smartphone,
  Check,
  RotateCw,
  Sun,
  Moon,
  Volume2,
  HardDrive,
  Sparkles,
  Layers,
  Touchpad,
} from 'lucide-react';
import { AppConfig } from '../types';

interface MobileDevicePreviewProps {
  config: AppConfig;
}

export const MobileDevicePreview: React.FC<MobileDevicePreviewProps> = ({ config }) => {
  const [currentTime, setCurrentTime] = useState('12:45');
  const [hapticTriggered, setHapticTriggered] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [noteText, setNoteText] = useState('Welcome to your native Android app!');
  const [isOnline, setIsOnline] = useState(true);
  const [appTheme, setAppTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const triggerVibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 50, 40]);
    }
    setHapticTriggered(true);
    setTimeout(() => setHapticTriggered(false), 800);
  };

  const handleTouch = () => {
    setTapCount((prev) => prev + 1);
    triggerVibrate();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Device Shell Frame */}
      <div className="w-[320px] sm:w-[350px] h-[660px] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-700/80 relative flex flex-col justify-between ring-1 ring-white/10">
        {/* Top Speaker / Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
          <div className="w-14 h-1 bg-slate-800 rounded-full"></div>
          <div className="w-3.5 h-3.5 bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full"></div>
          </div>
        </div>

        {/* Screen Container */}
        <div
          className={`w-full h-full rounded-[38px] overflow-hidden flex flex-col relative transition-colors ${
            appTheme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
          }`}
        >
          {/* Android Status Bar */}
          <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-medium select-none shrink-0 border-b border-white/5">
            <span className="font-mono">{currentTime}</span>
            <div className="flex items-center space-x-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3 text-emerald-400" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* App Header inside Mobile Device */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                <Smartphone className="w-4 h-4 text-slate-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight truncate max-w-[140px]">
                  {config.appName || 'My App'}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono block truncate max-w-[140px]">
                  {config.appId}
                </span>
              </div>
            </div>

            <button
              onClick={() => setAppTheme(appTheme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300"
              title="Toggle Theme"
            >
              {appTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-500" />}
            </button>
          </div>

          {/* App Content inside Mobile Device */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {/* Installed Badge */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Native Android Package</span>
              </div>
              <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                v{config.versionName} (Build #{config.versionCode}) • Scheme: {config.androidScheme}://
              </p>
            </div>

            {/* Interactive Tap & Haptics Area */}
            <div
              onClick={handleTouch}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none text-center space-y-2 ${
                hapticTriggered
                  ? 'bg-emerald-500/20 border-emerald-400 scale-[0.98]'
                  : appTheme === 'dark'
                  ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/50'
                  : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-1.5 text-emerald-400">
                <Vibrate className="w-4 h-4" />
                <span className="font-semibold text-xs">Tap Screen for Haptic Test</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">{tapCount}</div>
              <span className="text-[10px] text-slate-400 block">
                Triggers Navigator.vibrate / Capacitor Haptics
              </span>
            </div>

            {/* Offline / Storage Scratchpad */}
            <div
              className={`p-3.5 rounded-2xl border space-y-2 ${
                appTheme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="flex items-center space-x-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                  <span>Local Storage Test</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Synced</span>
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className={`w-full p-2 rounded-xl text-[11px] border focus:outline-none transition-colors ${
                  appTheme === 'dark'
                    ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-emerald-500'
                    : 'bg-slate-100 border-slate-300 text-slate-800 focus:border-emerald-500'
                }`}
                rows={2}
              />
            </div>

            {/* Device Info */}
            <div className="space-y-1 text-[10px] text-slate-400 px-1">
              <div className="flex justify-between">
                <span>Architecture:</span>
                <span className="font-mono text-slate-300">arm64-v8a / x86_64</span>
              </div>
              <div className="flex justify-between">
                <span>Target SDK:</span>
                <span className="font-mono text-slate-300">Android 14 (API 34)</span>
              </div>
              <div className="flex justify-between">
                <span>Orientation:</span>
                <span className="font-mono text-slate-300 capitalize">{config.orientation}</span>
              </div>
            </div>
          </div>

          {/* Android Bottom Navigation Bar */}
          <div className="py-2.5 flex items-center justify-center shrink-0">
            <div className="w-28 h-1 bg-slate-500/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
