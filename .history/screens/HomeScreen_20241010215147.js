import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Slider component (Top images)
const Slider = () => {
  const images = [
    { id: '1', source: require('../assets/images/Slider1.png')},
    { id: '2', source: require('../assets/images/Slider2.png')},
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
    { id: '1', name: 'TMPRARY CUPRO TANK SHIRT', originalPrice: '1,190,000₫', discountedPrice: '1,071,000₫', discountPercent: 10, image: require('../assets/images/tankshirt.jpg') },
    { id: '2', name: 'GTMPRARY CRINKLE JACKET', discountedPrice: '1,390,000₫', image: require('../assets/images/crinklejacket.jpg') },
    { id: '3', name: 'SFTD BEIGE WASHED RAGLAN SHIRT', originalPrice: '520,000₫', discountedPrice: '468,000₫', discountPercent: 10, image: require('../assets/images/beigeraglanshirt.jpg') },
    { id: '4', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', originalPrice: '1,450,000₫', discountedPrice: '1,377,500₫', discountPercent: 5, image: require('../assets/images/greydenim.jpg') },
  ];

  const data = [
    { type: 'slider' },
    ...products.map(product => ({ type: 'product', ...product })),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar with Goldie logo */}
      <View style={styles.topBar}>
        <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />
        <Text style={styles.title}></Text>
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
              {item.discountPercent && (
                <Text style={styles.discountText}>{`-${item.discountPercent}%`}</Text>
              )}
              <Text style={styles.productName}>{item.name}</Text>
              {item.originalPrice && (
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              )}
              <Text style={styles.discountedPrice}>{item.discountedPrice}</Text>
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
    width: 200,
    height: 40,
    marginRight: 8,
  },
  sliderItem: {
    marginRight: 16,
  },
  sliderImage: {
    width: 420,
    height: 250,
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
    position: 'relative', // Để định vị discount text
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  discountText: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  discountedPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});
