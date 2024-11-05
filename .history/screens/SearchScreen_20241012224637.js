import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const slideAnim = useRef(new Animated.Value(300)).current;

  const categories = [
    'All',
    'Outer',
    'Knitwear',
    'T-shirt',
    'Polo Shirt',
    'Shirt',
    'Sweatershirt & Hoodie ',
    'Bottoms',
  ];

  const recentSearches = [
    { id: '1', name: 'GTMPRARY CRINKLE JACKET', image: require('../assets/images/crinklejacket.jpg') },
    { id: '2', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', image: require('../assets/images/windbreaker.jpg') },
    { id: '3', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', image: require('../assets/images/greydenim.jpg') },
  ];

  const toggleFilter = () => {
    const toValue = filterVisible ? 300 : 0;
    setFilterVisible(!filterVisible);
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCategoryPress = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
  };

  const applyFilters = () => {
    // Thực hiện hành động áp dụng bộ lọc ở đây
    toggleFilter();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Jacket"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Nền mờ khi bộ lọc mở */}
      {filterVisible && <View style={styles.overlay} />}

      {/* Bộ lọc */}
      <Animated.View style={[styles.filterContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.filterContent}>
          {/* Nút "X" để đóng bộ lọc */}
          <TouchableOpacity style={styles.closeButton} onPress={toggleFilter}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          
          <Text style={styles.filterTitle}>Filter Options</Text>
         
          {/* Danh mục lọc thành 2 cột */}
          <Text style={styles.categoriesTitle}>Categories</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category} 
                style={[
                  styles.categoryButton, 
                  selectedCategories.includes(category) && styles.selectedCategory
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bộ lọc giá */}
          <View style={styles.priceFilter}>
          <Text style={styles.priceTitle}>Price</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Min"
              value={minPrice}
              keyboardType="numeric"
              onChangeText={setMinPrice}
            />
            <TextInput
              style={styles.priceInput}
              placeholder="Max"
              value={maxPrice}
              keyboardType="numeric"
              onChangeText={setMaxPrice}
            />
          </View>

          {/* Nút Clear và Apply */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Recent Search */}
      <View style={filterVisible ? styles.mutedContainer : null}>
        <Text style={styles.sectionTitle}>Recent Search</Text>
        <FlatList
          data={recentSearches}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.recentSearchItem}>
              <Image source={item.image} style={styles.recentSearchImage} />
              <Text style={styles.recentSearchText}>{item.name}</Text>
            </View>
          )}
          columnWrapperStyle={{ justifyContent: 'flex-start' }} 
        />
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen với độ mờ 50%
    zIndex: 0, // Đảm bảo overlay ở dưới bộ lọc
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  filterContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 300,
    height: '100%',
    backgroundColor: 'white', // Thay đổi thành màu trắng
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    zIndex: 1,
  },
  filterContent: {
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end', // Đặt nút "X" ở góc trên bên phải
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  categoriesTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Cho phép các mục tràn ra dòng mới
    justifyContent: 'space-between', // Căn giữa giữa các cột
  },
  categoryButton: {
    paddingVertical: 10, // Padding theo chiều dọc
    paddingHorizontal: 15, // Padding theo chiều ngang giúp mở rộng nút
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginVertical: 6,
    alignSelf: 'flex-start', // Nút sẽ chỉ mở rộng theo nội dung bên trong
  },
  selectedCategory: {
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
  },
  priceTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  priceFilter: {
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: 'white', // Màu nền trắng
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    borderColor: 'black', // Viền đen
    borderWidth: 1, // Độ dày của viền
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  mutedContainer: {
    opacity: 0.5, // Độ mờ cho phần sản phẩm gần đây
  },
  recentSearchItem: {
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
  recentSearchImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recentSearchText: {
    padding: 10,
    textAlign: 'center',
  },
});

export default SearchScreen;
