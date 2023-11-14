import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { Alert, View, ImageBackground, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { s } from '../style/login'

const profile_background = require('../assets/fond/fond1.jpg')


export default function SignUp({navigation}){

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const handleSignup = () =>{
        if(email.trim() === "")
        {
            Alert.alert("Sign up", "Veuilez saisir votre adresse mail")
        }
        else if(password.trim() === "")
        {
            Alert.alert("Sign up", "Veuilez saisir un mot de passe")
        }
        else if(confirmPassword.trim() === "")
        {
            Alert.alert("Sign up", "Veuilez confirmer votre mot de passe")
        }
        else if(confirmPassword !== password)
        {
            Alert.alert("Sign up", "Veuilez verifier votre mot de passe")    
        }
        else if(email.trim() !== "" && password.trim() !== "")
        {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => navigation.navigate('Newprofile'))
            .catch(err => Alert.alert(err.message))
        }
    }

    const handleConfirmPassword = text =>{
        setConfirmPassword(text)
    }


    return(
        <View style = { s.container }>
            <ImageBackground source = { profile_background } resizeMode="cover" style={ s.backImage }>
                    <Text style = { s.title }> Je veux </Text>
                    <Text style = { s.title1 }> m'inscrire </Text>
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
                    placeholder = "Mot de passe"
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    secureTextEntry = { true }
                    textContentType = "password"
                    value = { password }
                    onChangeText = { text => setPassword(text) }
                />
                <TextInput
                    style = { confirmPassword === ''
                        ? s.input
                        : confirmPassword === password
                            ?s.confirmOK
                            :s.notConfirm
                }
                    placeholder = "Confirmer mot de passe"
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    secureTextEntry = { true }
                    textContentType = "password"
                    value = { confirmPassword }
                    onChangeText = { text => handleConfirmPassword(text) }
                />
                <TouchableOpacity disabled = { password!==confirmPassword? true: false} style = { s.button } onPress = { handleSignup }>
                    <Text style = { s.loginText }> S'inscrire </Text>
                </TouchableOpacity>
                <View style = { s.signUpLink }>
                    <Text style = { s.textQuestion }>Tu as déjà un compte? </Text>
                    <TouchableOpacity
                        onPress = { ()=> navigation.navigate("Login")}
                    >
                        <Text style = { s.signUpText }>S'authentifier</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View> 
    )
}