import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Map from '../screens/maps'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = ()=>{
    return(
      <Tab.Navigator
        screenOptions={({route})=>({
          tabBarIcon:({color, size})=>{
            let icon ;
            
            if(route.name === 'Home'){
              icon = 'home'
            }else if(route.name==='Map'){
              icon = 'map-marked-alt'
            }
            // Return Any component here !
            return <Icon name={icon} size={size} color={color}/>
          },
          tabBarActiveTintColor:'#379777',
          tabBarInactiveTintColor:'gray'
        })}
        >
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