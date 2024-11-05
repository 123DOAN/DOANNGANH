import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native';


const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  
  // Dữ liệu cho tìm kiếm gần đây
  const recentSearches = [
    { id: '1', name: 'GTMPRARY CRINKLE JACKET', image: require('../assets/images/crinklejacket.jpg') },
    { id: '2', name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', image: require('../assets/images/windbreaker.jpg') },
    { id: '3', name: 'MULTI BUCKLE WASHED GREY DENIM PANTS', image: require('../assets/images/greydenim.jpg') },
  ];

  const openFilterModal = () => {
    setFilterVisible(true);
  };

  // Đóng Modal lọc
  const closeFilterModal = () => {
    setFilterVisible(false);
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
        columnWrapperStyle={{ justifyContent: 'flex-start' }} 
      />

       {/* Modal Filter */}
       <Modal visible={filterVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header của Modal */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeFilterModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filter</Text>
            </View>

            {/* Danh mục sản phẩm */}
            <Text style={styles.modalSectionTitle}>Categories</Text>
            <View style={styles.categoryContainer}>
              {/* Thêm danh mục sản phẩm ở đây */}
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Office Chairs</Text>
              </TouchableOpacity>
              {/* Thêm các nút lọc khác tương tự */}
            </View>

            {/* Phạm vi giá */}
            <Text style={styles.modalSectionTitle}>Price</Text>
            <Slider
              minimumValue={100}
              maximumValue={3000}
              step={100}
              style={{ width: '100%' }}
            />
            <View style={styles.priceLabels}>
              <Text>$100</Text>
              <Text>$3000</Text>
            </View>

            {/* Nút Apply và Clear */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={() => { /* Clear filter logic */ }}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={closeFilterModal}>
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
    textAlign: 'center', 
  },
});

export default SearchScreen;
