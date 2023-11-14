import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity, View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native'
import { query, collection, onSnapshot, where, doc, updateDoc, addDoc } from 'firebase/firestore'
import { database, auth } from '../firebase/firebaseConfig'
import useCustomeContext from '../context/useCustomeContext'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const fond_apt = require('../assets/fond/1fond.jpg')



function AppointmentValidation({ navigation }){
    
    const {
        currentProfile,
        profiles
    } = useCustomeContext()

    const { params } = useRoute()
    const appointmentRef = doc(database, `appointment/${params.idAppointment}`)
    const ntfRef = collection(database, "notification")

    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ response, setResponse ] = useState('')
    const [ surrentProfile, setCurrentProfile ] = useState({})
    const [ notification, setNotification ] = useState({
        idRecepteur: params.idEmetteur,
        idEmetteur: auth.currentUser.uid,
        objet: 'Validation de demande',
        contenu: '',
        date: new Date(),
        statut: 'new'
    })

    useEffect(()=>{
        const q = query(collection(database, "profile"), where("idUser", "==", params.idEmetteur))
        const unsubscribe = onSnapshot(q, (querySnapshot) =>
        {
            querySnapshot.forEach((doc) => {
                setUsername(doc.data().nom)
            })
        })

        return ()=>unsubscribe()
    },[])

    useEffect(()=>{
        const q = query(collection(database, "profile"), where("idUser", "==", params.idEmetteur))
        const unsubscribe = onSnapshot(q, (querySnapshot) =>
        {
            querySnapshot.forEach((doc) => {
                setEmail(doc.data().email)
            })
        })

        return ()=>unsubscribe()
    },[])
    
    useEffect(()=>{
        const q = query(collection(database, "profile"), where("idUser", "==", auth.currentUser.uid))
        const unsubscribe = onSnapshot(q, (querySnapshot) =>
        {
            querySnapshot.forEach((doc) => {
                setCurrentProfile(doc.data())
            })
        })

        return ()=>unsubscribe()
    },[])

    // recuperer le profil d'un utilisateur
    const getProfile = ( id, list) =>{
        return list.filter( item => item.idUser === id )[0]
    }

    const isUserDirecteur = currentProfile.fonction.toString().toLowerCase() ==='directeur'
    const isNewAppointment = params.statut.toString().toLowerCase() === 'new'
    const nom_emetteur = getProfile(params.idEmetteur, profiles).nom
    const nom_recepteur = getProfile(params.idRecepteur, profiles).nom
    const fonction_courrant = getProfile(auth.currentUser.uid, profiles).fonction.toString().toLowerCase()



    const handleAccept = async _=>
    {
        updateDoc(appointmentRef,
            {
                reponse: response,
                statut: 'accepted'
            }
        )
        .then(()=>{
            addDoc(ntfRef,
                {
                    idRecepteur: notification.idRecepteur,
                    idEmetteur: notification.idEmetteur,
                    objet: notification.objet,
                    contenu: `Votre demande a été acceptée.${response.trim() === ''? '' : '\nVeuillez consulter le message que le directeur vous a envoyé'}`,
                    date: notification.date,
                    statut: notification.statut
            })
        })
        .then(_=>navigation.navigate('Appointment'))
    }

    const handleRefuse = async _=>
    {
        updateDoc(appointmentRef,
            {
                reponse: response,
                statut: 'refused'
            }
        )
        .then(()=>{
            addDoc(ntfRef,
                {
                    idRecepteur: notification.idRecepteur,
                    idEmetteur: notification.idEmetteur,
                    objet: notification.objet,
                    contenu: `Votre demande a été refusée.${response.trim() === ''? '' : ' \nVeuillez consulter le message que le directeur vous a envoyé'}`,
                    date: notification.date,
                    statut: notification.statut
            })
        })
        .then(_=>navigation.navigate('Appointment'))
    }

    return(
        <ImageBackground source = { fond_apt } style = { style.page }>
            <View style = { style.header }>
                <TouchableOpacity onPress = { ()=>navigation.navigate('Appointment')}>
                    <Ionicons name="chevron-back-sharp" size={30} color="white" />
                </TouchableOpacity>
                <Text style = { style.headerText }>Rendez-vous</Text>
            </View>
            <View style = { style.body }>
                <View style = { style.infoContainer }>
                    <Octicons name="list-ordered" size={20} color="rgba(57, 95, 254, .6)" />
                    <Text style = { style.key }>Demande N° : </Text>
                    <Text style = { style.value }>{params.idAppointment} </Text>
                </View>
                <View style = { style.infoContainer }>
                    <Entypo name="light-bulb" size={20} color="rgba(57, 95, 254, .6)" />
                    <Text style = { style.key }>Objet : </Text>
                    <Text style = { style.value }>{ params.objet }</Text>
                </View>
                    {
                        fonction_courrant === 'directeur' ?
                        <View style = { style.infoContainer }>
                            <MaterialCommunityIcons name="email-send-outline" size={20} color="rgba(57, 95, 254, .6)" />
                            <Text style = { style.key }>Emetteur : </Text>
                            <Text style = { style.value }>{ nom_emetteur }</Text>
                        </View>
                        :
                        <View style = { style.infoContainer }>
                            <MaterialCommunityIcons name="email-receive-outline" size={20} color="rgba(57, 95, 254, .6)" />
                            <Text style = { style.key }>Recepteur : </Text>
                            <Text style = { style.value }>{ nom_recepteur }</Text>
                        </View>
                    }
                    <View style = { style.infoContainer }>
                        <Fontisto name="date" size={20} color="rgba(57, 95, 254, .6)" />
                        <Text style = { style.key }>Date: </Text>
                        <Text style = { style.value }>{ params.dateRDV }</Text>
                    </View>
                    <View style = { style.infoContainer }>
                        <Ionicons name="time-outline" size={20} color="rgba(57, 95, 254, .6)" />
                        <Text style = { style.key }>Heure: </Text>
                        <Text style = { style.value }>{ params.heureRDV }</Text>
                    </View>
                    { !params.reponse
                        ? null
                        :(params.reponse.toString().trim() !== "") 
                            && <View style = { style.infoContainer }>
                                <MaterialCommunityIcons name="backburger" size={20} color="rgba(57, 95, 254, .6)" />
                                <Text style = { style.key }>Reponse : </Text>
                                <Text style = { style.value }>{ params.reponse }</Text>
                            </View>
                    }
                    {
                        isUserDirecteur && isNewAppointment && 
                        <TextInput
                            autoCapitalize = "none"
                            placeholder = "Un message"
                            inputMode = "text"
                            keyboardType = "default"
                            style = { style.input }
                            autoCorrect = { false }
                            onChangeText = { text => setResponse(text) }
                        />
                    }
                <View style = { style.buttonSection }>
                    { isUserDirecteur && isNewAppointment && <TouchableOpacity style = { style.bouton } onPress = { handleAccept }>
                        <Text style = { style.textbtn }>Accepter</Text>
                    </TouchableOpacity>}
                    { isUserDirecteur && isNewAppointment && <TouchableOpacity style = { style.bouton } onPress = { handleRefuse }>
                        <Text style = { style.textbtn }>Refuser</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    page: {
        felx: 1,
        resizeMode: 'cover'
    },
    header: {
        height: 60,
        backgroundColor: 'rgba(57, 95, 254, .9)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: '5%'
    },
    body: {
        backgroundColor: 'transparent',
        height: '100%',
        marginTop: '20%',
        marginHorizontal: 20
    },
    infoContainer: {
        flexDirection: 'row',
        height: 58,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(57, 95, 254, .7)',
        alignItems: 'center',
        marginVertical: 3,
        padding: 10,
        backgroundColor: '#f6f7f7ff',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 20
    },
    key: {
        width: '30%',
        paddingLeft: 8,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'rgba(57, 95, 254, .6)'
    },
    input: {
        height: 58,
        backgroundColor: '#f6f9f9',
        marginVertical: 3,
        padding: 10,
        backgroundColor: '#f6f7f7dd',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 5
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    bouton: {
        flex: .4,
        height: 50,
        borderRadius: 15,
        backgroundColor: 'rgba(57, 95, 254, .6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbtn: {
        color: '#fff',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 13,
        color: 'gray',
        paddingHorizontal: 5,
        fontWeight: 'bold'
    }
})

export default AppointmentValidation;