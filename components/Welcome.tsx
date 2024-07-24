import { StyleSheet, Animated, ImageBackground,
  Dimensions, View, useColorScheme } from 'react-native';
import React, { useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useShadowColor } from './useShadowBox';
import { useSession } from '@/context/userContext';

const { width } = Dimensions.get('window');

type AnimateBackgroundPicsProps = PropsWithChildren<{ style?: ViewStyle }>;

const AnimateBackgroundPics: React.FC<AnimateBackgroundPicsProps> = (props) => {
  const moveBackgroundPic = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    moveBackgroundPic.setValue(0); // Reset the value to 0 before starting the animation
    Animated.timing(moveBackgroundPic, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start(() => {
      startAnimation(); // Restart the animation after it completes
    });
  };

  useEffect(() => {
    startAnimation(); // Start the animation initially
  }, [moveBackgroundPic]);

  const translateX = moveBackgroundPic.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  return (
    <Animated.View
      style={[
        styles.backgroundContainer,
        { transform: [{ translateX }] },
      ]}
    >
      <ImageBackground
        source={require('../assets/images/backgroundImg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default function Welcome() {
  const colorScheme = useColorScheme();
  const overlayColor = colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
  const shadowStyle = useShadowColor();
  const {session} = useSession();
  const usersName = session?.user.displayName

  return (
    <ThemedView style={[styles.welcomeContainer,shadowStyle]}>
      <AnimateBackgroundPics style={styles.background} />
      <View style={[styles.overlay,{backgroundColor:overlayColor}]}>
        <ThemedText style={styles.text}>{`Welcome ${usersName}`}</ThemedText>
        <ThemedText style={{fontSize:10, color:'#fff'}}>....experience trading like ever before</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    width: width * 2,
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  welcomeContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: 150,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

