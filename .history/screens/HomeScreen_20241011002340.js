import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Slider component giữ nguyên
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
  const initialProducts = [
    { id: '1', name: 'Áo tank TMPRARY CUPRO', originalPrice: '1,190,000₫', discountedPrice: '1,071,000₫', discountPercent: 10, image: require('../assets/images/tankshirt.jpg') },
    { id: '2', name: 'Áo khoác GTMPRARY CRINKLE', discountedPrice: '1,390,000₫', image: require('../assets/images/crinklejacket.jpg') },
    { id: '3', name: 'Quần PUFFER BROWN WASHED NYLON', discountedPrice: '720,000₫', image: require('../assets/images/brownnylon.jpg') },
    { id: '4', name: 'Quần MULTI BUCKLE WASHED GREY DENIM', originalPrice: '1,450,000₫', discountedPrice: '1,377,500₫', discountPercent: 5, image: require('../assets/images/greydenim.jpg') },
  ];

  const additionalProducts = [
    { id: '5', name: 'Áo GOTM WASHED KNIT SWEATER', discountedPrice: '760,000₫', image: require('../assets/images/knitsweater.jpg') },
    { id: '6', name: 'Áo SFTD BEIGE WASHED RAGLAN SHIRT', originalPrice: '520,000₫', discountedPrice: '468,000₫', discountPercent: 10, image: require('../assets/images/beigeraglanshirt.jpg') },
    { id: '7', name: 'Áo thun HA BROWN WASHED', discountedPrice: '510,000₫', image: require('../assets/images/browntshirt.jpg') },
    { id: '8', name: 'Áo khoác BROWN WASHED MESH MIX WINDBREAKER', discountedPrice: '750,000₫', image: require('../assets/images/windbreaker.jpg') },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectedNav, setSelectedNav] = useState('Home');

  const loadMoreProducts = () => {
    setProducts([...products, ...additionalProducts]);
  };

  const data = products.map(product => ({ type: 'product', ...product }));

  // Cập nhật đối tượng icon cho phù hợp
  const navIcons = {
    Home: require('../assets/images/home_icon.png'),
    Category: require('../assets/images/category_icon.png'),
    Favorites: require('../assets/images/favorite_icon.png'),
    Cart: require('../assets/images/cart_icon.png'),
    Profile: require('../assets/images/profile_icon.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh trên cùng */}
      <View style={styles.topBar}>
        {/* Nút Danh mục (trái) */}
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/cate_icon.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Logo */}
        <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />

        {/* Nút giỏ hàng (phải) */}
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/cart_icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Nội dung cuộn */}
      <ScrollView>
        {/* Slider */}
        <Slider />

        {/* Danh sách sản phẩm */}
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
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
          )}
          columnWrapperStyle={styles.columnWrapper}
          ListFooterComponent={
            <TouchableOpacity style={styles.moreButton} onPress={loadMoreProducts}>
              <Text style={styles.moreButtonText}>Xem thêm</Text>
            </TouchableOpacity>
          }
        />
      </ScrollView>

      {/* Thanh điều hướng dưới cùng */}
      <View style={styles.bottomNav}>
        {['Home', 'Category', 'Favorites', 'Cart', 'Profile'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => setSelectedNav(item)}
          >
            <Image
              source={navIcons[item]}
              style={styles.navIcon}
            />
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

// Style
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
  logo: {
    width: 200,
    height: 40,
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
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  navText: {
    fontSize: 12,
    color: 'gray',
  },
  selectedNavText: {
    fontWeight: 'bold',
    color: 'black',
  },
  moreButton: {
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: '40%',
  },
  moreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
