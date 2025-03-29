import { images } from '@/src/constants/images';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type CheckboxProps = {
  checked: boolean;
  onCheck: (checked: boolean) => void;
};

export default function Checkbox({ checked, onCheck }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onCheck(!checked)}
      style={styles.container}>
      {checked ? (
        <View style={styles.innerContainer}>
          <Image
            style={styles.checkIcon}
            source={images.check}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
