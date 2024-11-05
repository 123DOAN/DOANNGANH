// screens/ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
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

export default ProfileScreen; 
