import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import useCustomeContext from '../context/useCustomeContext'
import { auth, database } from '../firebase/firebaseConfig'
import { doc, onSnapshot, collection, query, where, Timestamp } from "firebase/firestore"

function Toast(){

    const {
        isShowToast, 
        setIsshowToast,
        toastMessage, 
        setToastMessage,
        nombreRdv, 
        setNombreRdv,
        nombreNotif, 
        setNombreNotif
    } =  useCustomeContext()

    const autoclose = _=>{
            setTimeout(()=>{setIsshowToast(false)}, 3000)
    }

    // appointment listener
    useEffect(()=>{
        const requete = query(collection(database, "appointment"), where("statut", "==", 'new'))
        const unsubscribe = onSnapshot(requete, 
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
                if(auth.currentUser.uid)
                {
                    setNombreRdv(liste_temp.filter(item => (item.idRecepteur === auth.currentUser.uid) || ((item.idEmetteur=== auth.currentUser.uid))).length)
                }
            },
            (error) => {
                console.log(error)
        })

        return ()=>unsubscribe()
    }, [])

    // notification listener
    useEffect(()=>{
        const requete = query(collection(database, "notification"), where("statut", "==", 'new'))
        const unsubscribe = onSnapshot(requete, 
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
                if(auth.currentUser.uid)
                {
                    setNombreNotif(liste_temp.filter(item => item.idRecepteur === auth.currentUser.uid).length)
                }
            },
            (error) => {
                console.log(error)
        })

        return ()=>unsubscribe()
    }, [])

    autoclose()

    return(
        <View style = { isShowToast ? style.toastContainerShown : style.toastContainerHidden }>
            <Text>{ toastMessage }</Text>
        </View>
    )
}

const style = StyleSheet.create({
    toastContainerShown: {
        backgroundColor: 'transparent',
        color: 'transparent',
        position: 'absolute',
        width: 4, 
        height: 4
    },
    toastContainerHidden: {
        backgroundColor: 'transparent',
        color: 'transparent',
        position: 'absolute',
        width: 4, 
        height: 4
    }
})

export default Toast
