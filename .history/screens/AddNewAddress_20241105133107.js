import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function AddNewAddress() {
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
      <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('LocationDetails')}>
        <Text style={styles.buttonText}>Location Details</Text>
      </TouchableOpacity>
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
});
