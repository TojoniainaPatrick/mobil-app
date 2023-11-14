import { StyleSheet} from 'react-native'

export const s = StyleSheet.create({
    button: {
        backgroundColor: "rgba(57, 95, 254, .9)",
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    form: {
        flex: 1,
        width: '100%',
        height: '65%',
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 10
    },
    backImage: {
        width: '100%',
        height: 300,
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        resizeMode: 'cover',
        paddingTop: 35
    },
    input: {
        backgroundColor: "#F6F7F8",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12
    },
    notConfirm: {
        backgroundColor: "#F6F7F8",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        color:'red',
        borderWidth: 2,
        borderColor: 'red'
    },
    confirmOK: {
        backgroundColor: "#F6F7F8",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        color:'green',
        borderWidth: 2,
        borderColor: 'green'
    },
    title: {
        fontSize: 40,
        fontWeight: '900',
        color: "#fff",
        // position: 'absolute',
        alignSelf: 'center',
        paddingBottom: 24
    },
    title1: {
        fontSize: 45,
        fontWeight: 'bold',
        color: "rgba(57, 95, 254, .9)",
        // position: 'absolute',
        alignSelf: 'center',
        paddingBottom: 24
    },
    titleSignUp: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#2441cb",
        position: 'absolute',
        alignSelf: 'center',
        paddingBottom: 24
    },
    loginText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18
    },
    signUpLink: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textQuestion: {
        color: 'gray',
        fontWeight: '600',
        fontSize: 14
    },
    signUpText: {
        color: '#2441cb',
        fontWeight: '600',
        fontSize: 15
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: "flex-end"
    }
})