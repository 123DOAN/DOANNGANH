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


// Component HomeScreen
const HomeScreen = () => {
  const initialProducts = [
    { id: '1', name: 'TMPRARY CUPRO TANK SHIRT', price: '1,190,000₫', image: require('../assets/images/shirt1.jpg') },
    { id: '2', name: 'GTMPRARY CRINKLE JACKET', price: '1,390,000₫', image: require('../assets/images/outer1.jpg') },
    { id: '3', name: 'PUFFER BROWN WASHED NYLON PANTS', price: '720,000₫', image: require('../assets/images/bottoms1.jpg') },
    { id: '4', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', price: '1,450,000₫', image: require('../assets/images/bottoms2.jpg') },
  ];

  const additionalProducts = [
    { id: '5', name: 'GOTM WASHED KNIT SWEATER', price: '760,000₫', image: require('../assets/images/knit1.jpg') },
    { id: '6', name: 'SFTD BEIGE WASHED RAGLAN SHIRT', price: '520,000₫', image: require('../assets/images/shirt2.jpg') },
    { id: '7', name: 'HA BROWN WASHED TSHIRT', price: '510,000₫', image: require('../assets/images/tshirt1.jpg') },
    { id: '8', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', price: '750,000₫', image: require('../assets/images/outer2.jpg') },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSlider, setShowSlider] = useState(true); // Trạng thái để kiểm soát hiển thị Slider

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
    setShowSlider(false); // Ẩn Slider
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
        {/* Hiển thị Slider nếu showSlider là true */}
        {showSlider && <Slider />}

        {/* Main FlatList for products */}
        <FlatList
          data={data}
          numColumns={2} // Hiển thị 2 cột
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
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
  // Các style như cũ, nhưng xóa các style liên quan đến giảm giá
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
    borderRadius: 10,
  },
  productItem: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  moreButton: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  moreButtonText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  filterTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  categoryItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryText: {
    fontSize: 18,
  },
  categoryList: {
    paddingBottom: 20,
  },
});
