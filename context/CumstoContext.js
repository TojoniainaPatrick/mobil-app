import { useState, createContext, useEffect } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { database, auth } from '../firebase/firebaseConfig'

const CustomeContext = createContext({})

 export const CustomeContextProvider = ({ children }) =>{

    const [ currentProfile, setCurrentProfile ] = useState({})
    const [ profiles, setProfiles ] = useState([])
    const [ isShowToast, setIsshowToast ] = useState(true)
    const [ toastMessage, setToastMessage ] = useState('')
    const [ nombreRdv, setNombreRdv ] = useState(0)
    const [ nombreNotif, setNombreNotif ] = useState(0)

    return(
        <CustomeContext.Provider
            value = {{
                currentProfile,
                setCurrentProfile,
                profiles,
                setProfiles,
                isShowToast, 
                setIsshowToast,
                toastMessage, 
                setToastMessage,
                nombreRdv, 
                setNombreRdv,
                nombreNotif, 
                setNombreNotif
        }}>

            { children }

        </CustomeContext.Provider>
    )
}

export default CustomeContext