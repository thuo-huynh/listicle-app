import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/src/components/Header';
import { getServices } from '@/src/api/api';
import { styles } from '@/src/styles/auth/home.style';
import { categories } from '@/src/data/categories';
import CategoryBox from '@/src/components/CategoryBox';
import ProductHomeItem from '@/src/components/ProductHomeItem';
import { router } from 'expo-router';
import { products } from '@/src/data/products';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [filteredProducts, setFilteredProducts] = useState<any[]>(products);
  const [services, setServices] = useState<any[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const data = await getServices();
  //     setServices(data);
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (selectedCategory && !keyword) {
  //     const updatedProducts = services.filter(
  //       (product) => String(product?.category) === String(selectedCategory),
  //     );
  //     setFilteredProducts(updatedProducts);
  //   } else if (selectedCategory && keyword) {
  //     const updatedProducts = services.filter(
  //       (product) =>
  //         String(product?.category) === String(selectedCategory) &&
  //         product?.title?.toLowerCase().includes(keyword?.toLowerCase()),
  //     );
  //     setFilteredProducts(updatedProducts);
  //   } else if (!selectedCategory && keyword) {
  //     const updatedProducts = services.filter((product) =>
  //       product?.title?.toLowerCase().includes(keyword?.toLowerCase()),
  //     );
  //     setFilteredProducts(updatedProducts);
  //   } else if (!keyword && !selectedCategory) {
  //     setFilteredProducts(services);
  //   }
  // }, [selectedCategory, keyword, services]);

  return (
    <SafeAreaView>
      <Header
        showSearch
        onSearch={setKeyword}
        keyword={keyword}
        title="Find All You Need"
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        horizontal
        data={categories}
        renderItem={({ item, index }) => (
          <CategoryBox
            onPress={() => setSelectedCategory(item?.id!)}
            isSelected={item?.id === selectedCategory}
            isFirst={index === 0}
            title={item?.title}
            image={item?.image}
          />
        )}
        keyExtractor={(item, index) => String(index)}
      />
      <FlatList
        style={styles.productsList}
        numColumns={2}
        data={products}
        renderItem={({ item }) => {
          const onProductPress = (product: any) => {
            console.log('🚀 ~ onProductPress ~ product:', product);
            router.push({
              pathname: '/(root)/(tabs)/product/[id]',
              params: { id: product.id },
            });
          };
          return (
            <ProductHomeItem
              onPress={() => onProductPress(item)}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          );
        }}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </SafeAreaView>
  );
}
