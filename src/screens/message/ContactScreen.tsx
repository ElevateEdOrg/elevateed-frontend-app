import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles'; 

const contacts = [
  { id: '1', name: 'Robert Henry', profileImage: 'https://randomuser.me/api/portraits/men/0.jpg' },
  { id: '2', name: 'Emily Davis', profileImage: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '3', name: 'John Doe', profileImage: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

export default function ContactsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Contacts</Text>
      <View style={styles.titleContainer}>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => navigation.navigate('MessageScreen', { contact: item })}
            >
              <Image source={{ uri: item.profileImage }} style={styles.contactImage} />
              <Text style={styles.contactName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
