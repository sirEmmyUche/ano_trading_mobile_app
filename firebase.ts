    
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
// @ts-ignore
import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDiE6WqM3O1-oS6gTdJMBHGDXZZbT_wAuI",
    projectId: "anotrade-ade89",
    project_number: "156177025881",
    messagingSenderId: '156177025881', // not really sure if this is the right message ID
    packageName: "com.Anotrade",
    appId: "1:156177025881:android:a694323de0c3eebdee5a48",
};
export default function Firebase() {
    const vapidKey = 'BMiaHYea1WC5HITIljIIvPxqWahQMaLQpUB4IOlMKeM3GFkYrQ7QD57maIbhl3C7m5AyXXJOzcVccZ6i3pjK_VI';
    async function getFirebaseToken() {
        initializeApp(firebaseConfig);
// store FCM token on the app current user ID
        const authUserId = 1;
//check if the app has the right permissions before getting the FCM token
        const hasPermissions = await messaging().hasPermission();
        function getFCMToken() {
            return messaging().getToken({
                vapidKey: vapidKey,
            });
        }
        if (Platform.OS ==='ios') {
            if(hasPermissions){
                await messaging().registerDeviceForRemoteMessages();
                const fcmToken = await getFCMToken();
                console.log('ios fcmToken:',fcmToken )
                await AsyncStorage.setItem('authUser',JSON.stringify({fcm_token:fcmToken,id: authUserId}));
            } else {
                await messaging().requestPermission();
            }
        } else if (Platform.OS === 'android') {
            if (hasPermissions) {
                const fcmToken = await getFCMToken();
                console.log('android fcmToken:',fcmToken )
                await AsyncStorage.setItem('authUser', JSON.stringify({fcm_token:fcmToken,id:authUserId}));
            }
        }
    }
    getFirebaseToken()
        .then((response) => console.log('firebase response:',response))
        .catch((error) => console.error('firebase error:',error));
}

    