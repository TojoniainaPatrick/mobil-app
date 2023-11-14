import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        flex: 1.1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginHorizontal: 20
    },
    titletext: {
        color: '#fff',
        fontSize: 50,
        fontWeight: "500"
    },
    form: {
        flex: 2.2,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    boxInput: {
        fontSize: 16,
        color: 'rgba(57, 95, 254, .85)',
        fontWeight: 'bold'
    },
    boxStyle: {
        height: 58,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .85)',
        marginVertical: 5
    },
    boxdropdown:{
        backgroundColor: 'rgba(255, 255, 255, .85)',
        marginTop: -2,
        maxHeight: 100
    },
    dropdownitem: {
        color: 'rgba(57, 95, 254, .9)',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
        height: 58,
        borderRadius: 15,
        color: 'rgba(57, 95, 254, .85)',
        marginVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
        padding: 15,
        borderWidth: .7,
        borderColor: 'rgba(57, 95, 254, .9)'
    },
    datetimecontainer: {
        height: 58,
        backgroundColor: 'rgba(57, 95, 254, .9)',
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: .7,
        borderColor: "#fff"
    },
    datetime: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonsection: {
        flex: .6,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'flex-start',
    },
    button: {
        flex: .4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(57, 95, 254, .85)',
        height: 50,
        borderRadius: 15
    },
    buttontext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})