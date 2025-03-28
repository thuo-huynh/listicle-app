import { images } from '@/src/constants/images';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type AuthHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export default function AuthHeader({ title, onBackPress }: AuthHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        hitSlop={20}
        onPress={onBackPress}>
        <Image
          style={styles.image}
          source={images.authBack}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
