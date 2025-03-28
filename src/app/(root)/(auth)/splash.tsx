import Button from '@/src/components/button';
import { images } from '@/src/constants/images';
import { styles } from '@/src/styles/auth/splash.style';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Splash() {
  const onSignup = () => {
    router.navigate('/(root)/(auth)/sign-up');
  };
  const onSignin = () => {
    router.navigate('/(root)/(auth)/sign-in');
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={images.splash}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>You'll Find</Text>
        <Text style={[styles.title, styles.innerTitle]}>All you need</Text>
        <Text style={styles.title}>Here!</Text>
      </View>

      <View style={styles.buttonCont}>
        <Button
          onPress={onSignup}
          title="Sign Up"
        />
      </View>

      <TouchableOpacity onPress={onSignin}>
        <Text style={styles.footerText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
