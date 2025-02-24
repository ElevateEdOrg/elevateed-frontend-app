import React, { useState, useCallback } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { styles } from './Styles'; 

export default function MessageScreen() {
  const route = useRoute();
  const { contact } = route.params as { contact: { id: string; name: string; profileImage: string } };

  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello! How are you?',
      createdAt: new Date(),
      user: { _id: 2, name: contact.name, avatar: contact.profileImage },
    },
  ]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
              translucent = {true}
              backgroundColor={'transparent'}
              barStyle={'light-content'}
            />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1, name: 'You' }}
      />
    </SafeAreaView>
  );
}
