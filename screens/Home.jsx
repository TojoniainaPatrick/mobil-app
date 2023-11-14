import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useEffect } from 'react'
import { collection, query, where, getCountFromServer, and, or } from "firebase/firestore"
import { auth, database } from '../firebase/firebaseConfig'
import useCustomeContext from '../context/useCustomeContext'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const homeLogo = require('../assets/image/home2.png')


function Home({ navigation }){

        const {
        nombreRdv, 
        nombreNotif,
        setNombreRdv,
        setNombreNotif
    } =  useCustomeContext()

    useEffect(()=>{
        const appointmentCollectionRef = collection( database, "appointment" )
        const notificationCollectionRef = collection( database, "notification" )

        const getRDVCount = async _=>{
            const requeteAppointment = query(appointmentCollectionRef,
                and(where("statut", "==", "new"),
                or(where("idEmetteur", "==", auth.currentUser.uid), where("idRecepteur", "==", auth.currentUser.uid))))
            const snapshot = await getCountFromServer(requeteAppointment);
            setNombreRdv(snapshot.data().count)
        }

        const getNotifCount = async _=>{
            const requeteNotification = query(notificationCollectionRef,where("statut", "==", "new"),where("idRecepteur", "==", auth.currentUser.uid))
            const snapshot = await getCountFromServer(requeteNotification);
            setNombreNotif(snapshot.data().count)
        }

        getRDVCount()
        getNotifCount()
    }, [])

    return(
        <View style = { style.page }>
            <View style = { style.header }>
                <Image source = { homeLogo } style = { style.logoHome }/>
                <Text style = {{color: 'rgba(250, 250, 250, .8)', fontSize: 35, fontWeight: '900', position: 'absolute', top: 5}}>Accueil</Text>
            </View>
            <View style = { style.body }>
                <View style = { style.cardContainer }>
                    <TouchableOpacity style = { style.card } onPress = { _=>navigation.navigate("Appointment")}>
                        {nombreRdv !== 0 && <View style = { style.nb }><Text style = { style.txtnb }>{nombreRdv}</Text></View>}
                        <AntDesign name="calendar" size={40} color = "gray" />
                        <Text style = { style.subtitle }>Rendez-vous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { style.card } onPress = { _=>navigation.navigate("Notification")}>
                        <Ionicons name="notifications-outline" size={40} color = "gray" />
                        {nombreNotif !== 0 && <View style = { style.nb }><Text style = { style.txtnb }>{nombreNotif}</Text></View>}
                        <Text style = { style.subtitle }>Notifications</Text>
                    </TouchableOpacity>
                </View>
                <View style = { style.cardContainer }>
                    <TouchableOpacity style = { style.card } onPress = { _=>navigation.navigate("Profile")}>
                        <FontAwesome5 name="user-circle" size={40} color = "gray" />
                        <Text style = { style.subtitle }>Profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { style.card } onPress = { _=>navigation.navigate("Login")}>
                        <MaterialCommunityIcons name="logout" size={40} color = "gray" />
                        <Text style = { style.subtitle }>Déconnection</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    page: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 300,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        backgroundColor: 'rgba(57, 95, 254, .9)'
    },
    logoHome: {
        width: 180,
        height: 180,
        marginBottom: 10
    },
    body: {
        flex: 1,
        width: '100%',
        height: '65%',
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        backgroundColor: '#fff'
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12
    },
    card: {
        width: 120, 
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f7f9'
    },
    subtitle: {
        fontWeight: 'bold',
        color: 'gray'
    },
    nb: {
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 8,
        transform: [{ translateY: 15 }, { translateX: 15 }],
        zIndex: 10
    },
    txtnb: {
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default Home