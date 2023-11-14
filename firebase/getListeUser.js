import { database } from './firebaseConfig'
import { collection, onSnapshot, where, query } from "firebase/firestore"

export function getListeUser(){

    let liste_temp = []
    const unsubscribe = onSnapshot
    (
        collection(database, "profile"), 
        (snapshot) =>
        {
            snapshot.docs.map(item => liste_temp.push(item.data()))
        },
        (error) =>
        {
            liste_temp = []
            console.log(error)
        }
    )

    return liste_temp
}


export function getEmail (id){
    let users = [];
    const q = query(collection(database, "profile"), where("idUser", "==", id))
    onSnapshot(q, (querySnapshot) =>
    {
        querySnapshot.forEach((doc) => {
            users.push(doc.data().email);
        })
    })
    return users[0]
}
