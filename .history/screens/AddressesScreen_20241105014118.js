import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddressesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>
      
      {/* Address Card */}
      {["Home", "Work"].map((label, index) => (
        <View key={index} style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Text style={styles.label}>{label.toUpperCase()}</Text>
            <Icon name="check-circle" size={20} color="#000" style={styles.checkIcon} />
          </View>
          
          <Text style={styles.addressText}>
            {index === 0 ? "2280 Wiseman Street\nFort Benning, Georgia, United States\n865-512-8826" :
                           "2687 Daylene Drive\nSouthfield, Michigan, United States\n734-583-5421"}
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
              <Icon name="more-vert" size={24} color="#333" />
            </TouchableOpacity>
          </View>
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
  addressCard: { 
    marginBottom: 20, 
    padding: 16, 
    backgroundColor: '#F8F8F8', 
    borderRadius: 12, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  checkIcon: {
    color: '#007AFF',
  },
  addressText: { 
    fontSize: 16, 
    color: '#555', 
    marginVertical: 8 
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  editButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderColor: '#007AFF', 
    borderWidth: 1, 
    borderRadius: 8,
  },
  editText: { 
    color: '#007AFF', 
    fontWeight: '500' 
  },
  optionsButton: { 
    padding: 8,
  },
  addButton: { 
    backgroundColor: '#000', 
    padding: 16, 
    alignItems: 'center', 
    borderRadius: 8 
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});
