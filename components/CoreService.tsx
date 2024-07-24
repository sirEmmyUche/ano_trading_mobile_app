import { StyleSheet,Pressable,Image} from 'react-native';
import {ThemedText} from './ThemedText'
import {ThemedView} from './ThemedView';
import { useShadowColor } from './useShadowBox';

export default function CoreService(){
    const shadowStyle = useShadowColor();

    return(
        <ThemedView style={[styles.coreServiceParentWrapper,]}>
          <ThemedText type='title' style={styles.coreServiceTitle}>Our Core Services</ThemedText>
          <ThemedView style={styles.serviceContentParent}>
            <Pressable style={[styles.serviceItem,shadowStyle,]}>
              <ThemedView style={styles.imageBox}>
                <Image source={require('@/assets/images/signal-2-img-mobile.png')} 
                style={styles.image} resizeMode="contain" />
              </ThemedView>
              <ThemedText type='subtitle' style={styles.serviceTextSubtitle}>Trade Signals</ThemedText>
              <ThemedText type='defaultSemiBold' style={styles.serviceTextParagraph}>Buy or Sell</ThemedText>
            </Pressable>
            <Pressable style={[styles.serviceItem,shadowStyle]}>
              <ThemedView style={styles.imageBox}>
                <Image source={require('@/assets/images/signal-4-img-mobile.png')} 
                style={styles.image} resizeMode="contain" />
              </ThemedView>
              <ThemedText type='subtitle' style={styles.serviceTextSubtitle}>Trainings</ThemedText>
              <ThemedText type='defaultSemiBold' style={styles.serviceTextParagraph}>Zero to Mastery</ThemedText>
            </Pressable>
            <Pressable style={[styles.serviceItem,shadowStyle]}>
              <ThemedView style={styles.imageBox}>
                <Image source={require('@/assets/images/signal-3-img-mobile.png')} 
                style={styles.image} resizeMode="contain" />
              </ThemedView>
              <ThemedText type='subtitle' style={[styles.serviceTextSubtitle,{color:'orange'}]}>Assets</ThemedText>
              <ThemedText type='defaultSemiBold' style={styles.serviceTextParagraph}>Manage Assets</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    coreServiceTitle: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: 'rgb(250, 186, 48)',
      },
      serviceTextParagraph:{
        textAlign:'center',
        // color:'#fff',
      },
      serviceTextSubtitle: {
        textAlign:'center',
        color:'orange',
      },
      serviceTextView: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
      },
      image: {
        width: '100%',
        height:'100%',
        aspectRatio: 1,
      },
      imageBox: {
        borderColor: 'transparent',
        borderWidth: 1,
        alignItems:'center',
        padding:10,
        margin: 5,
        width: '100%',
        height: 100, // Set a fixed height for images
      },
      serviceItem: {
        borderWidth: 1,
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

