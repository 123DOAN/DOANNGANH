import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider'; // Đảm bảo bạn đã cài đặt thư viện này

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000000]); // Khoảng giá từ 0 đến 5 triệu
  const slideAnim = useRef(new Animated.Value(300)).current;

  const categories = [
    'Jacket',
    'Shirt',
    'Pants',
    'Shoes',
    'Accessory',
    'Hat',
  ];

  const recentSearches = [
    {
      id: '1',
      name: 'GTMPRARY CRINKLE JACKET',
      image: require('../assets/images/crinklejacket.jpg'),
    },
    {
      id: '2',
      name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET',
      image: require('../assets/images/windbreaker.jpg'),
    },
    {
      id: '3',
      name: 'MULTI BUCKLE WASHED GREY DENIM PANTS',
      image: require('../assets/images/greydenim.jpg'),
    },
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
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000000]);
  };

  const applyFilters = () => {
    // Thực hiện hành động áp dụng bộ lọc ở đây
    console.log('Selected Categories:', selectedCategories);
    console.log('Price Range:', priceRange);
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
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bộ lọc */}
      <Animated.View
        style={[styles.filterContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.filterContent}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filter Options</Text>
            <TouchableOpacity onPress={toggleFilter}>
              <Ionicons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Danh mục lọc */}
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(category) && styles.selectedCategory,
                ]}
                onPress={() => handleCategoryPress(category)}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bộ lọc giá */}
          <Text style={styles.priceTitle}>Price Range:</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5000000}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#d3d3d3"
            value={priceRange}
            onValueChange={setPriceRange}
            step={10000} // Điều chỉnh bước
          />
          <Text>
            {`₫${priceRange[0].toLocaleString()} - ₫${priceRange[1].toLocaleString()}`}
          </Text>

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
      <Text style={styles.sectionTitle}>Recent Search</Text>
      <FlatList
        data={recentSearches}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recentSearchItem}>
            <Image source={item.image} style={styles.recentSearchImage} />
            <Text style={styles.recentSearchText}>{item.name}</Text>
          </View>
        )}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
      />
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
    backgroundColor: '#f2f2f2',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    zIndex: 1,
  },
  filterContent: {
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    width: '48%', // 2 cột
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    marginRight: '4%', // Khoảng cách giữa các cột
  },
  selectedCategory: {
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 16,
  },
  priceTitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recentSearchItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  recentSearchImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recentSearchText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SearchScreen;
