import { Animated,ViewStyle,ImageBackground, 
    Dimensions,
    StyleSheet,ImageSourcePropType} from "react-native";
import React,{useRef,useEffect,PropsWithChildren} from "react";
import { ImageProps } from "react-native";

type AnimateBackgroundPicsProps = PropsWithChildren<{ style?: ViewStyle }>;
interface AnimatedBackgroundProps {
    imageSource: ImageSourcePropType;
  }
  
const { width } = Dimensions.get('window');
console.log('the width:',width)

 export default function AnimatedBackground
  ({imageSource}:AnimatedBackgroundProps){
    const backgroundPics =  useRef(new Animated.Value(0)).current;
    const startAnimation = ()=>{
        backgroundPics.setValue(0)
        Animated.timing(backgroundPics,{
            toValue:1, // change to 1
            duration:10000,
            useNativeDriver:true,
        }).start(()=>startAnimation())
    }
    useEffect(() => {
        startAnimation(); // Start the animation initially
      }, [backgroundPics]);

    const translateX = backgroundPics.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width], //change to a width
    });

    return(
        <Animated.View style={[styles.backgroundContainer,{transform:[{translateX}]}]}>
            <ImageBackground source={imageSource}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    backgroundContainer:{
        flex:1
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode:'stretch'
    }
})

