import React, {Component}  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen   from './components/logincomponent';
import SigninScreen from './components/signincomponent';
import SignupScreen from './components/signupcomponent';
import LanguageScreen from './components/langcomponent';
import CategoriesPage from './components/categories';
import {createStore,applyMiddleware, compose}  from 'redux';
import   reducer    from './Services/Reducer/reducer'
import dataService from './Services/data-service'
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware(thunk));
import {Provider} from 'react-redux';
import blogpage from './components/common/blog';
import profilescreen from './components/common/profilepage';
import edition from './components/common/editprofile';
import followers from './components/common/followers';
import libraryscreen from './components/common/library';
import Topic from './components/common/topic';
import Wishlist from './components/common/wishlist';
import Reading from './components/common/reading';
import Author from './components/common/author';
const navigator = createStackNavigator(
  {
   Login:LoginScreen,
   Signin:SigninScreen,
   Signup:SignupScreen,
   Language:LanguageScreen,
   Categories:CategoriesPage,
   blog:blogpage,
   profile:profilescreen,
   edit:edition,
   notify:Notification,
   follow:followers,
   library:libraryscreen,
   ltopic:Topic,
   lwishlist:Wishlist,
   lreading:Reading,
   lauthor:Author,
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

const drawernavigator = () =>{
  return(
    <NavigationContainer>
    <Drawer.Navigator initialRouteName= {settings} >
      <Drawer.Screen name="Home" component={settings} />
     {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} />*/}
    </Drawer.Navigator>
  </NavigationContainer>
  )
}