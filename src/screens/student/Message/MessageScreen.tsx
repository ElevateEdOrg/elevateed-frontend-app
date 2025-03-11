import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { getChatHistory } from '../../../state/chat/reducer';
import TextfieldComponent from '../../../components/TextfieldComponent';
import { styles } from './Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LabelComponent from '../../../components/LableComponent';
import io from 'socket.io-client';
import { RootState } from '../../../state/store';
import { Colors } from '../../../constants/colors';

const socket = io('http://ec2-54-242-88-21.compute-1.amazonaws.com', {
  path:'/api/chat/socket.io/',
  
});

const MessageScreen = ({route}) => {
  const dispatch = useAppDispatch();
const user = useAppSelector((state: RootState) => state.authReducer?.data.user);
  const {chatHistory, loading} = useAppSelector((state: any) => state.chatReducer);
  const [message, setMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<any[]>([]);

  const { chatId,userId,receiverId ,name} = route.params;
  

  useEffect(() => {
   
    if (chatId) {
      console.log("chatIddddddddd", chatId);
      dispatch(getChatHistory(chatId));
    }else {
      const instructorMessage = {
        senderId: receiverId,
        message: 'Hello! Welcome to the chat. How can I assist you?',
        receiverId: userId,
        sent_at: new Date().toISOString(),
        isNewChat:true,
      };
      socket.emit('send_message', instructorMessage);
 setTimeout(() => setLocalMessages((prev) => [ instructorMessage]), 1000);
    }
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket Connected');
    });
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('receive_message', (newMessage) => {
      console.log('New Message Received:', newMessage);
      setLocalMessages((prevMessages) => [...prevMessages, newMessage]);
      
      
    });

    return () => {
      socket.disconnect();
      console.log("Socket Disconnected");
      
      socket.off('receiveMessage');
      socket.off('connect_error');
    };
  }, [chatId, dispatch]);

  useEffect(() => {
    setLocalMessages([]);
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: userId, 
        message: message,
        receiverId: receiverId,
        sent_at: new Date().toISOString(),
      };
  
      console.log('Sending Message:', newMessage);
  
      // Directly set message locally before emitting
      setLocalMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        console.log("Updated Messages:", updatedMessages);
        return updatedMessages; // Ensure React detects the change
      });
      setMessage(''); // Clear message immediately
  
      socket.emit('send_message', newMessage, (response) => {
        console.log('Socket Response:', response);
        if (response?.success) {
          console.log('Message Delivered Successfully');
          if (chatId) {
            dispatch(getChatHistory(chatId));
          }
          
        } else {
          console.error('Message Send Error:', response?.error);
        }
      });

    }
  };
  

  // if (!user) {
  //   return <Text style={styles.loadingText}>Loading user data...</Text>;
  // }

  const messages = Array.isArray(chatHistory) ? [...chatHistory, ...localMessages] : [...localMessages];
  console.log("messagessssss", messages);
  

  const renderItem = ({item}: any) => {
  
    const isMyMessage = chatId 
    ? item.sender_id === userId || item.sender_id === undefined 
    : item.senderId === userId; 
console.log("Senderidddd",  item.sender_id);
    return (
      <View style={isMyMessage ? styles.myMessage : styles.otherMessage }>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageTime}>{new Date(item.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LabelComponent value= {name ? name: "Message"} style={styles.headerText} />
      </View>
      {loading ? (
         <ActivityIndicator size={30} color={Colors.secondary}/>
      ) : messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          removeClippedSubviews={false}
        />
      ) : (
       <ActivityIndicator size="large" color={Colors.secondary} />
      )}
      {/* {user?.full_name ? (
        <Text style={styles.footerText}>Logged in as: {user.full_name}</Text>
      ) : null} */}
      <View style={styles.inputContainer}>
        <TextfieldComponent label={''} placeholder={'Type your message...'} value={message} onChangeText={setMessage} style={styles.input}/>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <FontAwesome name="send" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default MessageScreen
