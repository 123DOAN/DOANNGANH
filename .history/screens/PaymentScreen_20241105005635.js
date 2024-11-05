import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentScreen = ({ navigation }) => {
  const cards = [
    { id: '1', type: 'MasterCard', lastDigits: '7488', expiry: '01/25', selected: true },
    { id: '2', type: 'MasterCard', lastDigits: '7488', expiry: '01/25', selected: false },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardType}>{item.type} - {item.lastDigits}</Text>
      <Text style={styles.cardExpiry}>{item.expiry}</Text>
      <Ionicons
        name={item.selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={item.selected ? 'black' : 'grey'}
        style={styles.cardIcon}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
      </View>

      <Text style={styles.subtitle}>My Cards</Text>

      {/* Display Card */}
      <View style={styles.cardDisplay}>
        <Ionicons name="card" size={24} color="white" style={styles.cardIconDisplay} />
        <Text style={styles.cardNumber}>5698 56254 6786 9979</Text>
        <Text style={styles.cardHolder}>Card Holder</Text>
        <Text style={styles.cardName}>Name Here</Text>
        <MaterialCommunityIcons name="credit-card" size={24} color="white" style={styles.cardTypeIcon} />
      </View>

      {/* List of Cards */}
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Add Card Button */}
      <TouchableOpacity style={styles.addCardButton} onPress={() => navigation.navigate('AddNewCardScreen')}>
        <Ionicons name="add" size={24} color="black" />
        <Text style={styles.addCardText}>Add credit card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  cardDisplay: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
  },
  cardIconDisplay: {
    marginBottom: 10,
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  cardHolder: {
    color: 'grey',
    fontSize: 14,
  },
  cardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardExpiry: {
    color: 'grey',
  },
  cardIcon: {
    marginLeft: 'auto',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addCardText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
});

export default PaymentScreen;
