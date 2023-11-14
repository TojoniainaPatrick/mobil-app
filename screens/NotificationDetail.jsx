import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native"
import { database } from '../firebase/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import  useCustomeContext from '../context/useCustomeContext'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'

const fond_apt = require('../assets/fond/1fond.jpg')




function NotificationDetail({ navigation }){

    const {
        currentProfile,
        profiles
    } = useCustomeContext({})

    const { params } = useRoute()

    const date_temp = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full'}).format(new Date(params.date.toDate().toString())).split(" ")
    const date_notification = `${date_temp[0]} ${date_temp[1]} ${date_temp[2]} ${date_temp[3]} ${date_temp[4]} `

    useEffect(()=>{
        const statutVerification = _=>{
            if(params.statut.toString().toLowerCase() === 'new'){
                const notificationRef = doc(database, `notification/${params.idnotification}`)
                updateDoc(notificationRef,{ statut: 'vu' })
            }
        }

        statutVerification()
    },[])

    // recuperer le profil d' utilisateur
    const getProfile = ( id, list) =>{
        return list.filter( item => item.idUser === id )[0]
    }

    const fonction_emetteur = getProfile(params.idEmetteur, profiles).fonction.toString().toLowerCase()
    const nom_emetteur = getProfile(params.idEmetteur, profiles ).nom

    return(
        <ImageBackground source = { fond_apt } style = { style.page }>
            <View style = { style.header }>

                <TouchableOpacity onPress = { ()=>navigation.navigate('Notification')}>
                    <Ionicons name="chevron-back-sharp" size={30} color="white" />
                </TouchableOpacity>

                <Text style = { style.headerText }>Notification</Text>

            </View>

            <View style = { style.body }>
                <View style = { style.notification }>
                    <View style = { style.infoContainer }>
                        <Entypo name="light-bulb" size={20} color="rgba(57, 95, 254, .6)" />
                        <Text style = { style.key }>Objet :</Text>
                        <Text style = { style.value }> { params.objet }</Text>
                    </View>

                    <View style = { style.infoContainer }>
                        <MaterialCommunityIcons name="email-send-outline" size={20} color="rgba(57, 95, 254, .6)" />
                        <Text style = { style.key }>
                            { fonction_emetteur === 'directeur' ? "Directeur : " : 'De : ' }
                        </Text> 
                        <Text style = { style.value }>
                            { nom_emetteur }
                        </Text> 
                    </View>

                    <View style = { style.contenu }>
                        <Text style = { style.contenuText }>{ params.contenu } </Text> 
                    </View>

                    <View style = { style.dateContainer }>
                        <Text style = { style.dateStyle }> { date_notification } </Text>
                        <Fontisto name="date" size={20} color="gray" />
                    </View>

                </View>
                <View  style = { style.buttonSection }>
                    <TouchableOpacity style = { style.bouton } onPress = { ()=> navigation.navigate('Appointment')}>
                        <Text style = { style.textbtn }>Voir la liste des demandes</Text>
                    </TouchableOpacity>
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
    notification: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingRight: 15,
        padding: 5,
        paddingLeft: 15,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 2
    },
    contenu: {
        padding: 15
    },
    contenuText: {
        fontStyle: 'italic',
        color: 'rgb(44, 53, 62)'
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    key: {
        width: '25%',
        paddingLeft: 10,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'rgba(57, 95, 254, .6)'
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
        padding:5
    },
    dateStyle: {
        fontStyle: 'italic',
        fontSize: 13,
        color: 'gray'
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    bouton: {
        flex: .9,
        height: 50,
        borderRadius: 15,
        backgroundColor: 'rgba(250, 250, 250, .85)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbtn: {
        color: '#fff',
        color: 'rgba(57, 95, 254, .7)',
        fontSize: 17,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 14,
        color: 'gray',
        paddingLeft: 5
    }
})

export default NotificationDetail