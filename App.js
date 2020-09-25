import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';


import HomeScreen from './src/Screens/HomeScreen';
import PendingScreen from './src/Screens/Pending';
import CompletedScreen from './src/Screens/Completed';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Tasks') {
              iconName = focused
                ? 'checkmark-circle'
                : 'checkmark-circle';
            } else if (route.name === 'Pending') {
              iconName = focused ? 'pending' : 'pending';
            } else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            }

            if (route.name === 'Tasks') {
              return(
                <Ionicons name={iconName} size={size} color={color} />
              )
            } else if(route.name=='Pending'){
              return(
                <MaterialIcons name={iconName} size={size} color={color} />
              )
            } else if(route.name=='Home'){
              return(
                <Entypo name={iconName} size={size} color={color} />
              )
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'rgb(64, 63, 61)',
          inactiveTintColor: 'gray',
        }}
        initialRouteName='Home'
      >
        <Tab.Screen name="Tasks" component={CompletedScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pending" component={PendingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



