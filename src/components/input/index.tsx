import { images } from '@/src/constants/images';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';

type InputProps = {
  label: string;
  type: 'text' | 'password' | 'email' | 'number' | 'picker';
  options?: any;
  isPassword?: boolean;
  value: any;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
};
export default function Input({
  label,
  type,
  options,
  isPassword,
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);

  const onEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSelect = (opt: any) => {
    onChangeText?.(opt);
    setPickerModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {type === 'picker' ? (
        <TouchableOpacity
          onPress={() => setPickerModalVisible(true)}
          style={styles.inputContainer}>
          {value ? (
            <Text style={[styles.input, style as StyleProp<TextStyle>]}>{value?.title}</Text>
          ) : (
            <Text style={[styles.placeholder, style as StyleProp<TextStyle>]}>{placeholder}</Text>
          )}

          <Image
            style={styles.arrow}
            source={images.arrow}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !isPasswordVisible}
            style={[styles.input, style as StyleProp<TextStyle>]}
            {...props}
          />

          {isPassword ? (
            <TouchableOpacity onPress={onEyePress}>
              <Image
                style={styles.eye}
                source={isPasswordVisible ? images.eye : images.eyeClose}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      <Modal
        transparent
        visible={isPickerModalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setPickerModalVisible(false)}
          style={styles.modalWrapper}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContent}>
            <Text style={styles.headerTitle}>Select options</Text>

            {options?.map((opt: any) => {
              if (!opt?.id) {
                return null;
              }

              const selected = value?.id === opt?.id;

              return (
                <Text
                  onPress={() => onSelect(opt)}
                  style={[styles.optionText, selected ? styles.selectedOption : {}]}
                  key={opt?.title}>
                  {opt?.title}
                </Text>
              );
            })}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
