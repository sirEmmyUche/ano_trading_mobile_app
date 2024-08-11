import React from 'react';
import { Stack } from 'expo-router';

export default function SignalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        }}>
      <Stack.Screen name="index" options={{title:'Signal'}} />
      <Stack.Screen name="forex" options={{title:'Forex', headerShown:true,}} />
      <Stack.Screen name="crypto" options={{title:'Crypto', headerShown:true,}}/>
      <Stack.Screen name="stock" options={{title:'Stock', headerShown:true,}}/>
    </Stack>
  );
}
