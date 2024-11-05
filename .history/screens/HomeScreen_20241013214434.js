import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// Component CateSlide
const CateSlide = ({ visible, onClose, onSelectCategory }) => {
  const slideAnim = useRef(new Animated.Value(-400)).current;

  const categories = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Outer' },
    { id: '3', name: 'Knitwear' },
    { id: '4', name: 'T-shirt' },
    { id: '5', name: 'Shirt' },
    { id: '6', name: 'Sweatershirt & Hoodie' },
    { id: '7', name: 'Bottoms' },
    { id: '8', name: 'Polo Shirt' },
  ];

  const openSlide = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSlide = () => {
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

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

      <Text style={styles.filterTitle}>Collection</Text>

      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => onSelectCategory(item)}  // Gọi hàm onSelectCategory khi nhấn vào mục
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </Animated.View>
  );
};

// Component Slider
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

// Component HomeScreen
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
  const [sliderVisible, setSliderVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadMoreProducts = () => {
    setProducts([...products, ...additionalProducts]);
  };

  // Hàm để lọc sản phẩm dựa trên danh mục
  const filterProducts = (category) => {
    if (category.name === 'All') {
      return initialProducts;
    }
    return initialProducts.filter(product => product.category === category.name);
  };

  // Hàm xử lý khi chọn danh mục
  const handleSelectCategory = (category) => {
    setSelectedCategory(category.name);  // Lưu danh mục đã chọn
    setProducts(filterProducts(category));  // Lọc sản phẩm
    setSliderVisible(false);  // Đóng trang trượt
  };

  const data = products.map(product => ({ type: 'product', ...product }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar: category & cart icons */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setSliderVisible(!sliderVisible)}>
          <Image source={require('../assets/images/cate_icon.png')} style={styles.icon} />
        </TouchableOpacity>

        <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />

        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/cart_icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Hiển thị trang trượt */}
      <CateSlide visible={sliderVisible} onClose={() => setSliderVisible(false)} onSelectCategory={handleSelectCategory} />

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

// Định nghĩa styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  slideContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    zIndex: 999,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  categoryText: {
    fontSize: 18,
  },
  categoryList: {
    paddingBottom: 20,
  },
  slider: {
    height: 200,
    marginBottom: 20,
  },
  sliderItem: {
    width: 300,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  discountText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  moreButton: {
    padding: 15,
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 18,
    color: '#007BFF',
  },
});

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
    height: 200, // Adjust the height of the slider
    marginBottom: 10,
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
  slideContainer: {
    position: 'absolute',
    top: 0, 
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 20,
    zIndex: 999,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  filterTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "black",
  },
  categoryItem: {
    paddingVertical: 15, 
    paddingHorizontal: 20,  
    borderBottomWidth: 1,  
    borderBottomColor: '#E0E0E0',  
  },
  categoryText: {
    fontSize: 18, 
    color: '#333',  
  },
});

