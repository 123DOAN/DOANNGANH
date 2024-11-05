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
};

export default ProfileScreen; 
