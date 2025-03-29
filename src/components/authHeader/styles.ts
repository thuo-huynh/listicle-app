import { colors } from '@/src/libs/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 54,
    marginTop: 54,
  },
  image: {
    width: 18,
    height: 18,
  },
  title: {
    color: colors.blue,
    fontSize: 26,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
});
