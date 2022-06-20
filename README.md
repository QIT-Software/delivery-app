# Delivery app (demo)

This repo contains the code for 3 react-native apps: client app, courier app, restaurant app + BE part of project to run it locally and admin panel (React).

---

Minimum device OS versions:

-   **Android**: 6.0 Marshmallow (API level 23). Covers 74.8% of all devices: https://developer.android.com/about/dashboards
-   **iOS**: 11.0

---

Requirements:

-   Node.js v10+ (confirmed with Node.js 12)
-   yarn (confirmed with v1.16.0)

---

## Getting started

### Install system dependencies

#### MacOS

```shell
# Install tools
brew install node yarn cocoapods watchman moreutils jq
brew install --cask react-native-debugger # see: https://github.com/jhen0409/react-native-debugger

# Upgrade your tools
brew upgrade node yarn cocoapods watchman moreutils jq
brew cask upgrade react-native-debugger
```

### Install dependencies

```shell
# Install node dependencies
yarn install
```

#### iOS

```shell
cd ios && pod install --repo-update
```

### Run

#### iOS

```
yarn run-ios
```

#### Android

```shell
yarn run-android
```

At this point you should open the "React Native Debugger" app (installed before with homebrew) and connect it
to the app in the iPhone simulator (on the iPhone simulator, press <kbd>⌘</kbd><kbd>D</kbd>, and choose `Debug`).

Also, enable hot reloading! Inside the iOS simulator, press <kbd>⌘</kbd><kbd>D</kbd>, and enable "Fast Refresh".

### Links & References

-   https://facebook.github.io/react-native/docs/getting-started

---

## iOS / Xcode tasks

If you want, you can open the project in Xcode like this:

-   Complete all the iOS dependency setup steps above
-   Open the Xcode workspace (`NashApp.xcworkspace`)

## Android tasks

Android Studio:

-   Open Android Studio project and simply choose the `android` folder

Android / gradle tasks:

```shell
cd android

# Install Android dependencies
./gradlew build --refresh-dependencies

# Manually create Android builds
./gradlew assembleDebug    # dev build
./gradlew bundleRelease    # release build - aab -> `android/app/build/outputs/bundle/release/` (it's best to submit the aab bundle to the Google Play Store)
./gradlew assembleRelease  # release build - apk -> `android/app/build.outputs/apk/release/` (only if needed for debugging, not for the Play Store)
```

---
