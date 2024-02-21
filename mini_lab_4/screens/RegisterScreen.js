import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import React, { useState } from 'react';
import {StatusBar} from "expo-status-bar";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { deafultPicURL } from '../utils';



const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => { 
                updateProfile(userCredential.user,
                        {
                            displayName: name,
                            photoURL: imageUrl || deafultPicURL
                        }
                    ).catch(error => alert(error.message));
            })
            .catch(error => alert(error.message));
        }
  return (
    <View style={styles.container}>
        <StatusBar style="light"/>
        <Text h3 style={{ marginBottom: 50 }}> Create an account </Text>
        <View style={styles.inputContainer}>
            <Input placeholder="Full Name" autoFocus type="text" value={name}
            onChangeText={(text)=>setName(text)}/>
            <Input placeholder="Email" type="email" value={email}
            onChangeText={(text)=>setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry type="password" value={password}
            onChangeText={(text)=>setPassword(text)}/>
            <Input placeholder="Image URL (optional)" type="text" value={imageUrl}
            onChangeText={(text)=>setImageUrl(text)}
            onSubmitEditing={register}/>
        </View>
        <Button containerStyle={styles.button} 
        raised onPress={register} title='Register'/>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300
    }
});