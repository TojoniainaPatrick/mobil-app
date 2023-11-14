import { View, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native'
import useCustomeContext from '../context/useCustomeContext'
import { auth } from '../firebase/firebaseConfig'
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const profile_img = require('../assets/fond/1fond.jpg')

function Profile ({ navigation }){

    const {
        currentProfile
    } = useCustomeContext()

    return (
        <View style = { style.page }>
            <ImageBackground source = {profile_img} style = { style.backimage } >
                <View>
                    <FontAwesome name="user-circle-o" size={90} color="#fff" />
                </View>
            </ImageBackground>
            <View style = { style.info }>
                <View style = { style.infoContainer }>
                    <SimpleLineIcons name="user" size={24} color="rgba(57, 95, 254, .6)" />
                    <Text style = { style.infoText1 }> Nom :</Text>
                    <Text style = { style.infoText }> { currentProfile.nom } </Text>
                </View>
                <View style = { style.infoContainer }>
                    <MaterialIcons name="work-outline" size={24} color="rgba(57, 95, 254, .6)" />
                    <Text style = { style.infoText1 }> Fonction :</Text>
                    <Text style = { style.infoText }> { currentProfile.fonction } </Text>
                </View>
                <View style = { style.infoContainer }>
                    <MaterialCommunityIcons name="email-edit-outline" size={24} color="rgba(57, 95, 254, .6)" />
                    <Text style = { style.infoText1 }> Email :</Text>
                    <Text style = { style.infoText }> { auth.currentUser.email } </Text>
                </View>
                <View style = { style.infoContainer }>
                    <MaterialIcons name="phone-android" size={24} color="rgba(57, 95, 254, .6)" />
                    <Text style = { style.infoText1 }> Tel :</Text>
                    <Text style = { style.infoText }> { currentProfile.telephone } </Text>
                </View>
                <View style = { style.boutonSection }>
                    <TouchableOpacity style = { style.bouton } onPress = { () => navigation.navigate('Home')}>
                        <Text style = { style.text }>Accueil</Text>
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
    backimage: {
        width: '100%',
        height: 350,
        position: 'absolute',
        top: 0,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        width: '100%',
        height: '65%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        borderBottomWidth: 1.5,
        paddingBottom: 5,
        borderBottomColor: 'gray'
    },
    infoText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '55%',
        fontSize: 16
    },
    infoText1: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '30%',
        fontSize: 18,
         fontStyle: 'italic',
         color: 'gray'
    },
    boutonSection: {
         marginTop: 30,
         justifyContent: 'center',
         alignItems: 'center'
    },
    bouton: {
        backgroundColor: 'rgba(57, 95, 254, .9)',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default Profile