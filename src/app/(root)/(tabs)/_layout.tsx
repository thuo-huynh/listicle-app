import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Slot } from 'expo-router';

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="">
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
