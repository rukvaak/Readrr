import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input} from 'native-base';
import {StyleSheet, } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
export default class followers extends Component {
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
      <Container>
                <Header searchBar rounded style = {styles.search}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search your followers" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
           <Text style = {styles.following} note>Followers</Text>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1' }} />
              </Left>
              <Body>
                <Text>Robert</Text>
                <Text note numberOfLines={1}>user tagline here</Text>
              </Body>
              <Right>
                <Button style = {styles.follow}>
                  <Text>follow</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1' }} />
              </Left>
              <Body>
                <Text>Hellen vestr</Text>
                <Text note numberOfLines={1}>user tagline here</Text>
              </Body>
              <Right>
                <Button style = {styles.follow}>
                  <Text>following</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1' }} />
              </Left>
              <Body>
                <Text>david</Text>
                <Text note numberOfLines={1}>user tagline here</Text>
              </Body>
              <Right>
                <Button style = {styles.follow}>
                  <Text>follow</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1' }} />
              </Left>
              <Body>
                <Text>Ricky ras</Text>
                <Text note numberOfLines={1}>user tagline here</Text>
              </Body>
              <Right>
                <Button style = {styles.follow}>
                  <Text>follow</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1' }} />
              </Left>
              <Body>
                <Text>venom catre</Text>
                <Text note numberOfLines={1}>user tagline here</Text>
              </Body>
              <Right>
                <Button style = {styles.follow}>
                  <Text>following</Text>
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
    follow:{
        backgroundColor:'#053e42'
      },
search:{
    backgroundColor:'#053e42'
},
following:{
    marginLeft:20,
    fontSize:25,
    fontWeight:'500'
}
})
