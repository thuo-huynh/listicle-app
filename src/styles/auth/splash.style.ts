import { colors } from '@/src/libs/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: 200,
  },
  titleContainer: {
    marginVertical: 54,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  innerTitle: {
    color: colors.orange,
    textDecorationLine: 'underline',
  },
  footerText: {
    color: colors.blue,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
  buttonCont: { width: '100%', flexDirection: 'row' },
});
