import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { IoniconsTabBarIcon } from '../../../components/navigation/TabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from '@tanstack/react-query';
import {apiJoinMeeting } from '@/APIs'; // Avoid conflict by renaming here
import { useSession } from '@/context/userContext';
import * as WebBrowser from 'expo-web-browser';

function JoinMeetingScreen() {
    const [disableButton, setDisableButton] = useState(false);
    const [resMsg, setResMsg] = useState<null | string>(null);
    const { session } = useSession();
    const token: string | undefined = session?.user.token;

    // Use the token as a variable in the mutation function
    const mutation = useMutation({
        mutationFn: (token: string | undefined) => apiJoinMeeting(token),
        onSuccess: async(data) => {
            if (data && data.status === 'success') {
              setDisableButton(false);
              let meetingUrl = `https://8x8.vc/${data.roomName}?jwt=${data.jwt}`
              await WebBrowser.openBrowserAsync(meetingUrl);
            } else {
                setDisableButton(false);
                setResMsg(data.message);
            }
        },
        onError: (error) => {
            setDisableButton(false);
            console.error('Error starting or joining meeting:', error);
            setResMsg('Unable to Join or Start Meeting');
        }
    });

    // Function to trigger the mutation
    const handleJoinMeeting = () => {
        // console.log('Joining meeting...');
        setDisableButton(true);
        mutation.mutate(token); 
    };

    useEffect(() => {
        let timer: any;
        if (resMsg) {
            timer = setTimeout(() => {
                setResMsg(null);
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [resMsg]);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.textTitle}>Join a Meeting.</Text>
            <Pressable style={styles.button} disabled={disableButton} onPress={handleJoinMeeting}>
                <LinearGradient
                    colors={!disableButton ? ['#27AE60', '#2471A3'] : ['#aaaaaa', '#cccccc']}
                    style={!disableButton ? styles.gradient : [styles.gradient, { opacity: 0.5 }]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                    {!disableButton ? (
                        <>
                            <IoniconsTabBarIcon name="videocam-outline" size={35} color="#fff" />
                            <Text style={styles.buttonText}>Join Meeting</Text>
                        </>
                    ) : (
                        <View style={styles.activityIndicatorStyle}>
                            <ActivityIndicator size={'small'} color={'#fff'} />
                        </View>
                    )}
                </LinearGradient>
            </Pressable>
            <Text style={styles.resMsg}>{resMsg}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        backgroundColor: '#121212',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textTitle: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    button: {
        marginTop: 5,
        width: '50%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        padding: 10,
        flex: 1,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    activityIndicatorStyle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resMsg: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25,
    },
});

export default JoinMeetingScreen;


// import React,{useState, useEffect}from 'react';
// import {Pressable, StyleSheet,Text,View,ActivityIndicator,StatusBar} from 'react-native';
// import { IoniconsTabBarIcon,} from '../../../components/navigation/TabBarIcon';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useMutation } from '@tanstack/react-query';
// import { joinMeeting } from '@/APIs';
// import { useSession } from '@/context/userContext';

// function JoinMeetingScreen() {
//     const [disableButton, setDisableButton] = useState(false);
//     const [resMsg, setResMsg] = useState<null|string>(null);
//     const {session} = useSession();

//     const token:string|undefined= session?.user.token;

//     const mutation = useMutation({ 
      
//       mutationFn:()=>joinMeeting(),
//       onSuccess:(data) => {
//           if(data && data.status === 'failed') {
//             setDisableButton(false);
//               setResMsg(data.message);
//             }
//           else {
//             setDisableButton(false);
//             // navigate('/admin/meeting-room', { state: { jwt: data.jwt, roomName: data.roomName } });
//           }
//       },
//       onError:(error) =>{
//         setDisableButton(false);
//           console.error('Error starting or joining meeting:', error);
//           setResMsg('Unable to Join or Start Meeting');
//       } 
//   });

//   const joinMeeting = () => {
//     console.log('work')
//     setDisableButton(true);
//     mutation.mutate(token);
//   };
  
//     useEffect(() => {
//         let timer:any;
//         if (resMsg) {
//           timer = setTimeout(() => {
//             setResMsg(null);
//           }, 4000);
//         }
//         return () => clearTimeout(timer);
//       }, [resMsg]);

//     return (
//         <View style={[styles.mainContainer]}>
//             <Text style={[styles.textTitle]}>Join a Meeting.</Text>
//             <Pressable
//             style={[styles.button]}
//             disabled={disableButton}
//             onPress={joinMeeting}
//             >
//                 <LinearGradient
//                     colors={!disableButton?[ '#27AE60','#2471A3',]:['#aaaaaa','#cccccc']}
//                     style={!disableButton?[styles.gradient]:[styles.gradient,{opacity:0.5}]}
//                     start={{ x: 0, y: 0.5 }}
//                     end={{ x: 1, y: 0.5 }}>
//                     {
//                         !disableButton? (
//                          <>
//                             <IoniconsTabBarIcon name="videocam-outline" size={35} color="#fff" />
//                             <Text style={[styles.buttonText]}>Join Meeting</Text>
//                          </>   
//                         )
//                         :
//                         <View style={[styles.activityIndicatorStyle]}>
//                             <ActivityIndicator size={'small'} color={'#fff'}/>
//                         </View>
//                     }
                    
//                 </LinearGradient>
//             </Pressable>
//             <Text style={[styles.resMsg]}>{resMsg}</Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     mainContainer:{
//         padding:10,
//         backgroundColor:'#121212',
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         // alignContent:'center'
//         // height:'100%'
//     },
//     buttonText:{
//         color:'#fff',
//         textAlign:'center',
//         justifyContent:'center',
//         fontSize:20,
//         fontWeight: 'bold',
//       },
//       textTitle:{
//         color:'#fff',
//         fontSize:30,
//         fontWeight: 'bold',
//         textAlign:'center',
//         marginBottom:25
//       },
//       button: {
//         marginTop:5,
//         // marginBottom:5,
//         width:'50%',
//         color: '#fff',
//         height:50,
//         borderRadius:10,
//         alignItems:'center',
//         justifyContent:'center'
//       },
//       gradient:{
//         padding:10,
//         flex:1, 
//         borderRadius:10,
//         width:'100%',
//         flexDirection:'row',
//         alignItems:'center',
//         alignContent:'center',
//         justifyContent:'space-between',
//       },
//       activityIndicatorStyle:{
//         width:'100%',
//         alignContent:'center',
//         alignItems:'center',
//         justifyContent:'center'
//       },
//       resMsg:{
//         color:'#fff',
//         fontSize:18,
//         fontWeight:'bold',
//         textAlign:'center',
//         marginTop:25
//       }
// })

// export default JoinMeetingScreen