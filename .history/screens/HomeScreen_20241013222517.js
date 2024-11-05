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

ERROR  Warning: ReferenceError: Property 'Slider' doesn't exist

This error is located at:
    in HomeScreen (created by SceneView)
    in StaticContainer
    in EnsureSingleNavigator (created by SceneView)
    in SceneView (created by BottomTabView)
    in RCTView (created by View)
    in View (created by Screen)
    in RCTView (created by View)
    in View (created by Background)
    in Background (created by Screen)
    in Screen (created by BottomTabView)
    in RNSScreen (created by Animated(Anonymous))
    in Animated(Anonymous)
    in Suspender (created by Freeze)
    in Suspense (created by Freeze)
    in Freeze (created by DelayedFreeze)
    in DelayedFreeze
    in InnerScreen (created by Screen)
    in Screen (created by MaybeScreen)
    in MaybeScreen (created by BottomTabView)
    in RNSScreenContainer (created by ScreenContainer)
    in ScreenContainer (created by MaybeScreenContainer)
    in MaybeScreenContainer (created by BottomTabView)
    in RCTView (created by View)
    in View (created by SafeAreaProviderCompat)
    in SafeAreaProviderCompat (created by BottomTabView)
    in BottomTabView (created by BottomTabNavigator)
    in PreventRemoveProvider (created by NavigationContent)
    in NavigationContent
    in Unknown (created by BottomTabNavigator)
    in BottomTabNavigator (created by TabNavigator)
    in TabNavigator (created by SceneView)
    in StaticContainer
    in EnsureSingleNavigator (created by SceneView)
    in SceneView (created by CardContainer)
    in RCTView (created by View)
    in View (created by CardContainer)
    in RCTView (created by View)
    in View (created by CardContainer)
    in RCTView (created by View)
    in View
    in CardSheet (created by Card)
    in RCTView (created by View)
    in View (created by Animated(View))
    in Animated(View) (created by PanGestureHandler)
    in PanGestureHandler (created by PanGestureHandler)
    in PanGestureHandler (created by Card)
    in RCTView (created by View)
    in View (created by Animated(View))
    in Animated(View) (created by Card)
    in RCTView (created by View)
    in View (created by Card)
    in Card (created by CardContainer)
    in CardContainer (created by CardStack)
    in RNSScreen (created by Animated(Anonymous))
    in Animated(Anonymous)
    in Suspender (created by Freeze)
    in Suspense (created by Freeze)
    in Freeze (created by DelayedFreeze)
    in DelayedFreeze
    in InnerScreen (created by Screen)
    in Screen (created by MaybeScreen)
    in MaybeScreen (created by CardStack)
    in RNSScreenContainer (created by ScreenContainer)
    in ScreenContainer (created by MaybeScreenContainer)
    in MaybeScreenContainer (created by CardStack)
    in RCTView (created by View)
    in View (created by Background)
    in Background (created by CardStack)
    in CardStack (created by HeaderShownContext)
    in RNCSafeAreaProvider (created by SafeAreaProvider)
    in SafeAreaProvider (created by SafeAreaProviderCompat)
    in SafeAreaProviderCompat (created by StackView)
    in RNGestureHandlerRootView (created by GestureHandlerRootView)
    in GestureHandlerRootView (created by StackView)
    in StackView (created by StackNavigator)
    in PreventRemoveProvider (created by NavigationContent)
    in NavigationContent
    in Unknown (created by StackNavigator)
    in StackNavigator (created by MainStackNavigator)
    in MainStackNavigator (created by App)
    in EnsureSingleNavigator
    in BaseNavigationContainer
    in ThemeProvider
    in NavigationContainerInner (created by App)
    in App
    in RCTView (created by View)
    in View (created by AppContainer)
    in RCTView (created by View)
    in View (created by AppContainer)
    in AppContainer
    in GoldieApp(RootComponent), js engine: hermes


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

