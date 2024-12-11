import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getProfileApi from '../api/profileApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const AccountDetailsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '', // Thêm số điện thoại vào state
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
        if (token) {
          const data = await getProfileApi(token);
          setProfile({
            name: data.name || '',
            email: data.email || '',
          });
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy token.');
        }
      } catch (error) {
        Alert.alert('Lỗi', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
      if (token) {
        // Gọi API để cập nhật thông tin người dùng
        const updatedProfile = await updateProfileApi(token, profile); // Giả sử updateProfileApi là hàm cập nhật thông tin người dùng
        if (updatedProfile) {
          Alert.alert('Thông báo', 'Cập nhật thành công');
          setIsEditing(false); // Quay lại chế độ xem thông tin
        } else {
          Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
        }
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy token.');
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Chuyển sang chế độ chỉnh sửa
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            placeholderTextColor="#A9A9A9"
            value={profile.name}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, name: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={profile.email}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, email: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            placeholderTextColor="#A9A9A9"
            value={profile.mobile}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, mobile: text }))
            }
          />
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 8,
    fontSize: 16,
    color: 'black',
  },
  editButton: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountDetailsScreen;
