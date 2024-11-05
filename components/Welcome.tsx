import React, { useRef, useEffect } from 'react';
import { StyleSheet,View,Text,} from 'react-native';
import { useSession } from '@/context/userContext';
import ReuseableAvi from './reusable_avi'

export default function Welcome() {
  const {session,} = useSession();
  const usersName = session?.user.displayName;

  return (
    <View style={[styles.welcomeContainer,]}>
      <View style={[styles.welcomeHolder,]}>
          <View style={[styles.imageHolder,]}>
              <ReuseableAvi size ={100}/>
          </View>
          <View>
              <Text style={[styles.text,]}>Welcome,</Text>
              <Text style={[styles.text,]}>{`${usersName}.`}</Text>
              <Text style={{fontSize:10, color:'rgb(255, 198, 0)'}}>
              ....experience trading like never before.
              </Text>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize:25,
    fontWeight: 'bold',
    // marginBottom:5, 
    marginLeft:10
  },
    welcomeContainer: {
    marginTop:15,
    marginBottom:15,
    borderWidth: 1,
    borderColor: 'transparent',
    height: 150,
  },
  welcomeHolder:{
    padding:10,
    width:'100%',
    flexDirection:'row',
    alignItems: 'center',
    alignContent:'center',
    // justifyContent: 'space-between',
  },
  imageHolder:{},
});

