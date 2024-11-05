import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  
  // Dữ liệu cho tìm kiếm gần đây
  const recentSearches = [
    { id: '1', name: 'GTMPRARY CRINKLE JACKET', image: require('../assets/images/crinklejacket.jpg') },
    { id: '2', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', image: require('../assets/images/windbreaker.jpg') },
    { id: '3', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', image: require('../assets/images/greydenim.jpg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={30} color="black" />
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tree"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

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
        columnWrapperStyle={{ justifyContent: 'flex-start' }} // Thêm dòng này để căn trái sản phẩm lẻ
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
    textAlign: 'center', 
  },
});

export default SearchScreen;
