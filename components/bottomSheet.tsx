import { Dimensions, StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

const {height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 3;
const MIN_TRANSLATE_Y = 0;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function BottomSheet({ visible, onClose, onCameraPress, onGalleryPress }: any) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -MIN_TRANSLATE_Y) {
        translateY.value = withSpring(SCREEN_HEIGHT, { damping: 50 }, () => {
          runOnJS(onClose)(); // Call onClose after the animation completes
        });
      } else {
        translateY.value = withSpring(-MAX_TRANSLATE_Y, { damping: 50 });
      }
    });

  const reanimatedBottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const scrollTo = (destination: any) => {
    translateY.value = withSpring(destination, { damping: 50 });
  };

  useEffect(() => {
    // console.log('BottomSheet visibility:', visible);
    if (visible) {
      scrollTo(-SCREEN_HEIGHT / 3);
    } else {
      scrollTo(SCREEN_HEIGHT);
    }
  }, [visible]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, reanimatedBottomStyle]}>
          <Pressable style={styles.iconContainer}>
            <View style={styles.line} />
            <View>
              <Text style={[styles.subtitle]}>Upload Photo</Text>
            </View>
            <View style={[styles.wrapper]}>
              <Pressable onPress={onGalleryPress} style={styles.iconButton}>
                <MaterialIcons name="photo-library" size={30} color="#fff" />
                <Text style={[styles.iconText]}>Upload from gallery</Text>
              </Pressable>
              <Pressable onPress={onCameraPress} style={styles.iconButton}>
                <Ionicons name="camera-outline" size={30} color="#fff" />
                <Text style={[styles.iconText]}>Take a photo</Text>
              </Pressable>
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    opacity: 0.3,
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  bottomSheetContainer: {
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor:'#2C2D2D',
    top: SCREEN_HEIGHT / 1.5,
    zIndex: 10,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  line: {
    width: 75,
    height: 4,
    opacity: 0.5,
    backgroundColor: '#ccc',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    borderWidth:1,
    borderColor: 'transparent',
    width:SCREEN_WIDTH,
    height:'100%',
    // zIndex:99999,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    opacity: 0.5,
  },
  iconText: {
    fontSize: 16,
    marginLeft: 20,
    color: '#fff',
    fontWeight: '600',
  },
});
