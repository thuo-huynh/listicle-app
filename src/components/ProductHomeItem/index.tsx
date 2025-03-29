import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { styles } from './styles';

type ProductHomeItemProps = {
  title: string;
  price: string;
  image: any;
  onPress: () => void;
};

export default function ProductHomeItem({ title, price, image, onPress }: ProductHomeItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}>
      <Image
        style={styles.image}
        source={image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>$ {price}</Text>
    </Pressable>
  );
}
