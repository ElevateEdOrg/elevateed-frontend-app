import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { getChatHistory } from '../../../state/chat/reducer';
import { Colors } from '../../../constants/colors';
import TextfieldComponent from '../../../components/TextfieldComponent';
import { styles } from './Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LabelComponent from '../../../components/LableComponent';

const MessageScreen = ({route}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.authReducer?.data?.user);
  const {chatHistory, loading} = useAppSelector((state: any) => state.chatReducer);
  const [message, setMessage] = useState('');

  const { chatId } = route.params;
  console.log("chatIddddddddd", chatId);

  useEffect(() => {
    if (chatId) {
      dispatch(getChatHistory(chatId));
    }
  }, [chatId, dispatch]);

  const handleSend = () => {
    // if (message.trim()) {
    //   dispatch(sendMessage({ chatId, message }));
    //   setMessage('');
    // }
  };

  if (!user) {
    return <Text style={styles.loadingText}>Loading user data...</Text>;
  }

  const messages = Array.isArray(chatHistory) ? chatHistory : [];

  const renderItem = ({item}: any) => {
    const isMyMessage = item.sender_id === '04b8bbab-e20f-4b6e-9020-e8c51dad9a43';
    console.log("Senderidddd",  user.id);
    

    return (
      <View style={isMyMessage ? styles.myMessage : styles.otherMessage}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageTime}>{new Date(item.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
      <LabelComponent value="Messages" style={styles.headerText} />
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading messages...</Text>
      ) : messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.message_id.toString()}
          renderItem={renderItem}
          removeClippedSubviews={false}
        />
      ) : (
        <Text style={styles.loadingText}>No messages found</Text>
      )}
      {user?.full_name ? (
        <Text style={styles.footerText}>Logged in as: {user.full_name}</Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextfieldComponent label={''} placeholder={'Type your message...'} value={message} onChangeText={setMessage} style={styles.input}/>
      
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <FontAwesome name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

export default MessageScreen

