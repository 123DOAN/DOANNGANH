import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // Dùng useRef để giữ giá trị không bị reset

  // Dữ liệu cho tìm kiếm gần đây
  const recentSearches = [
    { id: '1', name: 'GTMPRARY CRINKLE JACKET', image: require('../assets/images/crinklejacket.jpg') },
    { id: '2', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', image: require('../assets/images/windbreaker.jpg') },
    { id: '3', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', image: require('../assets/images/greydenim.jpg') },
  ];

  const toggleFilter = () => {
    const toValue = filterVisible ? 300 : 0; // Nếu bộ lọc đang hiển thị thì trượt vào (ẩn), ngược lại trượt ra (hiện)
    setFilterVisible(!filterVisible); // Cập nhật trạng thái hiển thị bộ lọc
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
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

      {/* Bộ lọc */}
      {filterVisible && (
        <TouchableOpacity 
      style={styles.filterBackground} 
      onPress={toggleFilter} // Tắt bộ lọc khi nhấn ra ngoài
    />
  )}
      <Animated.View style={[styles.filterContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.filterContent}>
          <Text style={styles.filterTitle}>Filter Options</Text>
          {/* Thêm các tùy chọn bộ lọc ở đây */}
        </View>
      </Animated.View>

      {/* Recent Search */}
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
    position: 'absolute', // Để bộ lọc có thể trượt từ bên phải
    right: 0,
    top: 0,
    width: 300, // Độ rộng của bộ lọc
    height: '100%', // Để chiếm toàn bộ chiều cao của màn hình
    backgroundColor: '#f2f2f2',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    zIndex: 1, // Để chắc chắn rằng bộ lọc nằm trên các phần tử khác
  },
  filterContent: {
    padding: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
