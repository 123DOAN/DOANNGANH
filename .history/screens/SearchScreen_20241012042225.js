import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider'; // Import Slider

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false); // Trạng thái cho Modal filter
  const [priceRange, setPriceRange] = useState([100, 3000]); // Giá mặc định

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
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setFilterVisible(true)} // Mở Modal khi nhấn
        >
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
        columnWrapperStyle={{ justifyContent: 'flex-start' }} 
      />

      {/* Modal Filter */}
      <Modal
        transparent={true}
        visible={filterVisible}
        animationType="slide" // Hoặc 'fade'
        onRequestClose={() => setFilterVisible(false)} // Đóng Modal khi bấm nút back
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter</Text>
            <Text style={styles.sectionTitle}>Price</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={100}
              maximumValue={3000}
              value={priceRange}
              onValueChange={value => setPriceRange(value)}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setFilterVisible(false)} style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  applyButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: 'white',
  },
});

export default SearchScreen;
