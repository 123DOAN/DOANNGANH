import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding'); // Chuyển hướng đến màn hình Onboarding sau 2 giây
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150, // Điều chỉnh kích thước logo tùy theo nhu cầu
  },
});

export default SplashScreen;
