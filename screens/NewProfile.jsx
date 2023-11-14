import { useState } from 'react'
import { View, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { auth, database } from '../firebase/firebaseConfig'
import { s } from '../style/newprofile'
import { collection, doc, setDoc, query, onSnapshot, where } from "firebase/firestore"
import useCustomeContext from '../context/useCustomeContext'


const profile_background = require('../assets/fond/fond1.jpg')

function NewProfile({ navigation }) {

    const { setCurrentProfile } = useCustomeContext()

    const [ profile, setProfile ] = useState({
        fonction: '', 
        telephone: '', 
        nom: '', 
        idUser: auth.currentUser.uid, 
        email: auth.currentUser.email
    })

    const fonctions = [
        {key: '1', value: 'Assistant comptable'},
        {key: '2', value: 'Chauffeur'},
        {key: '3', value: 'Chef de service'},
        {key: '4', value: 'Comptable'},
        {key: '5', value: 'Coursier'},
        {key: '6', value: 'Directeur'},
        {key: '7', value: 'Secrétaire'},
        {key: '8', value: 'Sécurité'},
        {key: '9', value: 'Stagiaire'},
        {key: '10', value: 'Technicien de surface'},
        {key: '11', value: 'Autre'},
    ]

    const handleSubmit = () => {
        if(profile.nom.trim() === "")
        {
            Alert.alert("Nouveau profil", "Veuillez saisir votre nom complet")
        }
        else if( profile.fonction.trim() === "")
        {
            Alert.alert("Nouveau profil", "Veuillez selectionner une fonction")
        }
        else if( profile.telephone.trim() ==="")
        {
            Alert.alert("Nouveau profil", "Veuillez indiquer le numero de telephone")
        }
        else
        {
            const newUserRef = doc(collection(database, "profile"));
            setDoc(newUserRef, profile)
            .then( ()=>
                {
                    setProfile({
                    idUser: auth.currentUser.uid, 
                    email: auth.currentUser.email
                })
            navigation.navigate("Home")})
            .then( ()=>
            {
                const q = query(collection(database, "profile"), where("idUser", "==", auth.currentUser.uid))
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                });
                setCurrentProfile(users[0])})
            })
            .catch(error =>{
                Alert.alert("Create profile",error.message)
            })
            
        }
    }

    return(
        <ImageBackground source = { profile_background } style = { s.container }>
            <View style = { s.title }>
                <Text style = { s.titleText }>
                    Créer 
                </Text>
                <Text style = { s.titleText }>
                    Mon profil
                </Text>
            </View>
            <View style = { s.form }>
                <TextInput 
                    placeholder = "Votre nom complet"
                    autoCorrect = { false }
                    textContentType = "name"
                    autoCapitalize = "words"
                    style = { s.input }
                    value = { profile.nom }
                    onChangeText = { text => setProfile({...profile, nom: text})}
                />
                < SelectList
                    placeholder = "Selectionner votre fonction"
                    save = 'value'
                    notFoundText ="aucun resultat"
                    boxStyles = { s.input }
                    inputStyles = { s.style }
                    dropdownStyles = { s.dropdown }
                    data = { fonctions }
                    setSelected = { val => setProfile({...profile, fonction: val})}
                />
                <TextInput 
                    textContentType = "telephoneNumber"
                    placeholder = "Numero de telephone"
                    keyboardType = "phone-pad"
                    style = { s.input }
                    maxLength = {10}
                    value = { profile.telephone }
                    onChangeText = { text => setProfile({...profile, telephone: text})}
                />
                <View style = { s.buttonSection }>
                    <TouchableOpacity style = { s.button } onPress = { handleSubmit }>
                        <Text style = { s.textbutton }>Créer mon profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { s.button } onPress = {_=>navigation.navigate('Login')}>
                        <Text style = { s.textbutton }>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default NewProfile