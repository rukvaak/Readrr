import React, { Component } from 'react';
import { Image ,StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,List,ListItem,Right} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Feather,MaterialCommunityIcons} from '@expo/vector-icons';
import profie from './Notification';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
export default class edition extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        loading: true
      }
      state = {
 
        ImageSource: null,
      
      };
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
<Container >
    <Header style = {styles.header}>
        <Text style = {styles.heading}>Edit profile</Text>
    </Header>
    <Content >
        <Card style = {styles.screen}>
            <ListItem Thumbnail>
    <Thumbnail large source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1' }} style = {styles.thumb} />
    </ListItem>
    <Button style = {{borderRadius:60,backgroundColor:'#04f769',}}><Text style = {{textTransform:'capitalize',color:'black'}}>Edit avatar</Text></Button>
    <ListItem>
    <Button transparent> 
        <Text style = {{fontSize:30,fontWeight:'800',textTransform:'capitalize'}}>Willnewman</Text>
        <Feather name="edit" size={24} color="black" />
        </Button>
    </ListItem>
    <ListItem>
        <Button transparent>
            <Text style = {{fontSize:15,textTransform:'capitalize'}}>Keeping up to date with buisness related books</Text>
            <Feather name="edit" size={24} color="black" />
        </Button>
    </ListItem>
    <Button style = {{borderRadius:60,backgroundColor:'#04f769',}}><Text style = {{textTransform:'capitalize',color:'black'}}>Save this</Text></Button>
    </Card>
    </Content>
</Container>
        );
    }
}
const styles = StyleSheet.create({
header:{
    backgroundColor:'#053e42',
},
heading:{
color:'#FFF',
marginTop:20,
},
screen:{
    alignItems:'center',
    height:"100%"
},
thumb:{
    marginTop:20,
    height:200,
    width:200,
}
});