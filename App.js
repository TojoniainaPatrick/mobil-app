import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CustomContextProvider } from './context/CumstoContext'

import Login from './screens/Login'
import SignUp from './screens/SignUp'
import NewProfile from './screens/NewProfile'

import NewAppointment from './screens/NewAppointment'
import Home from './screens/Home'
import ListAppointment from './screens/ListAppointment'
import AppointmentValidation from './screens/AppointmentValidation'
import Notifications from './screens/Notifications'
import NotificationDetail from './screens/NotificationDetail'
import Profile from './screens/Profile'
import { CustomeContextProvider } from './context/CumstoContext'

const Stack = createNativeStackNavigator();

function AccountStack() {
  return(
    <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false }}>
      <Stack.Screen name = "Home" component = { Home } />
      <Stack.Screen name = "Login" component = { Login } />
      <Stack.Screen name = "Signup" component = { SignUp }/>
      <Stack.Screen name = "Newprofile" component = { NewProfile } />
      <Stack.Screen name = "Profile" component = { Profile } />
      <Stack.Screen name = "Newappointment" component = { NewAppointment } />
      <Stack.Screen name = "Appointment" component = { ListAppointment}  options = {{Animation: 'fade'}}/>
      <Stack.Screen name = "Validation" component = { AppointmentValidation} />
      <Stack.Screen name = "Notification" component = { Notifications } />
      <Stack.Screen name = "Notificationdetail" component = { NotificationDetail } />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <CustomeContextProvider>
      <NavigationContainer>
        <AccountStack />
      </NavigationContainer>
      <StatusBar hidden></StatusBar>
    </CustomeContextProvider>
  )
}
