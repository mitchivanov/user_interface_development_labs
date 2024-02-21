import { StyleSheet, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import React, { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Экран входа
// В props принимает объект навигации, который неявно передается от родительского компонента Stack
const LoginScreen = ({ navigation }) => {

    // Обрабатываем изменения пользовательского ввода
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Произойдет только один раз при инициализации компонента
    useEffect( () => {
        // Добавляем обработчик изменения состояния авторизации
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                auth.updateCurrentUser = authUser;
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    // Хук useEffect позволяет отслеживать изменения состояния зависимостей; второй аргумет - это и есть массив зависимостей
    // При изменении хотя бы одного из элементов массива, выполняется код коллбэка
    // Если передать пустой массив зависимостей, то коллбэк выполнится только один раз при инициализации компонента на экране
    // Если не передать второй аргумент вообще, то коллбэк будет выполняться многократно при каждой перерисовке компонента
    }, []);

    // Обработчик авторизации
    // В promise происходит запрос на сервер: передаются email и пароль для авторизации
    // В случае ошибки появится всплывающее окно
    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => alert(error.message));
    };
    // Используя объект навигации переходим на экран с name="Register"
    const toRegister = () => { navigation.navigate('Register')};

  return (
    <View style={styles.container}>
        <StatusBar style="light"/>
        <Image source={{
            uri: "https://play-lh.googleusercontent.com/yNLrKzTLtlw6mzEhNr0wxAHYMYtTu-K9PKXC_pvahCdv0Cl2WgLENPwgMWUyDeSYFow",
        }}
        style = {{width: 100, height: 100}}/>
        <View style={styles.inputContainer}>
            <Input placeholder="Email" autoFocus type="email" value={email} 
            onChangeText = {(text) => setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry type="password" value={password}
            onChangeText = {(text) => setPassword(text)}
            onSubmitEditing = {signIn}/>
        </View>
        <Button color="secondary" containerStyle={styles.button} onPress={signIn} title='Login'/>
        <Button color="secondary" containerStyle={styles.button} onPress={toRegister} type="outline" title='Register'/>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
});