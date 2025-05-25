import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.creamWhite,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  border:
  {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    padding: 10,
  },
  controlButton: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.lightGrey,
    padding: 5,
    fontSize: 16,
  }
});