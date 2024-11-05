import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function AddAddressMapScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search" />
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.8103, // Đặt tọa độ bản đồ mặc định
          longitude: 90.4125,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 23.8103, longitude: 90.4125 }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 8,
    zIndex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
