import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

export function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
    //   expoClientId: '<YOUR_EXPO_CLIENT_ID>',
        androidClientId:process.env.ANDROID_CLIENTID,
        iosClientId:process.env.IOS_CLIENTID,
        webClientId:process.env.WEB_CLIENTID,
    //   redirectUri,s
    });
  
    return { request, response, promptAsync };
  }