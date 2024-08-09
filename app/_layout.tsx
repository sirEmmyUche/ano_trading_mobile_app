import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useColorScheme } from '@/hooks/useColorScheme';
import Firebase from '../firebase';
import {SessionProvider, } from '../context/userContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    Firebase();
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Stack screenOptions={{headerShown:false,}}>
            <Stack.Screen name="(tabs)" options={{headerShown: false,}}/>
            <Stack.Screen name="(auth)" options={{headerShown: false,}}/>
          </Stack>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}



//original
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import { QueryClientProvider,type QueryClientProviderProps,
//    QueryClient } from '@tanstack/react-query';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import Firebase from '../firebase';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const queryClient = new QueryClient();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <QueryClientProvider client = {queryClient}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       </QueryClientProvider>
//     </ThemeProvider>
//   );
// }
