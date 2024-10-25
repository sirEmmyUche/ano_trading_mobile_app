
import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Platform, Animated,AppState,AppStateStatus,
    Modal, Pressable, Linking } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { MaterialTabBarIcon } from './navigation/TabBarIcon';
import Constants from 'expo-constants';
import { sendPushNotificationTokenToServer } from '../APIs';
import { useSession } from '@/context/userContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync(setShowModal:any, jwtToken:string|undefined) {
  // const {session} = useSession();
  // const token = session?.user.token;
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      setShowModal(true); // Show the modal if permissions are denied
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

    if (!projectId) {
      alert('Project ID not found');
      return;
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      await sendPushNotificationTokenToServer(pushTokenString, jwtToken);
      return pushTokenString;
    } catch (e: unknown) {
      alert(`Error: ${e}`);
    }
  } else {
    alert('Must use a physical device for push notifications');
  }
}

export default function PushNotification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const {session} = useSession();
  const jwtToken = session?.user.token;
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const appState = useRef<AppStateStatus>(AppState.currentState);
  

  useEffect(() => {
    const mainFn = async()=>{
      let notificationsEnabledInitially = false;
    
      const { status } = await Notifications.getPermissionsAsync();
      notificationsEnabledInitially = status === 'granted';

      const checkAndShowModal = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          setShowModal(true);
        }
      };

      const handleAppStateChange = async(nextAppState:AppStateStatus) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active'){

          const { status: currentStatus } = await Notifications.getPermissionsAsync();

          if (!notificationsEnabledInitially && currentStatus === 'granted') {
            registerForPushNotificationsAsync(setShowModal, jwtToken)
              .then(token => setExpoPushToken(token ?? ''))
              .catch(error => setExpoPushToken(`${error}`));
          }
          notificationsEnabledInitially = currentStatus === 'granted';
        }
        appState.current = nextAppState;
      };
       
       AppState.addEventListener('change', handleAppStateChange);
      checkAndShowModal();

      if (status !== 'granted') {
        registerForPushNotificationsAsync(setShowModal, jwtToken)
          .then(token => setExpoPushToken(token ?? ''))
          .catch(error => setExpoPushToken(`${error}`));
      }
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
         // AppState.removeEventListener('change', handleAppStateChange);
        notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
    mainFn()
  },[]);

  const openSettings = () => {
    Linking.openSettings();
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
        {
            notification && <View style={styles.announcementWrapper}>
            <View style={[styles.announcement]}>
                <MaterialTabBarIcon name={'campaign'} size={30} color={'#FF0000'}/>
                <Text style={[styles.notifTitle]}>
                {notification && notification.request.content.title}
                </Text>
            </View>
            <Text style={{ color: '#fff' }}>
              {notification && notification.request.content.body}
            </Text>
          </View>
        }

      {/* Custom Alert Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enable Notifications</Text>
            <Text style={styles.modalMessage}>
              Notifications are essential.To receive timely updates about new signals, 
              please ensure notifications are enabled on your device. 
              Notifications will alert you as soon as new signals are posted or updated.
            </Text>
            <Pressable style={styles.button} onPress={openSettings}>
              <Text style={styles.buttonText}>Go to Settings</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: 'gray' }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.buttonText}>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    marginTop:5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  announcement:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:5
  },
  announcementWrapper: {
    flex: 1,
    padding:10,
  },
  notifTitle:{
    color:'#fff',
    marginLeft:5,
    fontWeight:'600',
    fontSize:18
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign:'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
