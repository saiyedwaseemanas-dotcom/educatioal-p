export interface AppConfig {
  appName: string;
  appId: string;
  versionName: string;
  versionCode: number;
  androidScheme: string;
  orientation: 'portrait' | 'landscape' | 'unspecified';
  themeColor: string;
  permissions: {
    internet: boolean;
    camera: boolean;
    storage: boolean;
    notifications: boolean;
    geolocation: boolean;
  };
}

export interface BuildStepItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'ready' | 'pending' | 'action-required';
  command?: string;
  description: string;
}

export interface WorkflowFile {
  filename: string;
  path: string;
  content: string;
  description: string;
}
