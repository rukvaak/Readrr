import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import {  Container, Content, Header, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';

import LoginScreen from './components/Rootstack/logincomponent';
import SigninScreen from './components/Rootstack/signincomponent';
import SignupScreen from './components/Rootstack/signupcomponent';
import LanguageScreen from './components/Rootstack/langcomponent';
import CategoriesPage from './components/Rootstack/categories';
import { createStore, applyMiddleware, compose } from 'redux';
import Webview from './components/Rootstack/Webview';
import Blogpage from './components/Rootstack/BlogPage';
import BlogAddpage from './components/Rootstack/BlogAddPage';
import QuoteAddpage from './components/Rootstack/QuoteAddpage';
import StoryAddPage from './components/Rootstack/StoryAddPage';
import PostEditor from './components/Rootstack/PostEditor';

import HomePage_Viewall from './components/Homestack/HomeTab Components/ViewAll Components/HomePage_Viewall';
import Topics_ViewAll from './components/Homestack/HomeTab Components/ViewAll Components/Topics_ViewAll';

import reducer from './Services/Reducer/reducer'
import dataService from './Services/data-service'
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware(thunk));
import { Provider } from 'react-redux';
const { width: screenWidth } = Dimensions.get('window');
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Profile from './components/Common/profilepage';
import HomeTab from './components/Homestack/HomeTab';
import LibraryTab from './components/Homestack/LibraryTab';
import FeedTab from './components/Homestack/FeedTab';
import ChatTab from './components/Homestack/ChatTab';
import CreatePostQuotePage from './components/Homestack/CreatePostQuotePage';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

console.disableYellowBox = true;

class Homestack extends React.Component{
  render(){
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarPosition='bottom'
      lazy={true}
      swipeEnabled={false}
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
}

const Stack = createStackNavigator();

class Rootstack extends React.Component{
  render(){
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen options={{ headerShown: false, }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Categories" component={CategoriesPage} />
        <Stack.Screen name="Webview" component={Webview} />
        <Stack.Screen name="Blogpage" component={Blogpage} />
        <Stack.Screen name="BlogAddpage" component={BlogAddpage} />
        <Stack.Screen name="QuoteAddpage" component={QuoteAddpage} />
        <Stack.Screen name="PostEditor" component={PostEditor} options={{
         /*  headerTitle: "New TITLE",
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="SAVE"
              color="#000000"
            />
          ), */
        }}/>
        <Stack.Screen name="HomePage_Viewall" component={HomePage_Viewall} />
        <Stack.Screen name="Topics_ViewAll" component={Topics_ViewAll} />
        <Stack.Screen name="StoryAddPage" component={StoryAddPage}/>
        <Stack.Screen name="Homestack" component={Homestack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
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

