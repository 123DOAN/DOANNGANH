// ContactUs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import call from 'react-native-phone-call';

const ContactUs = () => {
  const handleCustomerServicePress = () => {
    // Cuộc gọi ảo
    const args = {
      number: '123456789', // Số giả định cho cuộc gọi
      prompt: true,
    };
    call(args).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCustomerServicePress}>
        <Text style={styles.buttonText}>Customer Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default ContactUs;
