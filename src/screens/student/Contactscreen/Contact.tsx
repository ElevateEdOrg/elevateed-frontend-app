import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { RootState } from '../../../state/store';
import LabelComponent from '../../../components/LableComponent';
import { styles } from './Styles';
import { useNavigation } from '@react-navigation/native';
import { Chat, getChatList } from '../../../state/chat';
import ContactCardComponent from '../../../components/ContactListComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Contact = () => {
    const navigation = useNavigation();

      const dispatch = useAppDispatch();
        const { chatList, loading, error } = useAppSelector((state: RootState) => state.chatReducer);
        const [userId, setUserId] = useState('');

         useEffect(() => {
    const fetchUserData = async () => {
    //   try {
    //     const storedUser = await AsyncStorage.getItem('user');
    //     if (storedUser) {
    //       const parsedUser = JSON.parse(storedUser);
    //       setUserId(parsedUser.id);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    setUserId('04b8bbab-e20f-4b6e-9020-e8c51dad9a43');

    };

    fetchUserData();
  }, []);

    useEffect(() => {
        console.log("hbvhyfbvjhbvjfnb");
        
    if (userId) {
      dispatch(getChatList(userId));
    }
  }, [userId, dispatch]);

  const sortedChatList = [...chatList].sort((a: Chat, b: Chat) => new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime());
  const renderItem = ({ item }: any) => {
    const isUnread = item.has_unread_messages;
    console.log("chat idddddd: ", item.chat_id);
    
    return (
    
      <ContactCardComponent
      avatar={item.user1_avatar}
      name={item.user1_name}
      lastMessage={item.last_message}
      lastMessageTime={item.last_message_time}
      hasUnreadMessages={item.has_unread_messages}
      onPress={() =>   navigation.navigate('MessageScreen', {chatId: item.chat_id})}
    />
   
     
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <LabelComponent value="Contacts" style={styles.headerText} />
      </View>
    <View >
      <FlatList
        data={sortedChatList}
        keyExtractor={(item) => item.chat_id}
        renderItem={renderItem}
      />
    </View>
    </SafeAreaView>

  )
}

export default Contact
