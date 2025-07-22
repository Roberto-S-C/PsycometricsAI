import Colors from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size={80} color={Colors.darkBlue} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.creamWhite,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});