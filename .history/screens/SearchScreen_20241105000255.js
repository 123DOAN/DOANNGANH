import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(0);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const navigation = useNavigation(); // Sử dụng useNavigation để truy cập vào navigation

  const categories = [
    'All',
    'Outer',
    'Knitwear',
    'T-shirt',
    'Polo Shirt',
    'Shirt',
    'Sweatershirt & Hoodie',
    'Bottoms',
  ];

  const recentSearches = [
    { id: '1', name: 'GTMPRARY CRINKLE JACKET', image: require('../assets/images/outer1.jpg') },
    { id: '2', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', image: require('../assets/images/outer2.jpg') },
    { id: '3', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', image: require('../assets/images/bottoms2.jpg') },
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
    toggleFilter();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Jacket"
          value={searchText}
          onChangeText={text => setSearchText(text)}/>
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Nền mờ khi bộ lọc mở */}
      {filterVisible && <View style={styles.overlay} />}

      {/* Bộ lọc */}
      <Animated.View style={[styles.filterContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.filterContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleFilter}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          
          <Text style={styles.filterTitle}>Filter</Text>
         
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
            <Text style={styles.priceTitle}>Price: {price.toLocaleString()}đ</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={5000000} 
              step={10000} 
              value={price} 
              onValueChange={(value) => setPrice(value)} 
              minimumTrackTintColor="black" 
              maximumTrackTintColor="#d3d3d3" 
              thumbTintColor="black"
            />

            <View style={styles.priceLabelContainer}>
              <Text style={styles.priceLabel}>0đ</Text>
              <Text style={styles.priceLabel}>5,000,000đ</Text>
            </View>
          </View>

          {/* Nút Clear và Apply */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply</Text>
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
    paddingTop: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen với độ mờ 50%
    zIndex: 0, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
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
    fontSize: 20,
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
  priceFilter: {
    marginVertical: 20,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  priceLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: 'white', 
    padding: 10,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  applyButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
  clearButtonText: {
    color: 'gray',
    textAlign: 'center',
  },
  applyButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  mutedContainer: {
    opacity: 0.3,
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
