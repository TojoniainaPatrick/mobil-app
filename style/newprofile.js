import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between'
    },
    title: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 20
    },
    titleText: {
        color: '#fff',
        fontSize: 50,
        fontWeight: '700'
    },
    form: {
        flex: 2,
        marginHorizontal:20
    },
    input: {
        backgroundColor: '#fff',
        height: 58,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: '#5D2DFF',
        color: '#5D2DFF',
        borderWidth: .5,
        padding: 15,
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: '#fff',
        marginTop: -5,
        color: '#5D2DFF',
        zIndex: 100,
        width: '100%'
        
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    button: {
        height: 55,
        backgroundColor: 'rgba(57, 95, 254, .9)',
        flex: .45,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
    ,textbutton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})