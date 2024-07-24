import React from 'react';
import { StyleSheet,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomScrollView from '@/components/CustomScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PastSignal from '../../components/pastSignals';
import Welcome from '../../components/Welcome';
import CoreService from '../../components/CoreService'

export default function HomeScreen() {
  const headerBackgroundColor = { light: '#A1CEDC', dark: '#1D3D47' };
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomScrollView headerBackgroundColor={headerBackgroundColor}>
        <ThemedView>
          <Welcome/>
        </ThemedView>
        <ThemedView>
          <CoreService/>
        </ThemedView>
        <ThemedView>
          <ThemedView style={{marginBottom:10,marginTop:10}}>
          <ThemedText type='subtitle' style={[styles.mainHeader]}>
            Check Out The Results From Our Amazing Past Signals.
          </ThemedText>
          </ThemedView>
          <PastSignal/>
        </ThemedView>
      </CustomScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  border:{
    borderWidth:1,
    // borderColor:'blue',
    // flex:1,
  },
  mainHeader:{
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'rgb(250, 186, 48)',
  },
});

