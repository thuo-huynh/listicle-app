import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

type Props = {
  text: string;
};

export default function Separator({ text }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}
