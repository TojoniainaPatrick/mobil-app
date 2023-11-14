import { useState, useEffect } from 'react'
import { auth, database} from '../firebase/firebaseConfig'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import  useCustomeContext from '../context/useCustomeContext'
import Header from './Header'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


function Notifications({ navigation }){

    const {
        currentProfile,
        profiles,
        setNombreNotif
    } = useCustomeContext({})

    const [notifications, setNotifications ] = useState([])
    
    // recuperer la liste des notifications
    const requete = query(collection(database, "notification"), orderBy("date", "desc"))
    useEffect(()=>{
        const unsubscribe = onSnapshot(
            requete, 
            (snapshot) => {
                let liste_temp = []
                snapshot.docs.map(item => {liste_temp.push({
                    idnotification: item.id,
                    contenu: item.data().contenu,
                    date: item.data().date,
                    idEmetteur: item.data().idEmetteur,
                    idRecepteur: item.data().idRecepteur,
                    objet: item.data().objet,
                    statut: item.data().statut
                })})
                setNotifications(liste_temp)
                if(auth.currentUser.uid)
                {
                    setNombreNotif(liste_temp.filter(item => (item.statut.toString().toLowerCase() === "new" && item.idRecepteur === auth.currentUser.uid)).length)
                }
            },
            (error) => {
                setNotifications([])
                console.log(error)
            })
            
            return ()=>unsubscribe()
        })
        
    // recuperer le profil d' utilisateur
    const getProfile = ( id, list) =>{
        return list.filter( item => item.idUser === id )[0]
    }


    // mise à jour du statut de la notification
    const handleViewNotification = (item) =>{
        // const notificationRef = doc(database, `notification/${item.idnotification}`)
        // updateDoc(notificationRef,{ statut: 'vu' })
        // .then(_=>navigation.navigate('Notificationdetail', item))
        navigation.navigate('Notificationdetail', item)
    }

    function NotificationItem({ item }){

        const { objet, idEmetteur, date, statut, idnotification } = item
        const date_temp = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full'}).format(new Date(date.toDate().toString())).split(" ")
        const date_notification = `${date_temp[0]} ${date_temp[1]} ${date_temp[2]} ${date_temp[3]} ${date_temp[4]} `
        const fonction_emetteur = getProfile(idEmetteur, profiles).fonction.toString().toLowerCase()
        const nom_emetteur = getProfile(idEmetteur, profiles ).nom
        const fonction_courrant = currentProfile.nom

        const deleteItem = _=>{
            deleteDoc(doc(database, `notification/${idnotification}`))
        }

        return(
            <TouchableOpacity style= { statut === 'new' ? style.newItem : style.oldItem } onPress = { () => handleViewNotification(item) }>
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
                        <Text style = {{ marginLeft: 5, fontStyle: 'italic', fontSize: 13}}>
                            { fonction_emetteur === 'directeur' ? "De Directeur :" : 'De ' }
                        </Text>
                        <Text style = {{ marginLeft: 5}}>
                            { nom_emetteur }
                        </Text>
                    </View>
                    <View style = {style.dateContainer}>
                        <Text style = { style.date_text }>{ date_notification }</Text>
                        <Fontisto name="date" size={15} color="gray" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style = { style.page }>
            <Header />
            <Text style = {{ padding: 5, marginHorizontal: 10, fontSize: 16, fontStyle: 'italic', color: 'gray'}}>Notifications</Text>
            <View style = { style.list }>
                <FlatList
                    data = { 
                        notifications.filter(notification => notification.idRecepteur === auth.currentUser.uid)
                    }
                    renderItem={({item}) => <NotificationItem item = {item}/>}
                />
            </View>
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
        width: 70,
        height: 70,
        bottom: 35,
        right: 35,
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

export default Notifications