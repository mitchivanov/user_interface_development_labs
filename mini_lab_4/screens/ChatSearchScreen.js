import {SafeAreaView, ScrollView,  StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import ChatListItem from '../components/ChatListItem';

const ChatSearchScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [chats, setChats] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Search for chat",
        })
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }

    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", '>=', input), where("chatName", '<=', input + '\uf8ff'));
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                chats.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            console.log(chats);
            setChats(chats);
            });
        },[input]);

  return (
    <View style={styles.container}>
      <Input placeholder='Enter chat name' value={input}
          onChangeText={(text) => setInput(text)}
          value={input}
          leftIcon={
                <Icon name="search" size={20} color="black"/>
          }
      />

      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.container}>
            {chats.map( ({id, data: { chatName }}) => (
                <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
            ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
};

export default ChatSearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
        height: "100%",
    }
})