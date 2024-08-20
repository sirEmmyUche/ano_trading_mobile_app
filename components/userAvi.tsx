import React, { useState,useEffect } from 'react';
import { View, Pressable, Image, StyleSheet,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { IoniconsTabBarIcon } from './navigation/TabBarIcon';
import BottomSheet from './bottomSheet';
import {deleteAvi } from '@/APIs';
import { useSession } from '@/context/userContext';

export default function Avi() {
  const [errMsg, setErrMsg] = useState<string|null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [useCameraPermission, requestUseCameraPermission] = ImagePicker.useCameraPermissions();
  const [accessMediaPermission, requestAccessMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const {session, setSession} = useSession();
  const userEmail = session?.user.email;
  const baseUrl = 'https://a1ac-105-112-221-92.ngrok-free.app'
  const id = session?.user.id;
  const userName = session?.user.displayName;
  const profilePics = session?.user.profilePics;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (errMsg){
      timer = setTimeout(() => {
        setErrMsg(null);
      },4000);
    }
    return () => clearTimeout(timer);
  }, [errMsg]);

  const useCamera = async () => {
    setBottomSheetVisible(false); 
    const isCameraAllowed = await ImagePicker.getCameraPermissionsAsync();
    if(!isCameraAllowed.granted){
      let allow = await requestUseCameraPermission();
      if(allow.granted){
        let cameraImage = await ImagePicker.launchCameraAsync();
        if(!cameraImage.canceled){
        try{
            const uploadResult = await FileSystem.uploadAsync(
                `${baseUrl}/api/user/avi?id=${id}`,cameraImage.assets[0].uri,{
                       httpMethod: 'POST',
                       fieldName:'user_profile_pics',
                       uploadType:FileSystem.FileSystemUploadType.MULTIPART
                 });
                 if(uploadResult.status === 200){
                    const parsedBody = JSON.parse(uploadResult.body);
                    setSession({
                        ...session,
                        user:{
                            ...session?.user,
                            profilePics: parsedBody.profilePics, 
                        },
                    });
                 }
        }catch(error){
            setErrMsg('failed to upload')
            // console.error(error)
        }
        }
      }
    } else{
      let cameraImage = await ImagePicker.launchCameraAsync();
      if (!cameraImage.canceled){
        try{
            const uploadResult = await FileSystem.uploadAsync(
                `${baseUrl}/api/user/avi?id=${id}`,cameraImage.assets[0].uri, {
                       httpMethod: 'POST',
                       fieldName:'user_profile_pics',
                       uploadType:FileSystem.FileSystemUploadType.MULTIPART
                 });
                 if(uploadResult.status === 200){
                    const parsedBody = JSON.parse(uploadResult.body);
                    // console.log('parsedBody:', parsedBody.profilePics);
                    setSession({
                        ...session,
                        user:{
                            ...session?.user,
                            profilePics: parsedBody.profilePics, 
                        },
                    });
                 }
        }catch(error){
            // console.error(error)
            setErrMsg('failed to upload')
        }
      }
    }
  };

  const pickImageFromGallery = async () => {
    setBottomSheetVisible(false);
    const isGalleryAccessAllowed = await ImagePicker.getMediaLibraryPermissionsAsync();
    if(!isGalleryAccessAllowed.granted || isGalleryAccessAllowed.status === 'denied'){
      let giveAccess = await requestAccessMediaPermission();
      if(giveAccess.granted) {
        let galleryImage = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });
        if(!galleryImage.canceled){
            try{
                const uploadResult = await FileSystem.uploadAsync(
                 `${baseUrl}/api/user/avi?id=${id}`,galleryImage.assets[0].uri, {
                        httpMethod: 'POST',
                        fieldName:'user_profile_pics',
                        uploadType:FileSystem.FileSystemUploadType.MULTIPART
                  });
            
                  if(uploadResult.status === 200){
                    const parsedBody = JSON.parse(uploadResult.body);
                    // console.log('parsedBody:', parsedBody.profilePics);
                    setSession({
                        ...session,
                        user:{
                            ...session?.user,
                            profilePics: parsedBody.profilePics,  
                        },
                    });
                 }
            }catch(error){
                // console.error('error:',error)
                setErrMsg('failed to upload')
            }
        }
      }
    } else {
      let galleryImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if(!galleryImage.canceled){
        try{
            const uploadResult = await FileSystem.uploadAsync(
                `${baseUrl}/api/user/avi?id=${id}`,galleryImage.assets[0].uri, {
                       httpMethod: 'POST',
                       fieldName:'user_profile_pics',
                       uploadType:FileSystem.FileSystemUploadType.MULTIPART
                 });
           
                 if(uploadResult.status === 200){
                    const parsedBody = JSON.parse(uploadResult.body);
                    // console.log('parsedBody:', parsedBody.profilePics);
                    setSession({
                        ...session,
                        user:{
                            ...session?.user,
                            profilePics: parsedBody.profilePics,  
                        },
                    });
                 }
        }catch(error){
            // console.error('error:',error)
            setErrMsg('failed to upload')
        }
    }
    }
  };

  const handleDeleteAvi = async()=>{
    try{
        const res = await deleteAvi(id);
        if(res.status==='success'){
            setSession({
                ...session,
                user:{
                    ...session?.user,
                    profilePics:'',
                },
            });
        }else{
            setErrMsg('failed to delete.')
        }
    }catch(error){
        setErrMsg('failed to delete.')
         // console.error('error:',error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <View style={styles.imageBox}>
          <Image
           source={profilePics && profilePics !== '' ? 
            { uri: profilePics } : require('../assets/images/anonymous.png')}
            resizeMode="cover"
            style={styles.image}
          />
          <Pressable style={styles.icon} onPress={() => setBottomSheetVisible(!bottomSheetVisible) }> 
            <IoniconsTabBarIcon name={'camera-outline'} color={'#fff'} size={30} />
          </Pressable>
        </View>
      </View>
      {errMsg && <Text style={[styles.errMsg]}>{errMsg}</Text>}
      <Text style={[styles.nameText]}>{userName}</Text>
      <Text style={[styles.emailText]}>{userEmail}</Text>
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onCameraPress={useCamera}
        onGalleryPress={pickImageFromGallery}
        onDeleteAvi={handleDeleteAvi}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    zIndex:5,
  },
  icon: {
    position:'absolute',
    bottom: 0,
    right: 0,
    backgroundColor:'#0096FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 40,
    width: 40,
    padding: 5,
  },
  imageBox: {
    padding: 5,
    borderRadius: 100,
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  avatarWrapper: {
    position: 'relative',
  },
  errMsg:{
    color:'#e74c3c'
  },
  emailText:{
    color:'#fff',
    marginBottom:3,
    marginTop:3,
    fontSize:16,
    opacity:0.5,
  },
  nameText:{
    color:'#fff',
    marginBottom:3,
    marginTop:3,
    fontSize:20,
    fontWeight:'600',
    opacity:0.7
  }
});
