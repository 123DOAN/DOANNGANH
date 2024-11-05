import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [expanded, setExpanded] = useState(null);

  const tabs = ['General', 'Account', 'Service', 'Payment'];
  const questions = [
    { id: 1, question: 'What is Snapshop?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, question: 'How does it work?', answer: 'Sed do eiusmod tempor incididunt ut labore.' },
    { id: 3, question: 'Can I trust it?', answer: 'Dolore magna aliqua. Ut enim ad minim veniam.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {questions.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.questionContainer}
          onPress={() => setExpanded(expanded === item.id ? null : item.id)}
        >
          <Text style={styles.questionText}>{item.question}</Text>
          {expanded === item.id && (
            <Text style={styles.answerText}>{item.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  questionContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default PrivacyPolicy;
