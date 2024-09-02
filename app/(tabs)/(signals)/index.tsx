import React from 'react'
import {Pressable, StyleSheet, ScrollView,Text,View,Image,
     SafeAreaView,StatusBar,Platform} from 'react-native';
import { Stack, Link } from 'expo-router';
import {ZocialIcon,FontistoIcon } from '@/components/navigation/TabBarIcon';
import PushNotification from '../../../components/pushNotification'

export default function SignalScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={[styles.container,]}>
            <Pressable>
              <PushNotification/>
              <View style={[styles.imageWrapper]}>
                <Image source={require('../../../assets/images/buy-sell-dice-dark-2.png')}
                resizeMode='cover'         
                 style={[styles.image,]}/>
              </View>
              <Text style={[styles.title]}>Live Signals</Text>
              <Link href={'/how_to_use_signals'}>
                <Text style={[styles.default,{color:'#27AE60'}]}>Click here before taking signals.</Text>
              </Link>
              <Pressable style={[styles.iconMainWrapper]}>
              <Link href={'/forex'} asChild>
                <Pressable style={[styles.iconBtn]}>
                  <View style={[styles.icon,]}><FontistoIcon name={'money-symbol'} size={40} color={'white'}
                  /></View>
                  <Text style={[styles.subtitle]}>Forex</Text>
                </Pressable>
              </Link>
              <Link href={'/stock'} asChild>
                <Pressable style={[styles.iconBtn]}>
                  <View style={[styles.icon,]}><ZocialIcon name={'amazon'} size={40} color={'white'}
                  /></View>
                  <Text style={[styles.subtitle]}>Stock</Text>
                </Pressable>
              </Link>
              <Link href={'/crypto'} asChild>
                <Pressable style={[styles.iconBtn]}>
                  <View style={[styles.icon,]}><ZocialIcon name={'bitcoin'} size={40} color={'white'}
                  /></View>
                  <Text style={[styles.subtitle]}>Crypto</Text>
                </Pressable>
              </Link>
              </Pressable>
            </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  boxShadow:{
    ...Platform.select({
      ios:{
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
      },
      android:{
        shadowColor: "#cccccc",
        elevation:3,
      }
    })
  },
  icon:{
    borderWidth:1,
    borderColor:'transparent',
    justifyContent:'center',
    alignItems:'center',
    padding:5
  },
  iconBtn:{
    width:'25%',
    borderWidth:1,
    borderColor:'transparent',
    alignItems:'center',
    justifyContent:'center'
  },
  iconMainWrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    marginTop:20,
    padding:10,
    height:200,
    borderWidth:1,
    borderColor:'transparent',
  },
  imageWrapper:{
    padding:15,
    width:'100%',
    position:'relative',
    height:300,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'transparent',
  },
  image:{
    height:250,
    width:'100%'
  },
    safeArea: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
    },
    container:{
        backgroundColor:'#121212',
        minHeight:'100%'
      },
      title:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:10,
        opacity:0.8
    },
    default:{
      color:'#fff',
      fontSize: 16,
      lineHeight: 20,
      opacity:0.6
  },
  subtitle:{
    color:'#fff',
    fontSize:20,
    fontWeight: 'bold',
    // marginTop:10,
    marginBottom:10,
    opacity:0.8
},
   border:{
     borderWidth:1,
    borderColor:'red'
   },
});


{/* <MaskedView
    style={{ flex: 1,height:100,}} 
    maskElement={
      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth:1,
          borderColor:'red'
        }}>
        <MaterialTabBarIcon
          name="power"
          size={40}
          color="white"
          style={styles.shadow}
        />
        <Text style={{fontSize:20}}>My name is checking whether it is working?</Text>
      </View>
    }
    >
    <LinearGradient
        colors={['red', 'blue', 'green']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flex: 1 }}/>
</MaskedView> */}