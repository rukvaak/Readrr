import React, {Component}  from 'react';
import { Dimensions, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font'

/* import {Container, Content, Text, Icon } from 'native-base'; */

import Homepage from './homepage';
import LibraryPage from './Library';
import Profile from './Common/profilepage';
import HomeTab from '../components/Tabs/HomeTab';
import LibraryTab from '../components/Tabs/LibraryTab';
import FeedTab from '../components/Tabs/FeedTab';
import ChatTab from '../components/Tabs/ChatTab';
import MyProfileTab from '../components/Tabs/MyProfileTab';
import { HeaderTitle } from 'react-navigation-stack';


const { width: screenWidth } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();


export default class  Main extends React.Component{
  static navigationOptions = ({ navigation }) => {
    /* return {
      header: () => null
   }  */
}
  constructor(props){
    super(props);
  }
  
  state = {
    loading: true
  }


  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  
  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }

    getAdjustedFontSize = (size) => {
      return parseInt(size) * screenWidth * (1.8 - 0.002 * screenWidth) / 400;
    }
    
        return(
            <NavigationContainer> 
              <Tab.Navigator
                initialRouteName="Feed"
                tabBarPosition='bottom'
                lazy={true}
                swipeEnabled={true}
                tabBarVisible={true}
                tabBarOptions={{
                  labelStyle: { fontSize: getAdjustedFontSize(12) },
                  activeTintColor: '#ffffff',
                  inactiveTintColor: '#ffffff',
                  inactiveBackgroundColor: "#f7931e",
                  activeBackgroundColor: "#f7931e",
                  showIcon: true,
                  style: {backgroundColor: "#f7931e"},
                  tabStyle: { height: 60 }
                }}
              >
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
                      <Icon type='font-awesome' name='book' color={color} size={size}/>
                    ),
                  }}
                />
                <Tab.Screen
                  name="Edit"
                  component={FeedTab}
                  options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                      <View style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        alignSelf: 'center'}}>
                      <Icon name="edit" color='black' size={size}/>
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
                      <Icon name="message" color={color} size={size}/>
                    ),
                  }}
                />
                <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                      <Icon type='material-community' name='account' color={color} size={size}/>
                    ),
                  }}
                />
              </Tab.Navigator>          
            </NavigationContainer>
        );
    }
  }


