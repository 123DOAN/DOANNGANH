import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', name: 'Dragon Tree', image: require('../assets/images/dragon_tree.jpg') },
    { id: '2', name: 'Palm Tree', image: require('../assets/images/palm_tree.jpg') },
    { id: '3', name: 'Umbrella Tree', image: require('../assets/images/umbrella_tree.jpg') },
    { id: '4', name: 'Weeping Fig', image: require('../assets/images/weeping_fig.jpg') },
  ]);

  const handleSearch = () => {
    // Thêm logic tìm kiếm tại đây
    console.log(`Searching for: ${searchText}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.recentSearchItem}>
      <Image source={item.image} style={styles.recentSearchImage} />
      <Text style={styles.recentSearchText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text>◀</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tree"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton} onPress={handleSearch}>
          <Image source={require('../assets/images/filter_icon.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {/* Kết quả tìm kiếm gần đây */}
      <Text style={styles.recentSearchTitle}>Recent Search</Text>
      <FlatList
        data={recentSearches}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

// Styles cho trang tìm kiếm
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
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    padding: 10,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  recentSearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentSearchItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  recentSearchImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  recentSearchText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
