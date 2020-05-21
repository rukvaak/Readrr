import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons,MaterialIcons,FontAwesome5} from 'react-native-vector-icons';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen   from './logincomponent';
import SigninScreen from './signincomponent';
import SignupScreen from './signupcomponent';
import LanguageScreen from './langcomponent';
import CategoriesScreen from './category';
import SettingScreen from './settings';
const Tab = createMaterialBottomTabNavigator();
const MaintabScreen = () =>(
        <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Screns"
          activeColor="black"
          style={{ backgroundColor: 'green' }}
        >
          <Tab.Screen
            name="Home"
            component={LoginScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="pentagon-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Feed"
            component={SigninScreen}
            options={{
              tabBarLabel: 'Feed',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="menu" color={color} size={26} />
              ),
            }}
          />
                             <Tab.Screen
            name="write"
            component={CategoriesScreen}
            options={{
              tabBarLabel: 'write',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="pen-nib" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="library"
            component={SignupScreen}
            options={{
              tabBarLabel: 'library',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="library" color={color} size={26} />
              ),
            }}
          />
                             <Tab.Screen
            name="chat"
            component={LanguageScreen}
            options={{
              tabBarLabel: 'chat',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="chat" color={color} size={26} />
              ),
            }}
          />
         <Tab.Screen
            name="profiles"
            component={SettingScreen}
            options={{
              tabBarLabel: 'Profiles',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
          />


        </Tab.Navigator>
        </NavigationContainer>
      );

export default MaintabScreen;