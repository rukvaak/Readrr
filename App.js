import React, {Component}  from 'react';
import { Dimensions,StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import {Button,Container, Content, Header, Left, Body, Right, Title,Footer, FooterTab } from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen   from './components/logincomponent';
import SigninScreen from './components/signincomponent';
import FormExample from './components/signincomponent';
import SignupScreen from './components/signupcomponent';
import LanguageScreen from './components/langcomponent';
import CategoriesPage from './components/categories';
import LibraryPage from './components/Library';
import DrawerOpen from './components/logincomponent';
import {createStore,applyMiddleware, compose}  from 'redux';
import  ImageRating  from './components/Common/ImageRating';
import Homepage from './components/homepage';
import Main from './components/Main';

import   reducer    from './Services/Reducer/reducer'
import dataService from './Services/data-service'
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware(thunk));
import {Provider} from 'react-redux';
import ImageCarousel from './components/Common/ImageCarousel';
const { width: screenWidth } = Dimensions.get('window');
const navigator = createStackNavigator(
  {
   Login:LoginScreen,
   Signin:SigninScreen,
   Signup:SignupScreen,
   Language:LanguageScreen,
   Categories:CategoriesPage,
   Homepage:Homepage,
   LibraryPage:LibraryPage,
   Main:{
          screen: Main,
          navigationOptions: { 
            headerTitle: <View style={{flexDirection: 'row'}}>
                          <Text style={{color: '#ffffff', fontSize: 26, fontWeight: 'bold', paddingLeft: 10}}>
                            Readrr
                          </Text>
                        </View>,
            headerStyle: {backgroundColor: '#f7931e'},
            headerLeft: <View style={{flexDirection: 'row'}}>
                          <Button transparent vertical active={true} onPress={() => this.props.navigation.navigate('Main')}>
                            <Image
                                source={require('./assets/Readrr-logo.png')}
                                style={{ width: screenWidth -320, height: screenWidth - 320}}
                            />
                          </Button>
                        </View>,
            headerRight:  <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                            <Button transparent onPress={() => alert("You pressed Notificaton button")}>
                              <Icon name='notifications'  color='#ffffff' size={30}/>
                            </Button>
                            <Button transparent onPress={() => alert("You pressed search button")} style={{paddingLeft: 20}}>
                              <Icon name='search'  color='#ffffff' size={30}/>
                            </Button>
                          </View>
            
          }
        }
  },
  {
    initialRouteName: 'Main'
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

