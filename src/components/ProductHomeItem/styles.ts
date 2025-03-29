import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/src/libs/colors';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  title: {
    color: colors.textGrey,
    paddingVertical: 8,
  },
  image: {
    width: (width - 64) / 2,
    height: 220,
    borderRadius: 8,
    backgroundColor: colors.lightGrey,
  },
  price: {
    color: colors.black,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
