import React,{useState, useEffect}from 'react';
import {Pressable, StyleSheet,Text,View,ActivityIndicator,StatusBar} from 'react-native';

function MeetingRoomScreen() {
    const [disableButton, setDisableButton] = useState(false);
    const [resMsg, setResMsg] = useState(null);

    return (
        <View style={[styles.mainContainer]}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        padding:10,
        backgroundColor:'#121212',
        flex:1,
        
    },
})

export default MeetingRoomScreen