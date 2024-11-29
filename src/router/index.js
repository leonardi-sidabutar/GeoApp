import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Splash from '../screens/splash'
import Map from '../screens/maps'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = ()=>{
    return(
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    )
}

export default function Router() {
  return (
      <Stack.Navigator initialRouteName='TabNav'>
        <Stack.Screen name='TabNav' component={TabNav} options={{headerShown:false}}/>
      </Stack.Navigator>
  )
}