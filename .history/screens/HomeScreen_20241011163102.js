import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Sử dụng điều hướng

// Slider component
const Slider = () => {
  const images = [
    { id: '1', source: require('../assets/images/Slider1.png') },
    { id: '2', source: require('../assets/images/Slider2.png') },
  ];

  return (
    <FlatList
      horizontal
      data={images}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.sliderItem}>
          <Image source={item.source} style={styles.sliderImage} />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.slider}
    />
  );
};

const HomeScreen = () => {
  const navigation = useNavigation(); // Khởi tạo điều hướng

  const initialProducts = [
    { id: '1', name: 'TMPRARY CUPRO TANK SHIRT', originalPrice: '1,190,000₫', discountedPrice: '1,071,000₫', discountPercent: 10, image: require('../assets/images/tankshirt.jpg') },
    { id: '2', name: 'GTMPRARY CRINKLE JACKET', discountedPrice: '1,390,000₫', image: require('../assets/images/crinklejacket.jpg') },
    { id: '3', name: 'PUFFER BROWN WASHED NYLON PANTS', discountedPrice: '720,000₫', image: require('../assets/images/brownnylon.jpg') },
    { id: '4', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', originalPrice: '1,450,000₫', discountedPrice: '1,377,500₫', discountPercent: 5, image: require('../assets/images/greydenim.jpg') },
  ];

  const additionalProducts = [
    { id: '5', name: 'GOTM WASHED KNIT SWEATER', discountedPrice: '760,000₫', image: require('../assets/images/knitsweater.jpg') },
    { id: '6', name: 'SFTD BEIGE WASHED RAGLAN SHIRT', originalPrice: '520,000₫', discountedPrice: '468,000₫', discountPercent: 10, image: require('../assets/images/beigeraglanshirt.jpg') },
    { id: '7', name: 'HA BROWN WASHED TSHIRT', discountedPrice: '510,000₫', image: require('../assets/images/browntshirt.jpg') },
    { id: '8', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', discountedPrice: '750,000₫', image: require('../assets/images/windbreaker.jpg') },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectedNav, setSelectedNav] = useState('Home');

  const loadMoreProducts = () => {
    setProducts([...products, ...additionalProducts]);
  };

  const data = products.map(product => ({ type: 'product', ...product }));

  // Đối tượng ánh xạ cho biểu tượng
  const navIcons = {
    Home: require('../assets/images/home_icon.png'),
    Search: require('../assets/images/search_icon.png'),
    Favorites: require('../assets/images/favorite_icon.png'),
    Cart: require('../assets/images/cart_icon.png'),
    Profile: require('../assets/images/profile_icon.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar với nút tìm kiếm */}
      <View style={styles.topBar}>
        {/* Nút tìm kiếm */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
          <Image source={require('../assets/images/search_icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Nội dung màn hình */}
      <ScrollView>
        <Slider />

        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              {item.discountPercent && (
                <Text style={styles.discountText}>-{item.discountPercent}%</Text>
              )}
              <Text style={styles.productName}>{item.name}</Text>
              {item.originalPrice && (
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              )}
              <Text style={styles.discountedPrice}>{item.discountedPrice}</Text>
            </View>
          )}
          columnWrapperStyle={styles.columnWrapper}
          ListFooterComponent={
            <TouchableOpacity style={styles.moreButton} onPress={loadMoreProducts}>
              <Text style={styles.moreButtonText}>More</Text>
            </TouchableOpacity>
          }
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {['Home', 'Search', 'Favorites', 'Cart', 'Profile'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.navItem,
              selectedNav === item && styles.selectedNavItem,
            ]}
            onPress={() => setSelectedNav(item)}
          >
            <Image source={navIcons[item]} style={styles.navIcon} />
            <Text style={[styles.navText, selectedNav === item && styles.selectedNavText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  sliderItem: {
    marginRight: 16,
  },
  sliderImage: {
    width: 420,
    height: 250,
    borderRadius: 0,
  },
  slider: {
    height: 250,
  },
  productItem: {
    flexBasis: '48%',
    marginHorizontal: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  discountText: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF3300',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  originalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: '#FF3300',
  },
  discountedPrice: {
    fontSize: 16,
    color: 'black',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  selectedNavItem: {
    borderRadius: 10,
    backgroundColor: '#A9A9A9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
  selectedNavText: {
    fontWeight: 'bold',
  },
  moreButton: {
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    width: '50%',
    alignItems: 'center', // Thêm dòng này để căn chữ "More" vào giữa
  },  
  moreButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
