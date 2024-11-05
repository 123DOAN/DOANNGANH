import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

export default function AddNewAddress() {
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm vị trí */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // Đặt lại vị trí dựa trên kết quả tìm kiếm
          const { lat, lng } = details.geometry.location;
          setRegion({
            ...region,
            latitude: lat,
            longitude: lng,
          });
        }}
        query={{
          key: 'YOUR_GOOGLE_MAPS_API_KEY',
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.searchContainer,
          textInput: styles.searchInput,
          predefinedPlacesDescription: {
            color: 'black',
          },
        }}
      />

      {/* Bản đồ */}
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        <Marker coordinate={region} />
      </MapView>

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
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: '100%',
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
