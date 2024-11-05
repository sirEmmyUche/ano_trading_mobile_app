import React, { useState,useEffect } from 'react';
import { View, Image, StyleSheet,} from 'react-native';
import { useSession } from '@/context/userContext';

export default function ReusableAvi({size}:{size:number}){
    const {session,} = useSession();
    const profilePics = session?.user.profilePics;

    return(
        <View style={[styles.imageBox,{width:size,height:size, }]}>
          <Image
           source={profilePics && profilePics !== '' ? 
            { uri: profilePics } : require('../assets/images/anonymous.png')}
            resizeMode="cover"
            style={[styles.image,{ width:size,height:size,}]}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    imageBox: {
      padding: 5,
      borderRadius:100,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'transparent',
    },
  });
  