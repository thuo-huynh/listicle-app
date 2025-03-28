import React from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './styles';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
