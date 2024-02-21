import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import ChatListItem from '../components/ChatListItem';
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import {auth, db} from '../firebase';
import {collection, onSnapshot, query, where} from 'firebase/firestore';

const HomeScreen = ({navigation}) => {
    // Отслеживаем и обрабатываем изменения списка чатов
    const [chats, setChats] = useState([]);

    // При выходе из учетки возвращаемся на экран Login
    const signOut = () => {
        auth.signOut().then(()=> {
            navigation.replace("Login");
        });
    };
    //
    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        return onSnapshot(q, (querySnaphots) => {
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
    }, [])

    // Перед отрисовкой UI настраиваем содержимое верхней плашки
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "PolyChat",
            headerStyle : { backgroundColor: "#fff" },
            headerTitleStyle: {color: "black"},
            // Задаем разметку частей слева и справа от заголовка
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('Profile')}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 120,
                    marginRight: 20,
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("ChatSearch")} activeOpacity={0.5}>
                        <Ionicons name='search' size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                        <Ionicons name='exit' size={24} color="black"/>
                    </TouchableOpacity> 
                </View>
            )
        })
    }, [navigation])

    // Переходим на экран чата; при этом передаем id и name выбранного чата, 
    // чтобы на экране чата отобразить нужное содержимое
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }
  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
            {chats.map( ({id, data: { chatName }}) => (
                <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
            ))}   
        </ScrollView>
    </SafeAreaView>
  )
};

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})