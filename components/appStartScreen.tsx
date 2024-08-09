import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[ '#27AE60','#2471A3',]}
        style={[styles.gradient]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        <Text style={styles.loadingText}>AnoTrade</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    color:'#fff'
  },
  gradient:{
    flex:1, 
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
});

export default CustomLoadingScreen;
