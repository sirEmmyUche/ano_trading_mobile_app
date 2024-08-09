import React from 'react';
import { StyleSheet, SafeAreaView,StatusBar,View,Text,ScrollView, Pressable} from 'react-native';
// import CustomScrollView from '@/components/CustomScrollView';
// import { Text } from '@/components/Text';
// import { View } from '@/components/View';
import PastSignal from '../../components/pastSignals';
import Welcome from '../../components/Welcome';
import CoreService from '../../components/CoreService'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Pressable style={[styles.container]}>
        <View>
          <Welcome/>
        </View>
        <View>
          <CoreService/>
        </View>
        <View>
          <View style={{marginBottom:10,marginTop:10}}>
          <Text style={[styles.text]}>
            Check Out The Results From Our Amazing Past Signals.
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
    minHeight:'100%',
    backgroundColor:'black',
    // borderColor:'blue',
  },
  text:{
    textAlign: 'center',
    marginTop: 20,
    marginBottom:20,
    fontSize:20,
    fontWeight:'bold',
    color: '#fff',
  },
});

