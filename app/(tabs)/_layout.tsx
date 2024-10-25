import { Tabs,Redirect } from 'expo-router';
import React from 'react';
import { IoniconsTabBarIcon, MaterialTabBarIcon, MaterialCommunity

} from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/context/userContext';
import CustomLoadingScreen from '@/components/appStartScreen';


export default function TabLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const bColor = colorScheme === 'dark'?'#0000':'#fff' || Colors[colorScheme ?? 'light'].tint

  // if (isLoading) {
  //   return <CustomLoadingScreen/>;
  // }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/register" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown:false,
        tabBarStyle:{
          backgroundColor:bColor
        }
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IoniconsTabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(signals)"
        options={{
          title: 'Signals',
          tabBarIcon: ({ color, focused }) => (
            <MaterialTabBarIcon name={focused ? 'candlestick-chart' : 'candlestick-chart'} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="pricing"
        options={{
          title: 'Subscription',
          tabBarIcon: ({ color, focused }) => (
            <MaterialTabBarIcon name={'payment'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunity name={'account'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}



