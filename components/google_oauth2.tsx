import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import { useSession } from '@/context/userContext';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '384216782692-00o6594fqrf7raur14h1gm77eq33pfih.apps.googleusercontent.com',
    androidClientId: '384216782692-61d8ao8kpijjckldmslaglhu825tn9jv.apps.googleusercontent.com',
    iosClientId: '384216782692-n5suo5ncfdichc7d653cbaq2irmkra0c.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
    // redirectUri: 'https://auth.expo.io/@sir_emmy_uche/anotrade',
    redirectUri: 'exp://192.168.1.183:8081',
  });

  const { googleAuth } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuth = async () => {
      console.log('Auth response:', response);
      if (response?.type === 'error') {
        console.log('Auth error:', response.error);
        setErrorMessage('Authentication failed. Please try again.');
      }
      if (response?.type === 'success') {
        const { authentication } = response;
        console.log('Authentication object:', authentication);
        const errMsg = await googleAuth(authentication?.idToken || '');
        if (errMsg) {
          setErrorMessage(errMsg);
        } else {
          router.replace('../app/(tabs)/');
          setErrorMessage('');
        }
      }
    };
    handleAuth();
  }, [response]);

  return (
    <View style={styles.container}>
      <Pressable 
        onPress={() => {
          console.log('it is working');
          promptAsync();
        }} 
        style={styles.wrapper}
      >
        <View style={styles.logo}>
          <Image 
            source={require('../assets/images/google_logo.png')}
            style={{ height: 30, width: 50 }} 
            resizeMode="contain" 
          />
        </View>
        <Text style={styles.text}>Google</Text>
      </Pressable>
      {errorMessage && <Text style={styles.errMsgText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 5,
  },
  wrapper: {
    borderRadius: 5,
    padding: 5,
    width: '50%',
    borderWidth: 1,
    borderColor: '#323538',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errMsgText: {
    color: 'rgb(255, 0, 0)',
  },
});
