import { Tabs,Redirect } from 'expo-router';
import React from 'react';
import { IoniconsTabBarIcon, MaterialTabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform,Text } from 'react-native';
import { useSession } from '@/context/userContext';
import CustomLoadingScreen from '@/components/appStartScreen';


export default function TabLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const bColor = colorScheme === 'dark'?'#0000':'#fff' || Colors[colorScheme ?? 'light'].tint
  if (isLoading) {
    return <CustomLoadingScreen/>;
  }

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
        name="index"
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
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <IoniconsTabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}





// import { Tabs } from 'expo-router';
// import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//       name='signals'
//       options={{
//         title:'Signals',
//       }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
