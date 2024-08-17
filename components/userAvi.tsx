
import React,{useState} from 'react'
import {View,Text, Pressable,Image,StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { IoniconsTabBarIcon } from './navigation/TabBarIcon';

export default function Avi(){
    const [image, setImage] = useState(null);
    const [useCameraPermission, requestUseCameraPermission] = ImagePicker.useCameraPermissions();
    const [accessMediaPermission, requestAccessMediaPermission] = ImagePicker.useMediaLibraryPermissions();

    const useCamera = async()=>{
        const isCameraAllowed = await ImagePicker.getCameraPermissionsAsync();
        if(!isCameraAllowed.granted){
            let allow = await requestUseCameraPermission();
            if(allow.granted){
                let cameraImage = await ImagePicker.launchCameraAsync();
                if(!cameraImage.canceled) {
                    setImage(cameraImage.assets[0].uri);
                }
            }
        }else{
            let cameraImage = await ImagePicker.launchCameraAsync();
            if(!cameraImage.canceled) {
                setImage(cameraImage.assets[0].uri);
            }
        }

    }
    const pickImageFromGallery = async()=>{
        const isGalleryAccessAllowed = await ImagePicker.getMediaLibraryPermissionsAsync();
        if(!isGalleryAccessAllowed.granted ||isGalleryAccessAllowed.status==='denied'){
            let giveAccess = await requestAccessMediaPermission();
            if(giveAccess.granted){
                let galleryImage = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                })
                setImage(galleryImage.assets[0].uri);
            }
        }else{
            let galleryImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
            })
            setImage(galleryImage.assets[0].uri);
        }
    }
      return (
        <Pressable style={[styles.container]}>
            <View style={[styles.avatarWrapper]}>
                 {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
                <View style={[styles.imageBox]}>
                    <Image source={require('../assets/images/bull-and-bear-1.jpg')}
                    resizeMode='cover'
                    style={styles.image}
                    />
                    <Pressable style={[styles.icon]}>
                        <IoniconsTabBarIcon name={'camera-outline'}color={'#fff'}size={30}/>
                    </Pressable>
                </View>
            </View>
        </Pressable>
      )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon:{
        position:'absolute',
        bottom:0,
        right:0,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        height:40,
        width:40,
        padding:5
    },
    imageBox:{
        padding:5,
        borderRadius:100,
        width:150,
        height:150,
        borderWidth:1,
        borderColor:'red',
        // overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
      width:150,
      height:150,
      borderRadius:100,
    },
    avatarWrapper:{
        position:'relative',
    }
  });
  
// import React from 'react';
// import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useSession } from '../context/userContext'; // Update with the correct path
// import defaultImage from '../assets/images/react-logo.png'

// export default function Avi() {
//   const { session, setSession } = useSession();
//   const [useCameraPermission, requestUseCameraPermission] = ImagePicker.useCameraPermissions();
//   const [accessMediaPermission, requestAccessMediaPermission] = ImagePicker.useMediaLibraryPermissions();

//   const useCamera = async () => {
//     const isCameraAllowed = await ImagePicker.getCameraPermissionsAsync();
//     if (!isCameraAllowed.granted) {
//       let allow = await requestUseCameraPermission();
//       if (allow.granted) {
//         let cameraImage = await ImagePicker.launchCameraAsync();
//         if (!cameraImage.canceled) {
//           updateSessionImage(cameraImage.assets[0].uri);
//         }
//       }
//     } else {
//       let cameraImage = await ImagePicker.launchCameraAsync();
//       if (!cameraImage.canceled) {
//         updateSessionImage(cameraImage.assets[0].uri);
//       }
//     }
//   };

//   const pickImageFromGallery = async () => {
//     const isGalleryAccessAllowed = await ImagePicker.getMediaLibraryPermissionsAsync();
//     if (!isGalleryAccessAllowed.granted || isGalleryAccessAllowed.status === 'denied') {
//       let giveAccess = await requestAccessMediaPermission();
//       if (giveAccess.granted) {
//         let galleryImage = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [4, 3],
//         });
//         updateSessionImage(galleryImage.assets[0].uri);
//       }
//     } else {
//       let galleryImage = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//       });
//       updateSessionImage(galleryImage.assets[0].uri);
//     }
//   };

//   const updateSessionImage = (imageUri: string) => {
//     if (session) {
//       setSession({
//         ...session,
//         user: {
//           ...session.user,
//           profilePics: imageUri,
//         },
//       });
//     }
//   };

//   return (
//     <Pressable>
//       <Pressable onPress={pickImageFromGallery}>
//           <Image source={{ uri:session.user.profilePics?session.user.profilePics:
//                 defaultImage
//            }} 
//           style={styles.image} />
//         <Text style={{ color: '#fff' }}>Select Image</Text>
//       </Pressable>
//       <Pressable onPress={useCamera}>
//         {session?.user.profilePics && (
//           <Image source={{ uri: session.user.profilePics }} style={styles.image} />
//         )}
//         <Text style={{ color: '#fff' }}>Use camera</Text>
//       </Pressable>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
// });

