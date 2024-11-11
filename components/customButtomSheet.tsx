import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface props {
    text:string
}

type Ref = BottomSheet

const CustomButtomSheet = forwardRef<Ref, props >((props,ref) =>{
    const snapPoints = useMemo(()=>['25%', '50%', '75%'],[])
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheet 
        ref={ref}
        index={2}
        snapPoints ={ snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor:'#2C2D2D',}}
        handleIndicatorStyle={{ backgroundColor: '#ccc'}}
        >
            <View>
                <Text style={[styles.text]}>{props.text}</Text>
            </View>
        </BottomSheet>
        </GestureHandlerRootView>
    )
})

const styles = StyleSheet.create({
    contentContainer:{
        flex:1,
        alignItems:'center'
    },
    text:{
        textAlign: 'center',
        marginTop: 5,
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
        opacity: 0.5,
      },
})

export default CustomButtomSheet;