import React from 'react'
import {Pressable, StyleSheet, ScrollView,Text,View,
     SafeAreaView,StatusBar} from 'react-native';

import { Stack, Link } from 'expo-router';
import CoreService from '../../../components/CoreService' ;

export default function SignalScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={[styles.container,]}>
            <Pressable>
              <CoreService/>
              <Link href={'/forex'}>
                <Text style={{color:'#fff'}}>Forex</Text>
              </Link>
              <Link href={'/stock'}>
                <Text style={{color:'#fff'}}>Stock</Text>
              </Link>
              <Link href={'/crypto'}>
                <Text style={{color:'#fff'}}>rypto</Text>
              </Link>
            </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
    },
    container:{
        backgroundColor:'#000000',
        minHeight:'100%'
      },
    primaryText:{
        color:'#fff',
    },
   border:{
     borderWidth:1,
    borderColor:'red'
   }
});
