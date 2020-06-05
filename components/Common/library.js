import React, { Component } from 'react';
import { Image ,StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,List,ListItem,Right, H1,Segment, Tab, Tabs, TabHeading,ScrollableTab} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Carousel from "react-native-carousel-control";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Reading from './reading';
import Wishlist from './wishlist';
import Author from './author';
import Topic from './topic';
export default class libraryscreen extends React.Component{
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
        if (this.state.loading){
            return (
                <View></View>
              );
            }
            return(
<Container>
<Header hasTabs style ={{backgroundColor:'#223343'}}>
    <Text style = {{color:"#FFF",fontSize:30,marginTop:10}}>Library</Text>
    </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading={ <TabHeading><MaterialIcons name="local-library" size={24} color="white" /><Text>Reading</Text></TabHeading>}>
            <Reading/>
          </Tab>
          <Tab heading={ <TabHeading><FontAwesome5 name="shopping-cart" size={24} color="white" /><Text>Wishlist</Text></TabHeading>}>
            <Wishlist/>
          </Tab>
          <Tab heading={ <TabHeading><FontAwesome5 name="pen-alt" size={24} color="white" /><Text>Author</Text></TabHeading>}>
            <Author />
          </Tab>
          <Tab heading={ <TabHeading><AntDesign name="notification" size={24} color="white" /><Text>Topic</Text></TabHeading>}>
            <Topic />
          </Tab>
        </Tabs>
</Container>
            );
      }
}