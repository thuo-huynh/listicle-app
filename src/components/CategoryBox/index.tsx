import { colors } from '@/src/libs/colors';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { styles } from './styles';

type CategoryBoxProps = {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
  isFirst: boolean;
  isSelected: boolean;
};

export default function CategoryBox({
  title,
  image,
  onPress,
  isFirst,
  isSelected,
}: CategoryBoxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isFirst ? { marginLeft: 24 } : {}]}>
      <View style={[styles.imageContainer, isSelected ? { backgroundColor: colors.black } : {}]}>
        <Image
          style={styles.image}
          source={image}
        />
      </View>
      <Text style={[styles.title, isSelected ? { color: colors.blue, fontWeight: '500' } : {}]}>
        {title}
      </Text>
    </Pressable>
  );
}
