import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../firebase/firebaseConfig'
import { collection, onSnapshot } from "firebase/firestore";
import { Alert, View, ImageBackground, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import useCustomeContext from '../context/useCustomeContext'
import { s } from '../style/login'



const login_fond = require('../assets/image/login3.jpg')
const profile_background = require('../assets/fond/fond1.jpg')


export default function Login({navigation}){

    const {
        setCurrentProfile,
        setProfiles
    } = useCustomeContext()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = () =>{
        if(email.trim() === "")
        {
            Alert.alert("Log in", "Veuillez saisir votre adresse mail")
        }
        else if(password.trim() === "")
        {
            Alert.alert("Log in", "Veuillez saisir votre mot de passe")
        }
        else if(email.trim() !== "" && password.trim() !== "")
        {
            signInWithEmailAndPassword(auth, email, password)
            .then(() =>
            {
                // const q = query(collection(database, "profile"), where("idUser", "==", auth.currentUser.uid));
                const unsubscribe = onSnapshot(collection(database, "profile"), (querySnapshot) =>
                {
                    const users = [];
                    querySnapshot.forEach((doc) => {
                        users.push(doc.data());
                    });

                    setProfiles(users)
                    
                    if( users.filter( user => user.idUser === auth.currentUser.uid ).length === 0 )  navigation.navigate('Newprofile')
                    else {
                        setCurrentProfile(users.filter( user => user.idUser === auth.currentUser.uid )[0])
                        navigation.navigate('Home')
                    }
                })
            })
            .then(()=>{
                setPassword('')
                setEmail('')
            })
            .catch(err => Alert.alert(err.message))
        }
    }

    return(
        <View style = { s.container }>
            <ImageBackground source = { profile_background } resizeMode="cover" style={ s.backImage }>
                <Text style = { s.title }> Bienvenu sur </Text>
                <Text style = { s.title1 }> App Pro </Text>
            </ImageBackground>
            <SafeAreaView style = { s.form }>
                <TextInput
                    style = { s.input }
                    placeholder = "Adresse Email"
                    autoCapitalize = "none"
                    keyboardType = "email-address"
                    textContentType = "emailAddress"
                    value = { email }
                    onChangeText = { text => setEmail(text) }
                />
                <TextInput
                    style = { s.input }
                    placeholder = "Mot de passe "
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    secureTextEntry = { true }
                    textContentType = "password"
                    value = { password }
                    onChangeText = { text => setPassword(text) }
                />
                <TouchableOpacity style = { s.button } onPress = { handleLogin }>
                    <Text style = { s.loginText }> S'authentifier </Text>
                </TouchableOpacity>
                <View style = { s.signUpLink }>
                    <Text style = { s.textQuestion }>Tu n'as pas de compte? </Text>
                    <TouchableOpacity
                        onPress = { ()=> navigation.navigate("Signup")}
                    >
                        <Text style = { s.signUpText }>Créer en un</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View> 
    )
}