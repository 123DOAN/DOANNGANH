import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function AddressesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>
      
      {/* Address Card */}
      {["Home", "Work"].map((label, index) => (
        <View key={index} style={styles.addressCard}>
          <Text style={styles.label}>{label.toUpperCase()}</Text>
          <Text style={styles.addressText}>
            {index === 0 ? "2280 Wiseman Street\nFort Benning, Georgia, United States\n865-512-8826" :
                           "2687 Daylene Drive\nSouthfield, Michigan, United States\n734-583-5421"}
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton}>
            <Text style={styles.optionsText}>•••</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  addressCard: { marginBottom: 20, padding: 16, backgroundColor: '#F0F0F0', borderRadius: 8 },
  label: { fontSize: 12, color: '#333' },
  addressText: { fontSize: 16, marginVertical: 8 },
  editButton: { padding: 10, borderColor: '#000', borderWidth: 1, borderRadius: 5 },
  editText: { color: '#000' },
  optionsButton: { position: 'absolute', right: 16, top: 16 },
  optionsText: { fontSize: 18, color: '#000' },
  addButton: { backgroundColor: '#000', padding: 16, alignItems: 'center', borderRadius: 8 },
  addButtonText: { color: '#fff', fontSize: 16 }
});
