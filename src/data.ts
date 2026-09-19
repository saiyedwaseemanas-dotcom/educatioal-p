import { AppConfig, WorkflowFile } from './types';

export const DEFAULT_APP_CONFIG: AppConfig = {
  appName: 'GitHub APK Builder',
  appId: 'com.github.apkbuilder.app',
  versionName: '1.0.0',
  versionCode: 1,
  androidScheme: 'https',
  orientation: 'portrait',
  themeColor: '#10b981',
  permissions: {
    internet: true,
    camera: false,
    storage: true,
    notifications: true,
    geolocation: false,
  },
};

export const GITHUB_WORKFLOW_CONTENT = `name: Build Android APK

on:
  push:
    branches: [ "main", "master" ]
    tags:
      - "v*"
  pull_request:
    branches: [ "main", "master" ]
  workflow_dispatch:
    inputs:
      build_type:
        description: "Build Type (debug or release)"
        required: true
        default: "debug"
        type: choice
        options:
          - debug
          - release

jobs:
  build-apk:
    name: Build Android APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: "temurin"
          java-version: "17"

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Install Dependencies
        run: npm install --legacy-peer-deps

      - name: Build Web Assets (Vite)
        run: npm run build

      - name: Initialize or Sync Capacitor Android
        run: |
          if [ ! -d "android" ]; then
            echo "Android directory not found, adding Android platform..."
            npx cap add android
          fi
          echo "Syncing web assets to native Android..."
          npx cap sync android

      - name: Grant Execute Permission for Gradlew
        run: |
          if [ -f "android/gradlew" ]; then
            chmod +x android/gradlew
          fi

      - name: Build Debug APK
        if: \${{ github.event.inputs.build_type != 'release' }}
        run: |
          cd android
          ./gradlew assembleDebug --no-daemon --stacktrace

      - name: Build Release APK (Unsigned)
        if: \${{ github.event.inputs.build_type == 'release' }}
        run: |
          cd android
          ./gradlew assembleRelease --no-daemon --stacktrace

      - name: Locate and Prepare APK
        run: |
          mkdir -p output-apk
          find android/app/build/outputs/apk -type f -name "*.apk" -exec cp {} output-apk/ \;
          echo "Generated APK files:"
          ls -la output-apk/

      - name: Upload APK as Artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-apk-\${{ github.run_number }}
          path: output-apk/*.apk
          retention-days: 30

      - name: Create GitHub Release on Tag
        if: startsWith(github.ref, 'refs/tags/v')
        uses: softprops/action-gh-release@v2
        with:
          files: output-apk/*.apk
          generate_release_notes: true
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;

export const CAPACITOR_CONFIG_CONTENT = `{
  "appId": "com.github.apkbuilder.app",
  "appName": "GitHub APK Builder",
  "webDir": "dist",
  "server": {
    "androidScheme": "https"
  }
}`;

export const BUILD_STEPS = [
  {
    step: 1,
    title: 'Export / Push Code to GitHub',
    desc: 'Export this project to a GitHub repository or initialize git and push to your remote repo.',
    badge: 'Step 1',
    tips: [
      'In AI Studio: Open the Settings / Export menu and click "Export to GitHub"',
      'Or via Git: git init && git add . && git commit -m "Initial commit" && git push -u origin main',
      'The .github/workflows/build-apk.yml file is already committed in this project!',
    ],
  },
  {
    step: 2,
    title: 'GitHub Actions Automated Build',
    desc: 'GitHub automatically spins up an Ubuntu cloud runner to build your Vite app and Gradle APK.',
    badge: 'Step 2',
    tips: [
      'Triggered automatically on every push to main/master, or run manually via "Run workflow"',
      'GitHub Actions sets up JDK 17, Android SDK, builds Vite assets, and runs ./gradlew assembleDebug',
      'Build takes approximately 2 to 3 minutes without requiring any local Android SDK on your machine!',
    ],
  },
  {
    step: 3,
    title: 'Download & Install Your APK',
    desc: 'Download the compiled .apk file directly from your GitHub Actions workflow artifacts.',
    badge: 'Step 3',
    tips: [
      'Navigate to the "Actions" tab in your GitHub repository',
      'Click the latest successful run named "Build Android APK"',
      'Scroll down to the "Artifacts" section and click "android-apk-..." to download the ZIP containing your APK',
      'Unzip and transfer app-debug.apk to your Android phone or emulator to install and test!',
    ],
  },
];
