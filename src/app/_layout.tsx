import { AppProviders } from '@/providers/AppProviders';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AppProviders>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="food-diary" />
        <Stack.Screen name="meals" />
        <Stack.Screen name="nutrition-summary" />
        <Stack.Screen name="activity" />
        <Stack.Screen name="workouts" />
        <Stack.Screen name="goals" />
        <Stack.Screen name="progress" />
        <Stack.Screen name="settings" />
      </Stack>
    </AppProviders>
  );
}