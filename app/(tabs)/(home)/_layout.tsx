import React from 'react';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        }}>
      <Stack.Screen name="index" options={{title:'Home'}} />
      <Stack.Screen name="how_to_use_signals"
      options={{title:'Using Signals', headerShown:true,}} />
    </Stack>
  );
}
