import { GlobalProvider } from '@/src/libs/global-provider';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
