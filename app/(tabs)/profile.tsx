import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ScrollView, StatusBar,Text,
  Pressable, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import Logout from '../../components/logout';
import Avi from '@/components/userAvi';
import { MaterialTabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabSettingsScreen() {
  return (
    <SafeAreaView style={[styles.safeArea]}>
      {/* <ScrollView contentContainerStyle={[styles.scrollview]}> */}
        <View style={[styles.container]}>
          <Pressable style={[styles.aviWrapper]}>
            <Avi />
          </Pressable>
          <Link href={'/pricing'} asChild>
            <Pressable>
              <MaterialTabBarIcon name={'payment'} color={'#fff'} />
              <Text>Subscription</Text>
            </Pressable>
          </Link>
          <Pressable>
            <Logout />
          </Pressable>
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#121212',
    // minHeight: '100%',
    flex:1,
  },
  otherwrapper:{
    flex:2,
    borderWidth:1,
    borderColor:'blue',
  },
  aviWrapper:{
    flex:2,
    borderWidth:1,
    borderColor:'red',
  },
  container:{
    backgroundColor: '#121212',
    flex:1,
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});


// import Ionicons from '@expo/vector-icons/Ionicons';
// import { StyleSheet, Image, Platform,View, ScrollView,StatusBar,
//   Pressable, SafeAreaView} from 'react-native';
// import Logout from '../../components/logout'
// import Avi from '@/components/userAvi';


// export default function TabSettingsScreen() {
//   return(
//     <SafeAreaView style={[styles.safeArea]}>
//       <ScrollView contentContainerStyle={[styles.scrollview]}>
//       <View>
//         <Pressable>
//           <Avi/>
//         </Pressable>
//         <Pressable>
//           <Logout/>
//         </Pressable>
//       </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   scrollview:{
//     backgroundColor:'#121212',
//     minHeight:'100%',
//   },
//   safeArea:{
//     flex:1,
//     marginTop:StatusBar.currentHeight
//   }
// })
