import React, {useState, useEffect} from 'react'
import {View, Pressable,Text, StyleSheet} from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useRouter } from 'expo-router';
import * as Google from "expo-auth-session/providers/google";
import { useGoogleAuth } from "@/utils/googleAuth";
import { useSession } from '@/context/userContext';
// import HomeScreen from '@/app/(tabs)';


WebBrowser.maybeCompleteAuthSession();



export default function GoogleSignIn(){
    const { request, response, promptAsync } = useGoogleAuth();
    const {googleAuth} = useSession()
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<any>('');
    useEffect(()=>{
        if(response?.type === 'success'){
            const { authentication } = response;
            const errMsg = googleAuth(authentication?.accessToken || '',);
            if(errMsg){
                setErrorMessage(errMsg)
            }else{
                router.replace('/@/app/(tabs)')
                setErrorMessage('');
            }
        }
    },[response])
    return(
        <View>
            <Pressable  
            disabled={!request}
            onPress={() => {
                promptAsync();}}
                >
                <Text>Sign In With Google</Text>
                <View>{errorMessage && <Text>{errorMessage}</Text>}</View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color:'white',
    },
    errMsgText:{
        color:'red'
    }
})