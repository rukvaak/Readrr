import React, { Component,} from 'react';
import { Image ,StyleSheet,TextInput} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,List,ListItem,Right,} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,MaterialCommunityIcons} from '@expo/vector-icons';
import profie from './profile';
import * as Font from 'expo-font';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';

export default class Chatwithme extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        loading: true,
        s:"write something"
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
<Container style ={{flex:1}}>
    <Header style={{     backgroundColor:'#053e42'}}>
        <Text style={{      color:"#FFF",
      fontSize:26,
     marginTop:10,}}>chat </Text>
        </Header>
        <Card>
<CardItem>
    <Left>
    <Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1' }} />
<Text>Hey dude!</Text>
</Left>
</CardItem>
        </Card>
        <Card>
        <CardItem>
            <Right></Right>
        <Text>Hey,what's up? i'm fine here,</Text>
    <Right>
<Thumbnail square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1' }} />
</Right>
</CardItem>
        </Card>
    <Content style ={{position:'absolute',width:"100%",bottom:0}}>
        <Card>
<CardItem style={{borderColor:'red',backgroundColor:'#053e42',}}>
    <Left>
        <Button transparent>
    <Entypo name="emoji-flirt" size={30} color="white" />
    </Button>
    <TextInput style = {{ fontSize:20,
      fontWeight:'300',
      padding:10,
      width:"80%",
      backgroundColor:'#FFF',
      borderRadius:8,
 
    }}
            value={this.state.s}
            onChangeText={text=>setState(prevState=>{
                return {...prevState,s:text}
                
            })}
            />
            <Button transparent>
        <MaterialCommunityIcons name="send-circle" size={45} color="white" />
        </Button>
    </Left>
</CardItem>
</Card>
    </Content>
</Container>
        );
    }
}