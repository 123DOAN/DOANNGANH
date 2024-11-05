import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Slider component (Top images)
const Slider = () => {
  const images = [
    { id: '1', source: require('../assets/images/Slider1.png'), title: 'Goldie is an unexpected concept proudly created by Vietnamese people.' },
    { id: '2', source: require('../assets/images/Slider2.png'), title: 'Redefining streetwear, igniting imagination' },
  ];

  return (
    <FlatList
      horizontal
      data={images}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.sliderItem}>
          <Image source={item.source} style={styles.sliderImage} />
          <Text style={styles.sliderText}>{item.title}</Text>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

// Main HomeScreen component
const HomeScreen = () => {
  const products = [
    { id: '1', name: 'Gold Bracelet', price: '$80', image: require('../assets/gold_bracelet.jpg') },
    { id: '2', name: 'Gold Ring', price: '$50', image: require('../assets/gold_ring.jpg') },
    { id: '3', name: 'Gold Necklace', price: '$120', image: require('../assets/gold_necklace.jpg') },
    { id: '4', name: 'Gold Earrings', price: '$60', image: require('../assets/gold_earrings.jpg') },
  ];

  const data = [
    { type: 'slider' },
    ...products.map(product => ({ type: 'product', ...product })),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar with Goldie logo */}
      <View style={styles.topBar}>
        <Image source={require('../assets/goldie_logo.png')} style={styles.logo} />
        <Text style={styles.title}>Goldie</Text>
      </View>

      {/* Main FlatList for both slider and products */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.type === 'slider') {
            return <Slider />;
          }
          return (
            <View style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sliderItem: {
    marginRight: 16,
  },
  sliderImage: {
    width: 300,
    height: 150,
    borderRadius: 0, // Không bo góc cho slider
  },
  sliderText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
});