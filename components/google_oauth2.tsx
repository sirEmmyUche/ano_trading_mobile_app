
import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image,ActivityIndicator } from 'react-native';
import {GoogleSignin,} from '@react-native-google-signin/google-signin';
import { useSession, } from '@/context/userContext';
import { useRouter } from 'expo-router';
import { useMutation } from "@tanstack/react-query";
import { googleOauth } from "@/APIs";

export default function GoogleSignIn() {

  const {setSession } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (token:string)=> googleOauth(token),
    onSuccess:(data)=>{
      if (data && data.status === 'success') {
        setDisableButton(false);
        setSession({ user: data.user, });  //token: data.token
        router.replace('/(home)'); //'../app/(tabs)/'
      } else {
        if(!data){
          setDisableButton(false);
          setErrorMessage('No response from server. Please try again later.')
        }
        setDisableButton(false);
        setErrorMessage( data.message || 'Google Login failed')
      }
    },
    onError:(error)=>{
      console.error(error)
       setDisableButton(false);
      setErrorMessage('Something went wrong trying to login with Google')
    }
  })

  useEffect(() => {
    let timer: any;
    if (errorMessage) {
        timer = setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
    }
    return () => clearTimeout(timer);
}, [errorMessage]);

  GoogleSignin.configure({
    webClientId: '384216782692-00o6594fqrf7raur14h1gm77eq33pfih.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '384216782692-n5suo5ncfdichc7d653cbaq2irmkra0c.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });

  
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if(response && response.type === 'success'){
        if(response?.data?.idToken){
          setDisableButton(true);
          // console.log('token',response.data.idToken)
          mutation.mutate(response?.data?.idToken)
          }
      }else{
        setDisableButton(false);
        setErrorMessage('Google sign in was cancelled');
      }
    } catch (error) {
      console.error(error);
      setDisableButton(false);
      setErrorMessage('Something went wrong trying to login with Google');
    }
  };
  
    return (
      <View style={styles.container}>
       <Pressable 
       disabled={disableButton}
        onPress={() => {signIn();}} 
        style={styles.wrapper}
      >
        <View style={styles.logo}>
          <Image 
            source={require('../assets/images/google_logo.png')}
            style={{ height: 30, width: 50 }} 
            resizeMode="contain" 
          />
        </View>
        <Text style={styles.text}>
        {!disableButton?'Google':<ActivityIndicator size={'small'} color={'#fff'}/>}
        </Text>
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
