import React from 'react';
import { StyleSheet, SafeAreaView,StatusBar,View,Text,ScrollView, Pressable} from 'react-native';
import PastSignal from '../../../components/pastSignals';
import Welcome from '@/components/Welcome';
import CoreService from '../../../components/CoreService';
import LineChart2 from '@/components/chart';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.scrollview]}>
        <Pressable style={[styles.container]}>
        <View>
          <Welcome/>
        </View>
        <View>
            <LineChart2/>
        </View>
        <View>
          <CoreService/>
        </View>
        <View>
          <View style={{marginBottom:10,marginTop:10}}>
          <Text style={[styles.text]}>
            Amazing Past Signals.
          </Text>
          </View>
          <Pressable>
              <PastSignal/>
          </Pressable>
        </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollview:{
    backgroundColor:'#121212',
    minHeight:'100%',
  },
  safeArea: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
  },
  border:{
    borderWidth:1,
    borderColor:'red',
  },
  container:{
    // borderWidth:1,
    height:'100%',
    backgroundColor:'#121212',
    // borderColor:'red',
  },
  text:{
    textAlign: 'center',
    marginTop: 20,
    marginBottom:20,
    fontSize:20,
    fontWeight:'bold',
    color: '#fff',
    opacity:0.7
  },
});

