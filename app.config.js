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
      googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST, // Dynamic property
    },
    android: {
      package: "com.Anotrade", // Static property added here
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON, // Dynamic property
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#121212",
      },
      permissions: ["android.permission.RECORD_AUDIO"],
    },
    extra: {
      eas: {
        projectId: "bf75dd29-a258-44e2-b222-cf41310a21ad",
      },
    },
    owner: "sir_emmy_uche",
  });
  