import { useState, useEffect,useLayoutEffect } from 'react'
import { View, TouchableOpacity, FlatList, Text, Pressable, StyleSheet } from 'react-native'
import { doc, onSnapshot, collection, query, where, orderBy, deleteDoc } from "firebase/firestore"
import { auth, database } from '../firebase/firebaseConfig'
import useCustomeContext from '../context/useCustomeContext'
import Header from './Header'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

function ListAppointment({ navigation }){

    const {
        currentProfile,
        profiles,
        setNombreRdv
    } = useCustomeContext()

    const [ appointments, setAppointments ] = useState([])
    const currentProfile_fonction = currentProfile.fonction.toString().toLowerCase()
    
    // recuperer la liste des demandes de rendez-vous
    const requete = query(collection(database, "appointment"), orderBy("dateENV", "desc"))
    useEffect(()=>{
        const unsubscribe = onSnapshot(
            requete, 
            (snapshot) => {
                let liste_temp = []
                snapshot.docs.map(item => {liste_temp.push({
                    idAppointment: item.id,
                    dateENV: item.data().dateENV,
                    dateRDV: item.data().dateRDV,
                    heureRDV: item.data().heureRDV,
                    idEmetteur: item.data().idEmetteur,
                    idRecepteur: item.data().idRecepteur,
                    objet: item.data().objet,
                    reponse: item.data().reponse,
                    statut: item.data().statut,
                })})
                setAppointments(liste_temp)
                if(auth.currentUser.uid)
                {
                    setNombreRdv(liste_temp.filter(item => (item.statut.toString().toLowerCase() === "new" && (item.idRecepteur === auth.currentUser.uid || item.idEmetteur=== auth.currentUser.uid))).length)
                }
            },
            (error) => {
                setAppointments([])
                console.log(error)
        })

        return ()=>unsubscribe()
    }, [])

    const getProfile = ( id, list) =>{
        return list.filter( item => item.idUser === id )[0]
    }

    function AppointmentItem({ item }){

        const { 
            idEmetteur,
            idRecepteur,
            objet,
            dateENV,
            statut
        } = item

        const nom_emetteur = getProfile(idEmetteur, profiles).nom
        const nom_recepteur = getProfile(idRecepteur, profiles).nom
        const fonction_courrant = getProfile(auth.currentUser.uid, profiles).fonction.toString().toLowerCase()
        const date_temp = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full'}).format(new Date(dateENV.toDate().toString())).split(" ")

        const deleteItem = _=>{
            deleteDoc(doc(database, `appointment/${item.idAppointment}`))
        }

        return(
            <TouchableOpacity style= { statut === 'new' ? style.newItem : style.oldItem } onPress = { ()=>navigation.navigate('Validation', item)}>
                <View style = { style.itemHeader }>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo name="light-bulb" size={15} color="gray" />
                        <Text style = { style.objet}> { objet } </Text>
                    </View>
                    <TouchableOpacity onPress = { deleteItem }><MaterialIcons name="delete" size={18} color="rgba(240, 100, 100, .8)" /></TouchableOpacity>
                </View>
                <View>
                    <View style = { style.recepteur }>
                        <MaterialIcons name="work-outline" size={15} color="gray" />
                        {
                            fonction_courrant === 'directeur' ?
                            <Text style = {{ marginLeft: 5}}>Emetteur : { nom_emetteur }</Text>
                            :
                            <Text style = {{ marginLeft: 5}}>À : Directeur { nom_recepteur }</Text>
                        }
                    </View>
                    <View style = {style.dateContainer}>
                        <Text style = { style.date_text }>{ `${date_temp[0]} ${date_temp[1]} ${date_temp[2]} ${date_temp[3]} ${date_temp[4]} `}</Text>
                        <Fontisto name="date" size={15} color="gray" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style = { style.page }>
            <Header />
            <Text style = {{ padding: 5, marginHorizontal: 10, fontSize: 16, color: 'gray', fontStyle: 'italic'}}>Rendez-vous</Text>
            <View style = { style.list }>
                <FlatList 
                    data = { 
                    currentProfile_fonction === 'directeur'
                            ? appointments.filter(appointment => appointment.idRecepteur === auth.currentUser.uid)
                            : appointments.filter(appointment => appointment.idEmetteur === auth.currentUser.uid)
                    } 
                    renderItem={({item}) => <AppointmentItem item = {item}/>}
                />
            </View>
            {
                (currentProfile_fonction !== 'directeur') && 
                <Pressable style = { style.addButton} onPress = { _=>navigation.navigate('Newappointment')}>
                    <AntDesign name="plus" size={40} color="#fff" />
                </Pressable>
            }
        </View>
    )
}

const style = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f6f7f9'
    },
    addButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        bottom: 30,
        right: 30,
        borderRadius: 35,
        backgroundColor: 'rgba(57, 95, 254, .9)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        marginTop: 5,
        marginHorizontal: 6
    },
    newItem: {
        marginVertical: 2,
        borderRadius: 5,
        backgroundColor: 'rgba(57, 95, 254, .4)',
        // backgroundColor: 'rgba(210, 0, 0, .2)',
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 5,
        paddingLeft: 15
    },
    oldItem: {
        marginVertical: 1,
        borderRadius: 5,
        backgroundColor: 'rgba(57, 95, 254, .1)',
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 5,
        paddingLeft: 15
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8
    },
    date_text: {
        fontStyle: 'italic',
        color: 'gray',
        fontSize: 12,
        marginRight: 5
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    objet: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ff9226'
    },
    objetNew: {
        color: 'rgba(250, 0, 0, .6)',
        fontSize: 10
    },
    recepteur: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default ListAppointment