import React, { Component } from 'react';
import { Image ,StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import  { default as Avatarcomponent}   from '../Common/Avatar';
import  { default as AvatarVertical}   from '../Common/AvatarVertical';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


class Author extends Component {
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
  render() {
    if (this.state.loading){
      return (
          <Container></Container>
        );
  }
    return (
      

        <Content>
          <Avatarcomponent/>
          <AvatarVertical/>
        </Content>
      
    );
  }
}

const styles = StyleSheet.create({
header:{
  backgroundColor:'#223343'
},
feeds:{
  color:"#FFF",
  fontSize:26,
},
card:{
  flex:0,
},
follow:{
  backgroundColor:'red'
},

});

export default Author;