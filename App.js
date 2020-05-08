import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen   from './components/logincomponent';
import SigninScreen from './components/signincomponent';
import FormExample from './components/signincomponent';
import SignupScreen from './components/signupcomponent';
import LanguageScreen from './components/langcomponent';
const navigator = createStackNavigator(
  {
   Login:LoginScreen,
   Signin:SigninScreen,
   Signup:SignupScreen,
   Language:LanguageScreen
  },
  {
    initialRouteName: 'Language',
  }
);

const AppContainer = createAppContainer(navigator);
export default AppContainer;
