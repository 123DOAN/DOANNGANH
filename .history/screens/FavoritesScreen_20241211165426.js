import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import fetchFavorites from '../api/favApi';


const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token không tồn tại.');
        }

        const favoriteProducts = await fetchFavorites(token); // Lấy danh sách yêu thích từ server
        const products = favoriteProducts.flatMap(item => item.data_product_id); // Lọc sản phẩm từ data_product_id
        setFavorites(products || []); // Cập nhật danh sách yêu thích
      } catch (error) {
        console.error('Lỗi khi tải danh sách yêu thích:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, []);

  const handleRemoveFavorite = async (productId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token không tồn tại.');

      // API toggle yêu thích (chưa có hàm cụ thể)
      setFavorites(favorites.filter((item) => item.product_id !== productId)); // Loại bỏ sản phẩm khỏi danh sách hiển thị
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

    const renderFavoriteItem = ({ item }) => (
      <View style={styles.itemContainer}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.product_img}` }} style={styles.image} />
      
      {/* Thông tin sản phẩm */}
      <View style={styles.infoContainer}>
        {/* Logo thương hiệu */}
        <View style={styles.brandContainer}>
          <Image source={{ uri: 'https://dummyimage.com/30x30/000/fff' }} style={styles.brandLogo} />
          <Text style={styles.productName}>{item.product_name}</Text>
        </View>

        {/* Đánh giá và giá */}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>4.5 (1045 Reviews)</Text>
        </View>
        <Text style={styles.productPrice}>
          ${parseInt(item.product_price_new, 10).toLocaleString()}
        </Text>
      </View>

      {/* Biểu tượng yêu thích */}
      <TouchableOpacity onPress={() => handleRemoveFavorite(item.product_id)} style={styles.favoriteButton}>
        <Ionicons name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
    );


    const filteredFavorites = favorites.filter((item) =>
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
  
    if (favorites.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Không có sản phẩm yêu thích nào.</Text>
        </View>
      );
    }

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#808080" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm sản phẩm yêu thích..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Danh sách yêu thích */}
      {filteredFavorites.length > 0 ? (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Không có sản phẩm yêu thích nào.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemBrand: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemName: {
    fontSize: 14,
    color: '#808080',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default FavoritesScreen;