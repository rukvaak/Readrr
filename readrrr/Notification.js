import React, { Component } from 'react';
import { Image ,StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,List,ListItem,Right} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class Notifications extends React.Component{
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
                <Container></Container>
              );
        }
        return(
<Container>
        <Header style = {styles.header} >
            <Text style = {styles.feeds}>Notifications</Text>
            </Header>
        <Content>
          <List>
              <Text style = {{color:'black'}}>Today</Text>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1' }} />
                <EvilIcons name="comment" size={14} color="green" />
              </Left>
              <Body>
                <Text>Daniel rose mentioned you in a comment:
                </Text>
                <Text note numberOfLines={1}>@jeans Great ;)</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text style = {styles.view}>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1' }} />
                <FontAwesome5 name="user-check" size={14} color="green" />
              </Left>
              <Body>
                <Text >@raghav started following you</Text>
                
              </Body>
              <Right>
                <Button style = {styles.follow}>
                  <Text>Following</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
          <Text>This week</Text>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1' }} />
                <FontAwesome5 name="user-plus" size={14} color="green" />
              </Left>
              <Body>
                <Text>Your facebook friend remo is on Readrr</Text>
                <Text note numberOfLines={1}>as @remo24</Text>
              </Body>
              <Right>
                <Button style = {styles.follow}>
                  <Text>Follow</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1' }} />
                <AntDesign name="heart" size={14} color="green" />
              </Left>
              <Body>
                <Text>Eva liked your story</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text style = {styles.view}>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1' }} />
                <FontAwesome5 name="share" size={14} color="green" />
              </Left>
              <Body>
                <Text>Robert shared your story</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text style = {styles.view}>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'#053e42',
    },
    feeds:{
      color:"#FFF",
      fontSize:26,
     marginTop:10
    },
    follow:{
      backgroundColor:'#053e42'
    },
    view:{
        color:'#053e42'
    }
    })