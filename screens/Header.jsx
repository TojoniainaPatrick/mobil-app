import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useCustomeContext from '../context/useCustomeContext'

function Header({ navigation }) {

    
    const {
        nombreRdv, 
        nombreNotif 
    } =  useCustomeContext()

    const naviger = useNavigation()

    return(
        <View style = { style.header }>
            <TouchableOpacity style = { style.menuItem } onPress = { ()=>{ naviger.navigate("Home") }}>
                <Ionicons name="md-home-outline" size={27} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style = { style.menuItem } onPress = { ()=>{ naviger.navigate("Appointment") }}>
                <AntDesign name="calendar" size={ 27 } color = "#fff" />
                {nombreRdv !== 0 && <View style = { style.nb }><Text style = { style.txtnb }>{nombreRdv}</Text></View>}
            </TouchableOpacity>
            <TouchableOpacity style = { style.menuItem } onPress = { ()=>{ naviger.navigate("Notification") }}>
                <Ionicons name="notifications-outline" size={ 27 } color = "#fff" />
                {nombreNotif !== 0 && <View style = { style.nb }><Text style = { style.txtnb }>{nombreNotif}</Text></View>}
            </TouchableOpacity>
            <TouchableOpacity style = { style.menuItem } onPress = { ()=>{ naviger.navigate("Profile") }}>
                <FontAwesome5 name="user-circle" size={ 27 } color = "#fff" />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'rgba(57, 95, 254, .9)',
        height: 55
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        transform: [{ translateX: 12 }]
    },
    txtnb: {
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default Header