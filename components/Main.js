import React, {Component}  from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import {Button,Container, Content, Header, Left, Body, Right, Title,Footer, FooterTab } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';


import Homepage from './homepage';
import LibraryPage from './Library';
import Profile from './Common/profilepage';
import HomeTab from '../components/Homestack/HomeTab';
import LibraryTab from '../components/Homestack/LibraryTab';
import FeedTab from '../components/Homestack/FeedTab';
import ChatTab from '../components/Homestack/ChatTab';
import MyProfileTab from '../components/Homestack/MyProfileTab';
import { HeaderTitle } from 'react-navigation-stack';


const { width: screenWidth } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();


export default class  Main extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:(  <View style={{flexDirection: 'row'}}>
                                    <Text style={{color: '#ffffff', fontSize: 26, fontWeight: 'bold', paddingLeft: 10}}>
                                      Readrr
                                    </Text>
                                  </View>
                  ),
                    headerStyle:  {backgroundColor: '#f7931e'},
                    headerLeft:(   <View style={{flexDirection: 'row'}}>
                                    <Button transparent vertical active={true} onPress={() => this.props.navigation.navigate('Main')}>
                                      <Image
                                          source={require('../assets/Readrr-logo.png')}
                                          style={{ width: screenWidth -320, height: screenWidth - 320}}
                                      />
                                    </Button>
                                  </View>),
                    headerRight:(  <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                                    <Button transparent onPress={() => alert("You pressed Notificaton button")}>
                                      <Icon name='notifications'  color='#ffffff' size={30}/>
                                    </Button>
                                    <Button transparent onPress={() => alert("You pressed search button")} style={{paddingLeft: 20}}>
                                      <Icon name='search'  color='#ffffff' size={30}/>
                                    </Button>
                                  </View>)
      /* header: () => null */
   } 
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
              <Tab.Navigator
                initialRouteName="Library"
                tabBarPosition='bottom'
                lazy={true}
                swipeEnabled={true}
                backBehavior='none'
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
        );
    }
  }


