import React, {Component}  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen   from './components/logincomponent';
import SigninScreen from './components/signincomponent';
import FormExample from './components/signincomponent';
import SignupScreen from './components/signupcomponent';
import LanguageScreen from './components/langcomponent';
import CategoriesPage from './components/categories';
import {createStore,applyMiddleware, compose}  from 'redux';
import   reducer    from './Services/Reducer/reducer'
import dataService from './Services/data-service'
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware(thunk));
import {Provider} from 'react-redux';
const navigator = createStackNavigator(
  {
   Login:LoginScreen,
   Signin:SigninScreen,
   Signup:SignupScreen,
   Language:LanguageScreen,
   Categories:CategoriesPage
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(navigator);

export default class App extends Component {
  render () {
    return (
        <Provider store={store}>
          <AppContainer/>
         
        </Provider>
    )
  }
}

