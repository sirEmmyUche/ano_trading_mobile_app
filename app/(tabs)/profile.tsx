import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ScrollView, StatusBar,Text,
  Pressable, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import Logout from '../../components/logout';
import Avi from '@/components/userAvi';
import Support from '@/components/support';
import { MaterialTabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabSettingsScreen() {
  return (
    <SafeAreaView style={[styles.safeArea]}>
      {/* <ScrollView contentContainerStyle={[styles.scrollview]}> */}
        <View style={[styles.container]}>
          <Pressable style={[styles.aviWrapper]}>
            <Avi />
          </Pressable>
          <View style={[styles.otherComponentWrapper]}>
            <Pressable style={[styles.btn,styles.spaceLink]}>
              <View style={[styles.iconBox]}>
                <MaterialTabBarIcon name={'payment'} color={'#fff'} size={24} />
              </View>
              <Link href={'/pricing'}><Text style={[styles.textLink]}>Subscription</Text></Link>
            </Pressable>
            <Pressable style={[styles.spaceLink]}>
              <Support/>
            </Pressable>
          <Pressable style={[styles.spaceLink]}>
            <Logout />
          </Pressable>
          </View>
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
  textLink:{
    color:'#fff',
    marginLeft:10,
    fontWeight:'600',
    // opacity:0.7
  },
  spaceLink:{
    marginBottom:10,
    marginTop:10
  },
  btn:{
    flexDirection:'row',
    alignItems:'center',
    // borderWidth:1,
    // borderColor:'red',
  },
  aviWrapper:{
    // flex:1,
    height:450,
    marginBottom:15,
    // borderWidth:1,
    // borderColor:'red',
    zIndex:999,
  },
  iconBox:{
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    // borderWidth:1,
    // borderColor:'blue',
  },
  otherComponentWrapper:{
    // flex:2,
    borderWidth:1,
    borderColor:'transparent',
    // padding:15,
  },
  container:{
    backgroundColor: '#121212',
    minHeight:'100%',
    // flex:1,
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

