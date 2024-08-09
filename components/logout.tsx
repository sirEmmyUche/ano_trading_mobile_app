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
          onPress={()=>setModalVisible(!modalVisible)}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Are you sure you want to log out?</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable onPress={handleLogout}
                style={[styles.button, styles.buttonOpen]}>
                    <Text style={styles.textStyle}>Log Out</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <OcticonsTabBarIcon name={'sign-out'} color={'orange'}/>
          <Text style={{color:'white'}}>LogOut</Text>
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
    flexDirection:'row'
  }, button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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