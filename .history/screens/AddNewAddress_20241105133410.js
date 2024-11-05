import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddNewAddress() {
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái cho modal
  const [address, setAddress] = useState(''); // Trạng thái cho địa chỉ
  const [landmark, setLandmark] = useState(''); // Trạng thái cho địa điểm

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Icon name="search" size={20} color="black" style={styles.searchIcon} />
      </View>
      
      {/* Bản đồ */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.8015,
          longitude: 106.6528,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}        
        showsUserLocation={true}
      />
      
      {/* Nút chọn địa điểm */}
      <View style={styles.locationMarker}>
        <Icon name="map-marker" size={40} color="black" />
      </View>

      {/* Nút điều hướng đến trang Location Details */}
      <TouchableOpacity 
        style={styles.detailsButton} 
        onPress={() => setModalVisible(true)} // Hiện modal khi nhấn
      >
        <Text style={styles.buttonText}>Location Details</Text>
      </TouchableOpacity>

      {/* Modal cho Location Details */}
      <Modal
        animationType="slide" // Hiệu ứng slide
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible); // Đóng modal khi nhấn nút quay lại
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress} // Cập nhật trạng thái địa chỉ
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={landmark}
              onChangeText={setLandmark} // Cập nhật trạng thái địa điểm
            />
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)} // Đóng modal
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
    zIndex: 1,
  },
  detailsButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
});