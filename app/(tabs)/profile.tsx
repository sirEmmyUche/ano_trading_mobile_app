import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform,View, ScrollView,StatusBar,
  Pressable, SafeAreaView} from 'react-native';
import Logout from '../../components/logout'
import Avi from '@/components/userAvi';

export default function TabSettingsScreen() {
  return(
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView contentContainerStyle={[styles.scrollview]}>
      <View>
        <Pressable>
          <Avi/>
        </Pressable>
        <Pressable>
          <Logout/>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollview:{
    backgroundColor:'#121212',
    minHeight:'100%',
  },
  safeArea:{
    flex:1,
    marginTop:StatusBar.currentHeight
  }
})
