import React, { useState } from 'react';
import { View, Pressable, Image, StyleSheet,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { IoniconsTabBarIcon } from './navigation/TabBarIcon';
import BottomSheet from './bottomSheet';
import { useSession } from '@/context/userContext';

export default function Avi() {
  const [image, setImage] = useState<any>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [useCameraPermission, requestUseCameraPermission] = ImagePicker.useCameraPermissions();
  const [accessMediaPermission, requestAccessMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const {session} = useSession();
  const userEmail = session?.user.email;
  const userName = session?.user.displayName;
  const profilePics = session?.user.profilePics;

  const useCamera = async () => {
    setBottomSheetVisible(false); // Close the bottom sheet
    const isCameraAllowed = await ImagePicker.getCameraPermissionsAsync();
    if(!isCameraAllowed.granted){
      let allow = await requestUseCameraPermission();
      if(allow.granted){
        let cameraImage = await ImagePicker.launchCameraAsync();
        if(!cameraImage.canceled){
          setImage(cameraImage.assets[0].uri);
        }
      }
    } else{
      let cameraImage = await ImagePicker.launchCameraAsync();
      if (!cameraImage.canceled) {
        setImage(cameraImage.assets[0].uri);
      }
    }
  };

  const pickImageFromGallery = async () => {
    setBottomSheetVisible(false); // Close the bottom sheet
    const isGalleryAccessAllowed = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!isGalleryAccessAllowed.granted || isGalleryAccessAllowed.status === 'denied') {
      let giveAccess = await requestAccessMediaPermission();
      if(giveAccess.granted) {
        let galleryImage = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });
        if(!galleryImage.canceled){
            setImage(galleryImage.assets[0].uri);
        }
      }
    } else {
      let galleryImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if(!galleryImage.canceled){
        setImage(galleryImage.assets[0].uri);
    }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <View style={styles.imageBox}>
          <Image
            source={image ? { uri: image }: require('../assets/images/bull-and-bear-1.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
          <Pressable style={styles.icon} onPress={() => setBottomSheetVisible(!bottomSheetVisible) }> 
            <IoniconsTabBarIcon name={'camera-outline'} color={'#fff'} size={30} />
          </Pressable>
        </View>
      </View>
      <Text style={[styles.nameText]}>{userName}</Text>
      <Text style={[styles.emailText]}>{userEmail}</Text>
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onCameraPress={useCamera}
        onGalleryPress={pickImageFromGallery}
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
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'blue',
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
    borderColor: 'red',
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
