import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, Container, Content, Header, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Rootstack/logincomponent';
import SigninScreen from './components/Rootstack/signincomponent';
import SignupScreen from './components/Rootstack/signupcomponent';
import LanguageScreen from './components/Rootstack/langcomponent';
import CategoriesPage from './components/Rootstack/categories';
import LibraryPage from './components/Library';
import { createStore, applyMiddleware, compose } from 'redux';
import ImageRating from './components/Common/ImageRating';
import Homepage from './components/homepage';
import Main from './components/Main';
import Webview from './components/Rootstack/Webview';
import Blogpage from './components/Rootstack/BlogPage';
import BlogAddpage from './components/Rootstack/BlogAddPage';
import PostEditor from './components/Rootstack/PostEditor';

import reducer from './Services/Reducer/reducer'
import dataService from './Services/data-service'
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware(thunk));
import { Provider } from 'react-redux';
import ImageCarousel from './components/Common/ImageCarousel';
const { width: screenWidth } = Dimensions.get('window');
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Profile from './components/Common/profilepage';
import HomeTab from './components/Homestack/HomeTab';
import LibraryTab from './components/Homestack/LibraryTab';
import FeedTab from './components/Homestack/FeedTab';
import ChatTab from './components/Homestack/ChatTab';
import CreatePostQuotePage from './components/Rootstack/CreatePostQuotePage';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

console.disableYellowBox = true;

function Homestack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarPosition='bottom'
      lazy={true}
      swipeEnabled={true}
      backBehavior='none'
      tabBarVisible={true}
      options={() => ({
        headerTitle: 'Readrr',
        headerLeft: () => (
          <View style={{ flexDirection: 'row' }}>
            <Button transparent vertical active={true} /* onPress={() => this.props.navigation.navigate('Main')} */>
              <Image
                source={require('./assets/Readrr-logo.png')}
                style={{ width: screenWidth - 320, height: screenWidth - 320 }}
              />
            </Button>
          </View>
        ),
      })}
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        activeTintColor: '#ffffff',
        inactiveTintColor: '#ffffff',
        inactiveBackgroundColor: "#f7931e",
        activeBackgroundColor: "#f7931e",
        showIcon: true,
        style: { backgroundColor: "#f7931e" },
        tabStyle: { height: 60 }
      }}>
      <Tab.Screen
        name="Feed"
        component={HomeTab}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Icon name="menu" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryTab}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Icon type='font-awesome' name='book' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={CreatePostQuotePage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
              <Icon name="edit" color='black' size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatTab}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon type='material-community' name='account' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
const Stack = createStackNavigator();

function Rootstack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen options={{ headerShown: false, }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Categories" component={CategoriesPage} />
        <Stack.Screen name="Webview" component={Webview} />
        <Stack.Screen name="Blogpage" component={Blogpage} />
        <Stack.Screen name="BlogAddpage" component={BlogAddpage} />
        <Stack.Screen name="PostEditor" component={PostEditor} />
        <Stack.Screen name="Homestack" component={Homestack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/* const navigator = createStackNavigator(
  {
   Login:LoginScreen,
   Signin:SigninScreen,
   Signup:SignupScreen,
   Language:LanguageScreen,
   Categories:CategoriesPage,
   Homepage:Homepage,
   LibraryPage:LibraryPage,
   Webview:Webview,
   Blogpage:Blogpage,
   Main:Main,
   Homestack:Homestack
  },
  {
    initialRouteName: 'Login',
  }
); */

/* const AppContainer = createAppContainer(Rootstack); */

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Rootstack />

      </Provider>
    )
  }
}
