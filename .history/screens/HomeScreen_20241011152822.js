import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

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
  const navigation = useNavigation(); // Sử dụng useNavigation để điều hướng
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
  const [selectedNav, setSelectedNav] = useState('Home'); // Trạng thái cho mục được chọn

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

  // Hàm điều hướng khi nhấn vào các nút
  const handleNavPress = (item) => {
    setSelectedNav(item);
    if (item === 'Home') {
      navigation.navigate('HomeTabs'); // Điều hướng về HomeTabs thay vì HomeScreen
    } else if (item === 'Search') {
      navigation.navigate('SearchScreen'); // Điều hướng về màn hình Search
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar with category and cart icons */}
      <View style={styles.topBar}>
        {/* Category Icon (Left) */}
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/cate_icon.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Goldie Logo */}
        <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />

        {/* Cart Icon (Right) */}
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/cart_icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* ScrollView to allow scrolling for the entire screen */}
      <ScrollView>
        {/* Slider */}
        <Slider />

        {/* Main FlatList for products */}
        <FlatList
          data={data}
          numColumns={2} // Hiển thị 2 cột
          keyExtractor={(item) => item.id} // Sử dụng id làm keyExtractor
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
          columnWrapperStyle={styles.columnWrapper} // Căn chỉnh giữa các cột
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
              selectedNav === item && styles.selectedNavItem, // Thêm viền và đổ bóng cho mục được chọn
            ]}
            onPress={() => handleNavPress(item)} // Sự kiện nhấn nút cho điều hướng
          >
            <Image
              source={navIcons[item]} // Sử dụng đối tượng ánh xạ để lấy biểu tượng
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

const styles = StyleSheet.create({
  // Các style của bạn ở đây
});

export default HomeScreen;
