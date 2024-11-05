import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddressesScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0); // Mặc định chọn địa chỉ đầu tiên

  return (
    <ScrollView style={styles.container}>
      
      {/* Address Card */}
      {["Home", "Work"].map((label, index) => (
        <View key={index} style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Text style={styles.label}>{label.toUpperCase()}</Text>
            
            {/* Checkmark với sự kiện chọn */}
            <TouchableOpacity onPress={() => setSelectedIndex(index)}>
              <Icon 
                name="check-circle" 
                size={20} 
                color={selectedIndex === index ? "white" : "#777777"} // Màu #007AFF nếu được chọn, #ccc nếu chưa
                style={styles.checkIcon} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.addressText}>
            {index === 0 ? "174 Bùi Thị Xuân\nPhường 3, Tân Bình, TP.HCM\n084-484-1724" :
                           "29 Nguyễn Chính Sắt\nPhường 5, Tân Bình, TP.HCM\n091-253-4567"}
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit Address</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.optionsButton} 
              onPress={() => setSelectedIndex(index)} // Cập nhật selectedIndex khi nhấn vào nút thêm tuỳ chọn
            >
              <Icon name="more-vert" size={24} color="white" />
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
    backgroundColor: '#000000', 
    borderRadius: 12, 
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
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white' 
  },
  checkIcon: {
    marginLeft: 8,
  },
  addressText: { 
    fontSize: 16, 
    color: 'white', 
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
    borderWidth: 1, 
    borderRadius: 8,
    backgroundColor: 'white',
  },
  editText: { 
    color: '#000000', 
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
