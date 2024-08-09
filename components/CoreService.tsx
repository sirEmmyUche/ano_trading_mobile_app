import { StyleSheet,Pressable,Image,Text,View} from 'react-native';
import { Link } from 'expo-router';

export default function CoreService(){

    return(
        <View style={[styles.coreServiceParentWrapper,]}>
          <Text  style={styles.coreServiceTitle}>Services</Text>
          <View style={styles.serviceContentParent}>
            <Pressable style={[styles.serviceItem,styles.boxShadow]}>
              <View style={styles.imageBox}>
                <Image source={require('@/assets/images/signal-2-img-mobile.png')} 
                style={styles.image} resizeMode="contain" />
              </View>
              <Link href={'/(signals)'}>
              <Text style={styles.serviceTextSubtitle}>Signals</Text></Link>
            </Pressable>
            <Pressable style={[styles.serviceItem,styles.boxShadow]}>
              <View style={styles.imageBox}>
                <Image source={require('@/assets/images/signal-4-img-mobile.png')} 
                style={styles.image} resizeMode="contain" />
              </View>
              <Link href={'/'}>
                <Text style={styles.serviceTextSubtitle}>Trainings</Text>
              </Link>
            </Pressable>
              <Pressable style={[styles.serviceItem,styles.boxShadow]}>
              <View style={styles.imageBox}>
                <Image source={require('@/assets/images/signal-3-img-mobile.png')} 
                style={styles.image} resizeMode="contain" />
              </View>
              <Link href={'/'}>
              <Text style={[styles.serviceTextSubtitle,]}>Assets</Text>
              </Link>
            </Pressable>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    coreServiceTitle: {
        textAlign: 'center',
        fontSize:30,
        fontWeight:'bold',
        marginTop: 10,
        marginBottom: 10,
        color:'#fff',
      },
      serviceTextParagraph:{
        textAlign:'center',
        // color:'#fff',
      },
      serviceTextSubtitle: {
        textAlign:'center',
        color:'rgb(250, 186, 48)',
        fontSize:16,
        fontWeight:'bold',
      },
      boxShadow:{
        shadowColor:"#cccccc",
        shadowOffset:{width:-3, height:3},
        shadowOpacity:1,
        shadowRadius:1,
        elevation:5,
      },
      serviceTextView: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
      },
      image: {
        width: '100%',
        height:50,
        aspectRatio: 1,
      },
      imageBox: {
        borderColor: 'transparent',
        borderWidth: 1,
        alignItems:'center',
        padding:10,
        margin: 5,
        width: '100%',
        // height: 100, // Set a fixed height for images
      },
      serviceItem: {
        // borderWidth: 1,
        // borderColor: 'blue',
        width: '30%',
        alignItems: 'center',
        marginBottom: 10, // Add some spacing between items
      },
      serviceContentParent: {
        paddingBottom: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      coreServiceParentWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        marginTop: 5,
        marginBottom: 10,
      },
      border: {
        borderWidth: 1,
        borderColor: 'red',
      },
})

