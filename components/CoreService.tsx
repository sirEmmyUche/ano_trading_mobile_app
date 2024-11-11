import { StyleSheet,Pressable,Text,View,} from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons,FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';

export default function CoreService(){

    return(
        <View style={[styles.coreServiceParentWrapper,]}>
          <View style={styles.serviceContentParent}>
          <Link href={'/how_to_use_signals'} asChild>
              <Pressable style={[styles.serviceItem,]}>
                <View style={styles.imageBox}>
                  <MaterialIcons name="tips-and-updates" size={24} color="#FFA500" />
                </View>
                  <Text style={styles.serviceTextSubtitle}>Tips</Text>
              </Pressable>
            </Link>

            <Link href={'/join_meeting'} asChild>
              <Pressable style={[styles.serviceItem,]}>
                <View style={styles.imageBox}>
                  <FontAwesome5 name="chalkboard-teacher" size={24} color="#9900FF" />
                </View>
                  <Text style={styles.serviceTextSubtitle}>Training</Text>
              </Pressable>
            </Link>

              <Link href={'/'} asChild >
                <Pressable style={[styles.serviceItem,]}>
                <View style={styles.imageBox}>
                  <MaterialCommunityIcons name="finance" size={24} color="#7CE67C" />
                </View>
                <Text style={[styles.serviceTextSubtitle,]}>Assets</Text>
                </Pressable>
            </Link>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
      serviceTextParagraph:{
        textAlign:'center',
        // color:'#fff',
      },
      serviceTextSubtitle: {
        textAlign:'center',
        color:'#fff',
        opacity:0.4,//'rgb(250, 186, 48)',
        fontSize:14,
        fontWeight:'bold',
      },
      serviceTextView: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
      },
      image: {
        width: '100%',
        height:35,
      },
      imageBox: {
        borderColor: '#323538',
        borderWidth:1,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        // margin: 5,
        width:50,
        // height: 100, // Set a fixed height for images
      },
      serviceItem: {
        borderWidth: 1,
        borderColor:'transparent',
        width: '30%',
        alignItems: 'center',
        marginBottom: 10, // Add some spacing between items
      },
      serviceContentParent: {
        paddingBottom: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor:'transparent',
        width: '85%',
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
})

