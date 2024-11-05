import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const sections = [
    {
      title: 'General',
      data: [
        { icon: 'person-outline', label: 'Account Details', description: 'Edit your account information' },
        { icon: 'credit-card', label: 'Payment Method', description: 'Add your credit or debit Card' },
        { icon: 'location-on', label: 'Delivery Addresses', description: 'Edit or add new address' },
        { icon: 'lock-outline', label: 'Security & Password', description: 'Edit your password' },
      ],
    },
    {
      title: 'Setting',
      data: [
        { icon: 'notifications-none', label: 'Notifications', description: 'Manage your notifications' },
        { icon: 'language', label: 'Language', description: 'Change app language' },
        { icon: 'policy', label: 'Privacy & Policy', description: 'View privacy policies' },
        { icon: 'phone', label: 'Contact Us', description: 'Get in touch with us' },
      ],
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>My Account</Text>
      
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.data.map((dataItem) => (
              <TouchableOpacity key={dataItem.label} style={styles.item}>
                <Icon name={dataItem.icon} size={24} color="#333" style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{dataItem.label}</Text>
                  <Text style={styles.description}>{dataItem.description}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#333" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 15, 
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  logoutButton: {
    marginTop: 3,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
