module.exports = {
    // use the variable if it's defined, otherwise use the fallback
    // icon: process.env.APP_ICON || './assets/icon.png',
    // name: process.env.APP_NAME || 'My App',
    android: {
        googleServicesFile:process.env.GOOGLE_SERVICES_JSON,
        // package: "com.sir_emmy_uche.anotrade",
      },
      ios:{
        googleServicesFile:GOOGLE_SERVICES_INFO_PLIST,
      }
//     "android": {
//     "package": "com.sir_emmy_uche.anotrade"
//   }
  };