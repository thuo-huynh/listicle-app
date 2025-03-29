import { useGlobalContext } from '@/src/libs/global-provider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/(root)/(auth)/splash" />;
  }

  return <Slot />;
}
