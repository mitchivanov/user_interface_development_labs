import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {Avatar, Image} from "react-native-elements";
import {auth} from "../firebase";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Avatar rounded
                    size= "large"
                    source={{ uri: auth?.currentUser?.photoURL}}>
            </Avatar>
            <View style={{marginLeft: 10}}>
                <View style={styles.info}>
                    <Text style={styles.name}>
                        <Text style={{fontWeight: "bold"}}>Name: </Text>
                        { auth?.currentUser?.displayName } </Text>
                    <Text style={styles.email}>
                        <Text style={{fontWeight: "bold", fontStyle: "normal"}}>Email: </Text>
                        { auth?.currentUser?.email } </Text>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,

    },

    info: {
        marginTop: 10,
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 20,
        color: '#504F63FF',
    }
})