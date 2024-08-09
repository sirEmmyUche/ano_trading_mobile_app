import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        }}>
      <Stack.Screen name="login" options={{title:'login'}} />
      <Stack.Screen name="register" options={{title:'register'}}/>
      <Stack.Screen name="forgotPassword" options={{title:'forgotPassword'}}/>
    </Stack>
  );
}
