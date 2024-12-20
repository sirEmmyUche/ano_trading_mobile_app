module.exports = ({ config }) => ({
    ...config,
    name: "AnoTrade", // Static property moved here
    slug: "anotrade",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#fff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.Anotrade",
      googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST,
    },
    android: {
      package: "com.Anotrade",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON, 
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#121212",
      },
      permissions: ["android.permission.RECORD_AUDIO"],
    },
    package: "com.Anotrade",
    "permissions": [
      "NOTIFICATIONS",
      "WRITE_EXTERNAL_STORAGE",
      "READ_EXTERNAL_STORAGE"
    ],
    web: {
        "bundler": "metro",
        "output": "static",
        "favicon": "./assets/images/favicon.png"
      },
      plugins: [
        "expo-router",
        "@react-native-firebase/app",
        "@react-native-firebase/perf",
        "@react-native-firebase/crashlytics",
        [
          "expo-build-properties",
          {
            "ios": {
              "useFrameworks": "static"
            }
          }
        ],
        [
          "expo-image-picker",
          {
            "photosPermission": "Allow AnoTrade to access your photos",
            "cameraPermission": "Allow AnoTrade to access your camera"
          }
        ],
        [
          "@react-native-google-signin/google-signin",
          {
            "iosUrlScheme": "com.googleusercontent.apps.384216782692-n5suo5ncfdichc7d653cbaq2irmkra0c"
          }
        ]
      ],
      updates: {
        url: "https://u.expo.dev/bf75dd29-a258-44e2-b222-cf41310a21ad"
      },
      runtimeVersion: {
        policy: "appVersion"
      },
      experiments: {
        "typedRoutes": true
      },
    extra: {
      eas: {
        projectId: "bf75dd29-a258-44e2-b222-cf41310a21ad",
      },
    },
    owner: "sir_emmy_uche",
  });
  