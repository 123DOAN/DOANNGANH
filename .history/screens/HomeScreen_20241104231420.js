import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

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

  useEffect(() => {
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
            onPress={() => onSelectCategory(item)}  
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


const HomeScreen = () => {
  const initialProducts = [
    { id: '1', name: 'TMPRARY CUPRO TANK SHIRT', price: '1190000', image: require('../assets/images/shirt1.jpg'), category: 'Shirt' },
    { id: '2', name: 'GTMPRARY CRINKLE JACKET', price: '1390000', image: require('../assets/images/outer1.jpg'), category: 'Outer' },
    { id: '3', name: 'PUFFER BROWN WASHED NYLON PANTS', price: '720000', image: require('../assets/images/bottoms1.jpg'), category: 'Bottoms' },
    { id: '4', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', price: '1450000', image: require('../assets/images/bottoms2.jpg'), category: 'Bottoms' },
  ];

  const additionalProducts = [
    { id: '5', name: 'GOTM WASHED KNIT SWEATER', price: '760000', image: require('../assets/images/knit1.jpg'), category: 'Knitwear' },
    { id: '6', name: 'SFTD BEIGE WASHED RAGLAN SHIRT', price: '520000', image: require('../assets/images/shirt2.jpg'), category: 'Shirt' },
    { id: '7', name: 'HA BROWN WASHED TSHIRT', price: '510000', image: require('../assets/images/tshirt1.jpg'), category: 'T-shirt' },
    { id: '8', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', price: '750000', image: require('../assets/images/outer2.jpg'), category: 'Outer' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSlider, setShowSlider] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'đ';
  };
  

  // Hàm để gọi API và lấy sản phẩm theo danh mục
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/api/products/category/${category}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Hàm xử lý khi chọn danh mục
  const handleSelectCategory = (category) => {
    setSelectedCategory(category.name);
  
    if (category.name === 'All') {
      setProducts([...initialProducts, ...additionalProducts]); // Hiển thị tất cả sản phẩm nếu chọn 'All'
    } else {
      // Lọc sản phẩm theo danh mục đã chọn
      const filteredProducts = [...initialProducts, ...additionalProducts].filter(
        (product) => product.category === category.name
      );
      setProducts(filteredProducts); // Chỉ hiển thị sản phẩm thuộc danh mục đã chọn
    }
    
    setSliderVisible(false);
    setShowSlider(false);
  };
  
  // Gọi API khi selectedCategory thay đổi
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All') {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);
  

  const loadMoreProducts = () => {
    const currentProductCount = products.length;
    const totalAvailableProducts = initialProducts.length + additionalProducts.length;
  
    // Tính số lượng sản phẩm còn lại cần tải
    const remainingProducts = totalAvailableProducts - currentProductCount;
  
    // Chỉ tải thêm nếu còn sản phẩm để tải
    if (remainingProducts > 0) {
      const nextProductsCount = Math.min(remainingProducts, 8); // Tải tối đa 8 sản phẩm hoặc số còn lại
      const nextProducts = additionalProducts.slice(
        currentProductCount - initialProducts.length,
        currentProductCount - initialProducts.length + nextProductsCount
      );
  
      // Kiểm tra nếu nextProducts không trống trước khi thêm
      if (nextProducts.length > 0) {
        setProducts([...products, ...nextProducts]);
      }
    }
  };

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
        {/* Hiển thị Slider nếu showSlider là true */}
        {showSlider && <Slider />}

        {/* Main FlatList for products */}
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </View>
          )}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
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
    paddingHorizontal: 16,
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
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  slideContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 60,
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryList: {
    padding: 20,
  },
  categoryItem: {
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 18,
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa tên sản phẩm
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Căn giữa các cột
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
