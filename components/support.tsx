import React,{useState, useCallback} from "react";
import { Linking,StyleSheet,View,Pressable,Text} from "react-native";
import { MaterialTabBarIcon } from "./navigation/TabBarIcon";


export default function Support(){
    const openEmail = useCallback(async() => {
        await Linking.openURL('mailto:anofx@outlook.com');
      },[]);

    return(
        <View>
            <Pressable onPress={openEmail} style={[styles.btn]}>
                <View style={[styles.iconBox]}>
                    <MaterialTabBarIcon name={'contact-support'} color={'#fff'} size={30}/>
                </View>
                <Text style={[styles.textLink]}>Support</Text>
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    btn:{
        flexDirection:'row',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'red',
      },
    textLink:{
        color:'#fff',
        fontWeight:'600',
      },
    iconBox:{
        justifyContent:'center',
        alignItems:'center',
        padding:5,
      },
})