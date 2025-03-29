import { View, Text, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { images } from '@/src/constants/images';
import Input from '../Input';

type HeaderProps = {
  title?: string;
  onBackPress?: () => void;
  onLogout?: () => void;
  showLogout?: boolean;
  showSearch?: boolean;
  onSearch?: any;
  keyword?: string;
  showBack?: boolean;
};

export default function Header({
  title,
  onBackPress,
  onLogout,
  showLogout,
  showSearch,
  onSearch,
  keyword,
  showBack,
}: HeaderProps) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const onSearchClick = () => {
    setShowSearchInput((s) => !s);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {showBack ? (
          <Pressable
            hitSlop={20}
            onPress={onBackPress}>
            <Image
              style={styles.icon}
              source={images.back}
            />
          </Pressable>
        ) : showSearch ? (
          <Pressable
            hitSlop={20}
            onPress={onSearchClick}>
            <Image
              style={styles.icon}
              source={images.search}
            />
          </Pressable>
        ) : (
          <View style={styles.space} />
        )}

        <Text style={styles.title}>{title}</Text>

        {showLogout ? (
          <Pressable
            hitSlop={20}
            onPress={onLogout}>
            <Image
              style={styles.icon}
              source={images.logout}
            />
          </Pressable>
        ) : (
          <View style={styles.space} />
        )}
      </View>

      {showSearchInput ? (
        <Input
          onChangeText={onSearch}
          value={keyword}
          placeholder="Type your keyword..."
          label="Search"
          type="text"
        />
      ) : null}
    </View>
  );
}
