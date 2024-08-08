import React from 'react';
import {Pressable, StyleSheet, ScrollView,Text,View,Image
    ,StatusBar} from 'react-native';
import { IoniconsTabBarIcon, MaterialTabBarIcon, 
    OcticonsTabBarIcon } from './navigation/TabBarIcon';

function HowToUseSignalScreen() {
    return (
        // <SafeAreaView style={styles.safeArea}>
            // <ScrollView>
                <Pressable style={[styles.border,styles.mainContainer]}>
                    <View style={[styles.imageWrapper]}>
                        <Image source={require('../assets/images/bull-and-bear-1.jpg')}
                        style={{height:150}}
                        resizeMode='contain'/>
                    </View>
                    <View>
                        <Text style={[styles.title]}>Quality Signals</Text>
                        <Text style={[styles.default]}>Using this signal,
                            here are some things to know.
                        </Text>
                        <Text style={[styles.subtitle]}>The Status</Text>
                        <Text style={[styles.default]}>The status of each signal is very important, 
                            it shows the state of the signal. For example,
                            a closed or deleted status must be closed or deleted on your trade account.
                        </Text>
                    </View>
                    <View style={{marginTop:25, marginBottom:25}}>
                        <View style={[styles.statusWrapper]}>
                            <MaterialTabBarIcon name="pending" size={24} color={'#34c759'}/>
                            <Text style={[styles.default,{marginLeft:10}]}>Pending: The signal is yet to be activated.</Text>
                        </View>
                        <View style={[styles.statusWrapper]} >
                            <MaterialTabBarIcon name="notifications-active" size={24} color={'#b58c10'}/>
                            <Text style={[styles.default,{marginLeft:10}]}>Active: Signal has been activated and still valid.</Text>
                        </View>
                        <View style={[styles.statusWrapper]}>
                            <OcticonsTabBarIcon name="issue-closed" size={24} color={'#4682b4'}/>
                            <Text style={[styles.default,{marginLeft:10}]}>Completed: Signal has hit final profit or stops.</Text>
                        </View>
                        <View style={[styles.statusWrapper]}>
                            <IoniconsTabBarIcon name="stop-circle-outline" size={30} color={'#6c757d'}/>
                            <Text style={[styles.default,{marginLeft:10}]}>Closed: Signal was closed before hitting the final profit or stops.</Text>
                        </View>
                        <View style={[styles.statusWrapper]}>
                            <MaterialTabBarIcon name="delete" size={24} color={'#e74c3c'}/>
                            <Text style={[styles.default,{marginLeft:10}]}>Deleted: Signal has been deleted before it activate.</Text>
                        </View>
                    </View>
                </Pressable>
            // </ScrollView>
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        // flex: 1,
        marginTop:StatusBar.currentHeight,
    },
    mainContainer:{
        padding:10,
    },
    imageWrapper:{
        height:200,
        borderWidth:1,
        borderColor:'transparent',
        justifyContent:'center',
        alignItems:'center'
    },
    default:{
        color:'#fff',
        fontSize: 16,
        lineHeight: 20,
    },
    title:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:10,
    },
    subtitle:{
        color:'#fff',
        fontSize:20,
        fontWeight: 'bold',
        marginTop:10,
        marginBottom:10,
    },
    statusWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        marginTop:10
    },
   border:{
     borderWidth:1,
    borderColor:'red',
   }
});

export default HowToUseSignalScreen