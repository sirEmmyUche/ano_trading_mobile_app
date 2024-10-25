import React,{useState} from 'react'
import {useSession} from "@/context/userContext";
import {View, Pressable, Text, StyleSheet,Modal} from 'react-native';
import { OcticonsTabBarIcon } from './navigation/TabBarIcon';


export default function Logout(){
  const [modalVisible, setModalVisible] = useState(false);
    const {signOut} = useSession();
    const handleLogout = async () => {
        await signOut();
        setModalVisible(!modalVisible)
      };
    return (
      <View>
        <Pressable 
          style ={[styles.logOutWrapper]}
          onPress={()=>setModalVisible(!modalVisible)}
          >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={[styles.iconWrapper]}>
                <OcticonsTabBarIcon name={'sign-out'} color={'#fff'}/>
                </View>
                <Text style={[styles.text]}>Logout</Text>
                <Text style={[styles.text]}>Are you sure you want to log out?</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
                <Pressable onPress={handleLogout}
                style={[styles.button, styles.buttonOpen]}>
                    <Text style={styles.btnText}>Yes, Logout</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View style={[styles.iconBox]}>
            <OcticonsTabBarIcon name={'sign-out'} color={'#fff'} size={24}/>
          </View>
          <Text style={[{color:'#fff',fontWeight:'600',}]}>Log Out</Text>
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  logOutWrapper:{
    width:'100%',
    flexDirection:'row',
    // borderWidth:1,
    // borderColor:'red',
    alignItems:'center'
  }, 
  button: {
    borderRadius:10,
    padding:10,
    elevation: 2,
    marginTop:5,
    marginBottom:5,
    width:'100%',
    opacity:0.5
  },
  buttonOpen: {
    backgroundColor: '#ccc',
   
  },
  buttonClose: {
    backgroundColor:'#2196F3',
  },
  text:{
    color:'#fff',
    fontWeight:'600',
    textAlign: 'center',
    fontSize:16,
    opacity:0.5,
    marginTop:3,
    marginBottom:3
  },
  btnText:{
    color:'#fff',
    fontWeight:'600',
    textAlign:'center',
    fontSize:16,
  },
  iconBox:{
    justifyContent:'center',
    alignItems:'center',
    padding:5,
  },
  iconWrapper:{
    borderWidth:1,
    borderColor:'transparent',
    borderRadius:100,
    width:50,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FF0000',
    opacity:0.5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView:{
    width:'90%',
    margin: 20,
    backgroundColor:'#2C2D2D',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})