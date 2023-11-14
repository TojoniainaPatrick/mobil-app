import React, { useState, useEffect } from "react";
import { Button, View, Alert, ImageBackground, Text, TouchableOpacity, TextInput } from "react-native";
import { collection, query, where, getDocs, doc, setDoc, onSnapshot, addDoc } from "firebase/firestore"
import { database, auth } from "../firebase/firebaseConfig"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { SelectList } from 'react-native-dropdown-select-list'
import { s } from '../style/newappointment'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';

const fond_newappointment = require('../assets/fond/1fond.jpg')
// #112051

function NewAppointment({ navigation }){

    const [ appointment, setAppointment ] = useState({
        idRecepteur: '',
        idEmetteur: auth.currentUser.uid,
        statut: 'new',
        reponse: null,
        dateRDV: 'Clickez ici pour fixer la date ...',
        dateENV: new Date(),
        heureRDV: 'Clickez ici pour fixer l\'heure ...',
        objet: ''
    })

    const [ notification, setNotification ] = useState({
        idRecepteur: '',
        idEmetteur: auth.currentUser.uid,
        objet: 'Demande de rendez-vous',
        contenu: 'Vous avez reçu une nouvelle demande de rendez-vous',
        date: new Date(),
        statut: 'new'
    })

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [ directeurs, setDirecteurs ] = useState([])

    const toggleDatePickerVisibility = _=>setDatePickerVisibility(!isDatePickerVisible)
    const toggleTimePickerVisibility = _=>setTimePickerVisibility(!isTimePickerVisible)

    
    useEffect(()=>
    {
        const q = query(collection(database, "profile"), where("fonction", "==", "Directeur"));

        const unsubscribe = onSnapshot(q, (querySnapshot) =>
        {
            let directeurs_temp = []
            querySnapshot.forEach((doc) =>
            {
                directeurs_temp.push({key: doc.data().idUser, value: doc.data().nom})
            })
            setDirecteurs(directeurs_temp)
        })

        return ()=>unsubscribe()
    },[])
    
  
    const handleConfirmDate = (date) =>
    {
        //   const dt = new Date(date)
        //   const x = dt.toISOString().split("T")
        //   const x1 = x[0].split("-")
        //   const dt1 =`${x1[2]}/${x1[1]}/${x1[0]}`

        const date_tab = new Intl.DateTimeFormat('fr-FR', {dateStyle: 'full'}).format(date).toString().split(" ")
        setAppointment({...appointment, dateRDV: `${date_tab[0]} ${date_tab[1]} ${date_tab[2]} ${date_tab[3]}`})
        
        toggleDatePickerVisibility();
    }
  
    const handleConfirmTime = (date) =>
    {
        //   console.warn("A Time has been picked: ", date);
        const heure_tab = new Date(date).toTimeString().split(" ")[0].split(":")
        setAppointment({ ...appointment, heureRDV: `${heure_tab[0]} Heure ${heure_tab[1]}`})
        toggleTimePickerVisibility();
    }

    const handleSubmit = _=>{
        if (appointment.idRecepteur === '')
        {
            Alert.alert("Nouvelle demande", "Veuillez selectionner le destinataire!")
        }
        else if(appointment.objet.toString().trim() === '')
        {
            Alert.alert("Nouvelle demande", "Veuillez indiquer l'objet de la demande")
        }
        else if(appointment.dateRDV === 'Clickez ici pour fixer la date ...' || appointment.heureRDV === 'Clickez ici pour fixer l\'heure ...')
        {
            Alert.alert("Nouvelle demande", "Veuillez fixer une date et une heure")
        }
        else
        {
            const aptRef = collection(database, "appointment")
            const ntfRef = collection(database, "notification")
            addDoc(aptRef,
            {
                idRecepteur: appointment.idRecepteur,
                idEmetteur: appointment.idEmetteur,
                statut: appointment.statut,
                reponse: appointment.reponse,
                dateRDV: appointment.dateRDV,
                dateENV: appointment.dateENV,
                heureRDV: appointment.heureRDV,
                objet: appointment.objet
            })
            .then( _=>{
                addDoc(ntfRef,
                    {
                        idRecepteur: notification.idRecepteur,
                        idEmetteur: notification.idEmetteur,
                        objet: notification.objet,
                        contenu: notification.contenu,
                        date: notification.date,
                        statut: notification.statut
                })
            })
            .then( _=>navigation.navigate('Appointment'))
            .catch(error => console.error(error))
        }
    }
  
    return (
      <ImageBackground source = { fond_newappointment } style = { s.container }>
          <View style = { s.title }>
              <Text style = { s.titletext }>
                  Nouvelle demande
              </Text>
          </View>
          <View style = { s.form }>
                < SelectList
                    placeholder = "Directeur ..."
                    save = 'key'
                    notFoundText ="aucun resultat"
                    boxStyles = { s.boxStyle }
                    inputStyles = { s.boxInput }
                    dropdownStyles = { s.boxdropdown }
                    dropdownTextStyles = { s.dropdownitem}
                    data = { directeurs }
                    setSelected = { val => {
                        setAppointment({...appointment, idRecepteur: val})
                        setNotification({...notification, idRecepteur: val})
                    }}
                />

                <TextInput
                    autoCapitalize = "none"
                    placeholder = "Objet du rendez-vous ..."
                    inputMode = "text"
                    keyboardType = "default"
                    autoCorrect = { false }
                    style = { s.input }
                    onChangeText = { text => setAppointment({...appointment, objet: text})}
                />

                <TouchableOpacity 
                    style = { s.datetimecontainer } 
                    onPress={toggleDatePickerVisibility}
                >
                    <Text style = { s.datetime }>{ appointment.dateRDV }</Text>
                    <FontAwesome name="calendar" size={24} color="white" />
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={toggleDatePickerVisibility}
                />
                <TouchableOpacity
                    style = { s.datetimecontainer }
                    onPress={toggleTimePickerVisibility}
                >
                    <Text  style = { s.datetime}>{ appointment.heureRDV }</Text>
                    <Ionicons name="time-outline" size={24} color="white" />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmTime}
                    onCancel={toggleTimePickerVisibility}
                />
          </View>
          <View style = { s.buttonsection }>
              <TouchableOpacity style = { s.button } onPress = { handleSubmit }>
                  <Text style = { s.buttontext }>Envoyer</Text>
              </TouchableOpacity>
              <TouchableOpacity style = { s.button } onPress = { _=>navigation.navigate('Appointment')}>
                  <Text style = { s.buttontext }>Annuler</Text>
              </TouchableOpacity>
          </View>
      </ImageBackground>
    );
  };

export default NewAppointment