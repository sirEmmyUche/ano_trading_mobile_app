import React from 'react';
import { Stack } from 'expo-router';

export default function SignalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        }}>
      <Stack.Screen name="index" options={{title:'Signal'}} />
      <Stack.Screen name="forex" options={{title:'forex', headerShown:true,}} />
      <Stack.Screen name="crypto" options={{title:'crypto'}}/>
      <Stack.Screen name="stock" options={{title:'stock'}}/>
    </Stack>
  );
}
