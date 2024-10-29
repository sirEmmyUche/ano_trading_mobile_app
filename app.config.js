module.exports = {
    // use the variable if it's defined, otherwise use the fallback
    // icon: process.env.APP_ICON || './assets/icon.png',
    // name: process.env.APP_NAME || 'My App',
    GOOGLE_SERVICES_JSON:process.env.GOOGLE_SERVICES_JSON ||'./google-services.json',
    GOOGLE_SERVICES_INFO_PLIST:process.env.GOOGLE_SERVICES_INFO_PLIST || './GoogleService-Info.plist'
  };