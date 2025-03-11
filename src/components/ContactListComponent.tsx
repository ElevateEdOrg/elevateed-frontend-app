import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { image } from '../constants/images';
import { Colors } from '../constants/colors';

interface ContactCardProps {
  avatar: string | null;
  name: string;
  lastMessage: string;
  lastMessageTime: string | number | Date;
  hasUnreadMessages: boolean;
  onPress: () => void;
}

const ContactCardComponent: React.FC<ContactCardProps> = ({ avatar, name, lastMessage, lastMessageTime, hasUnreadMessages, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: hasUnreadMessages ? Colors.primary : Colors.card_background }]} onPress={onPress}>
      <View style={styles.cardContent}>
       {avatar ? (
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                  <Image source={image.PROFILEPERSON} style={styles.avatarPlaceholder}/>
               
                )}
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <FontAwesome name="user" size={14} color="#888" style={styles.icon} />
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={styles.message} numberOfLines={2}>{lastMessage}</Text>
          <Text style={styles.time}>{new Date(lastMessageTime).toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: hp("1.5%"),
    marginVertical: hp("1%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: hp("8%"),
    height: hp("8%"),
    borderRadius: 50,
    marginRight: wp("4%"),
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  message: {
    fontSize: 14,
    color: '#888',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
});

export default ContactCardComponent;
