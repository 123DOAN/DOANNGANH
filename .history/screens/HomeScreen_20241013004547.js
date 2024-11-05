import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Trang trượt cho bộ lọc
const CateSlide = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-400)).current; // Vị trí bắt đầu ở bên trái

  // Hàm để mở trang trượt
  const openSlide = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Vị trí kết thúc
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Hàm để đóng trang trượt
  const closeSlide = () => {
    Animated.timing(slideAnim, {
      toValue: -400, // Trở về vị trí ban đầu
      duration: 300,
      useNativeDriver: true,
    }).start(onClose); // Gọi onClose khi kết thúc animation
  };

  // Mở trang trượt khi component được hiển thị
  React.useEffect(() => {
    if (visible) {
      openSlide();
    } else {
      closeSlide();
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity onPress={closeSlide} style={styles.closeButton}>
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.filterTitle}>Cate</Text>
    </Animated.View>
  );
};

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
  const [sliderVisible, setSliderVisible] = useState(false); // Trạng thái hiển thị thanh trượt

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
      {/* Top bar with category and cart icons */}
      <View style={styles.topBar}>
        {/* Category Icon (Left) */}
        <TouchableOpacity style={styles.iconButton} onPress={() => setSliderVisible(!sliderVisible)}   // Chuyển đổi hiển thị thanh trượt
        > 
          <Image source={require('../assets/images/cate_icon.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Goldie Logo */}
        <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />

        {/* Cart Icon (Right) */}
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/cart_icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

       {/* Hiển thị trang trượt */}
       <CateSlide visible={sliderVisible} onClose={() => setSliderVisible(false)} />

      {/* ScrollView to allow scrolling for the entire screen */}
      <ScrollView>
        {/* Slider */}
        <Slider />

        {/* Main FlatList for products */}
        <FlatList
          data={data}
          numColumns={2} // Hiển thị 2 cột
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
          columnWrapperStyle={styles.columnWrapper} // Căn chỉnh giữa các cột
          ListFooterComponent={
            <TouchableOpacity style={styles.moreButton} onPress={loadMoreProducts}>
              <Text style={styles.moreButtonText}>More</Text>
            </TouchableOpacity>
          }
        />
      </ScrollView>
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
    backgroundColor: '#A9A9A9', // Màu nền nhạt hơn cho mục được chọn
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
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
    color: 'black', // Màu cho mục được chọn
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
  slideContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 400, // Chiều rộng của trang trượt
    backgroundColor: '#fff', // Màu nền trắng
    padding: 20, // Padding xung quanh
    borderRadius: 10, // Bo tròn các góc
    elevation: 5, // Đổ bóng cho trang trượt
    zIndex: 10, // Đảm bảo trang trượt nằm trên các thành phần khác
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF3300', // Màu nền cho nút đóng
    alignItems: 'center',
    borderRadius: 5, // Bo tròn góc cho nút
  },
  closeButtonText: {
    color: 'white', // Màu chữ nút đóng
    fontWeight: 'bold', // Chữ in đậm
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333', // Màu chữ tiêu đề
  },
});

