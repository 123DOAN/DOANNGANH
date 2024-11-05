import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function AddNewAddress() {
    try {
        return (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
            />
          </View>
        );
      } catch (error) {
        console.error('Error rendering MapView:', error);
        return <View><Text>Error loading map.</Text></View>;
      }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
