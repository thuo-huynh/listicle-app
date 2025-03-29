import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ImageSourcePropType, View } from 'react-native';
import { styles } from './styles';

type ImageCarouselProps = {
  images: ImageSourcePropType[];
};

const { width } = Dimensions.get('window');

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (e: any) => {
    const horizontalOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(horizontalOffset / width);

    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        style={styles.list}
        data={images}
        renderItem={({ item }) => (
          <Image
            style={styles.image}
            source={item}
          />
        )}
        onMomentumScrollEnd={handleScrollEnd}
      />

      <View style={styles.pagination}>
        {images?.map((_, i) => (
          <View
            key={i}
            style={[styles.paginationLine, i === activeIndex ? styles.activeLine : {}]}
          />
        ))}
      </View>
    </View>
  );
}
