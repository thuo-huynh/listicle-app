import Button from '@/src/components/Button';
import ImageCarousel from '@/src/components/ImageCarousel';
import { icons } from '@/src/constants/icons';
import { products } from '@/src/data/products';
import { styles } from '@/src/styles/auth/product-detail.style';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Linking, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const product = products.find((product) => product.id === Number(id));

  const onContact = () => {
    // Make a phone call
    const phone = '127282827';
    Linking.openURL(`tel:${phone}`);

    // Send an Email
    const email = 'support@mail.com';
    Linking.openURL(`mailto:${email}`);
  };

  const onBackPress = () => {
    router.back();
  };

  const onBookmark = async () => {
    // const data = await updateService(product?._id, { liked: true });
    // setServices(data);
  };
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {product?.images?.length ? (
          <ImageCarousel images={product?.images} />
        ) : (
          <Image
            style={styles.image}
            source={product?.image}
          />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>$ {product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>

        <Pressable
          onPress={onBackPress}
          style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={icons.back}
          />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={onBookmark}
          style={styles.bookmarkContainer}>
          <Image
            style={styles.bookmarkIcon}
            source={
              // product?.liked
              //   ? icons.bookmarkFilled
              //   : icons.bookmarkBlue
              icons.bookmarkFilled
            }
          />
        </Pressable>
        <Button
          onPress={onContact}
          title="Contact Seller"
        />
      </View>
    </SafeAreaView>
  );
}
