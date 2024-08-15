import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform,View, Pressable, SafeAreaView} from 'react-native';
import Logout from '../../components/logout'

export default function TabSettingsScreen() {
  return(
    <SafeAreaView style={[styles.safeArea]}>
      <View style={[styles.safeArea,{justifyContent:'center'}]}>
        <Pressable>
          <Logout/>
        </Pressable>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea:{
    flex:1
  }
})
