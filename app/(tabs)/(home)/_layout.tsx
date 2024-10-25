import React from 'react';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        }}>
      <Stack.Screen name="index" options={{title:'Home'}} />
      <Stack.Screen name="how_to_use_signals" options={{title:'Signal Eduaction', headerShown:true,}} />
      <Stack.Screen name="join_meeting" options={{title:'Live Analysis', headerShown:true,}} />
      <Stack.Screen name="meeting_room" options={{title:'Meeting Room', headerShown:true,}} />
    </Stack>
  );
}
