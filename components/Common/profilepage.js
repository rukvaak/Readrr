import React, { Component } from 'react';
import { Image ,StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,List,ListItem,Right, H1} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,MaterialCommunityIcons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Carousel from "react-native-carousel-control";
import { Col, Row, Grid } from 'react-native-easy-grid';
export default class profilescreen extends React.Component{
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
    <Content>
<Grid>
    <Col style={{width:"60%",}}>
        <CardItem>
            <Left>
    <Text style = {{fontSize:30,fontWeight:'800',textTransform:'capitalize',marginLeft:20}}>Willnewman</Text>
    <MaterialCommunityIcons name="shield-check" size={45} color="red" />
    </Left>
    </CardItem>
    <Text note style = {{fontSize:15,textTransform:'capitalize',justifyContent:'center',textAlign:'center'}}>Keeping up to date with buisness related books</Text>
    <CardItem>
              
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                <FontAwesome5 name="location-arrow" size={24} color="red" />
                  <Text style = {{textTransform:'capitalize'}}>Australia-cafen</Text>
                </Button>
              </Left>
            </CardItem>
    </Col>
    <Col style={{width:"40%",}}>
        <Right>
        
    <Thumbnail large source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1' }}style={{margin:10,width:120,height:120}}/>
    </Right>
    <Button style = {{backgroundColor:'#053e42',width:"80%",margin:10,justifyContent:'center'}}>
                  <Text>Follow</Text>
                </Button>
    </Col>
</Grid>
<Grid>
    <Col style={{marginLeft:15}}>
    <Text style={{fontSize:28,}}>21</Text>
    <Text style={{fontSize:15,}}>Books</Text>
    </Col>
    <Col>
    <Text style={{fontSize:28,}}>2</Text>
    <Text style={{fontSize:15,}}>Reviews</Text>
    </Col>
    <Col>
    <Text style={{fontSize:28,}}>21k</Text>
    <Text style={{fontSize:15,}}>views</Text>
    </Col>
    <Col>
    <Text style={{fontSize:28,}}>21</Text>
    <Text style={{fontSize:15,}}>Following</Text>
    </Col>
    <Col>
    <Text style={{fontSize:28,}}>1k</Text>
    <Text style={{fontSize:15,}}>Followers</Text>
    </Col>
</Grid>

<Text style = {{fontSize:30,fontWeight:'800',textTransform:'capitalize',marginLeft:20,marginBottom:10,marginTop:10}}>Top writings(4)</Text>
<Carousel>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TiCn965BTlWI3P-EpbYqRQHaJn%26pid%3DApi&f=1'}} style={{height: 400, width: 300, flex: 1}}>
    </Image>
    <Text>The fatal tree</Text>
    <CardItem>
        <Left>
    <AntDesign name="eye" size={24} color="red" />
    <Text>30k</Text>
    </Left>
    <Right>
        <CardItem>
    <EvilIcons name="comment" size={24} color="red" />
    <Text>21</Text>
    </CardItem>
    </Right>
    </CardItem>
    </Card>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KJtemcXgwp8BY5fuw2zjMQAAAA%26pid%3DApi&f=1'}} style={{height: 400, width: 350, flex: 1}}>
    </Image>
<Text>The fatal tree</Text>
    <CardItem>
        <Left>
    <AntDesign name="eye" size={24} color="red" />
    <Text>30k</Text>
    </Left>
    <Right>
        <CardItem>
    <EvilIcons name="comment" size={24} color="red" />
    <Text>21</Text>
    </CardItem>
    </Right>
    </CardItem>
    </Card>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.U6MdxPkEarKCTbmj707hDQAAAA%26pid%3DApi&f=1'}} style={{height: 400, width: 350, flex: 1}}/>
<Text>The fatal tree</Text>
    <CardItem>
        <Left>
    <AntDesign name="eye" size={24} color="red" />
    <Text>30k</Text>
    </Left>
    <Right>
        <CardItem>
    <EvilIcons name="comment" size={24} color="red" />
    <Text>21</Text>
    </CardItem>
    </Right>
    </CardItem>
    </Card>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.p49ksKZQg5E-p0RV4MLMzwAAAA%26pid%3DApi&f=1'}} style={{height: 400, width: 350, flex: 1}}/>
<Text>The fatal tree</Text>
    <CardItem>
        <Left>
    <AntDesign name="eye" size={24} color="red" />
    <Text>30k</Text>
    </Left>
    <Right>
        <CardItem>
    <EvilIcons name="comment" size={24} color="red" />
    <Text>21</Text>
    </CardItem>
    </Right>
    </CardItem>
    </Card>
</Carousel>
<Text style = {{fontSize:30,fontWeight:'800',textTransform:'capitalize',marginLeft:20,marginBottom:10}}>Top Reviews</Text>
<Carousel>
    
<Card>
<Grid style ={{backgroundColor:'#04f769'}}>
    <Col style={{width:"60%",marginLeft:10}}>
    <Text style ={{textAlign:'center',fontSize:15}}>A must read book for everyone this book taught me so many things.</Text>
    <Button transparent>
        <Text style ={{textTransform:"capitalize"}}>Read more ></Text>
    </Button>
    <CardItem style ={{backgroundColor:'#04f769'}}> 
        <Left>
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    </Left>
    </CardItem>
    </Col>
    <Col style={{width:"40%",flex:1}}>
    <Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.p49ksKZQg5E-p0RV4MLMzwAAAA%26pid%3DApi&f=1'}} style={{height: 200, width: 130, flex: 0.4}}/>
    </Col>
</Grid>
</Card>
<Card>
<Grid style ={{backgroundColor:'black'}}>
    <Col style={{width:"60%",marginLeft:10}}>
    <Text style ={{textAlign:'center',fontSize:15,color:'white'}}>A must read book for everyone this book taught me so many things.</Text>
    <Button transparent>
        <Text style ={{textTransform:"capitalize",color:'red'}}>Read more ></Text>
    </Button>
    <CardItem style ={{backgroundColor:'black'}}> 
        <Left>
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    </Left>
    </CardItem>
    </Col>
    <Col style={{width:"40%",flex:1}}>
    <Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TiCn965BTlWI3P-EpbYqRQHaJn%26pid%3DApi&f=1'}} style={{height: 200, width: 130, flex: 0.4}}/>
    </Col>
</Grid>
</Card>
<Card>
<Grid style ={{backgroundColor:'blue'}}>
    <Col style={{width:"60%",marginLeft:10}}>
    <Text style ={{textAlign:'center',fontSize:15,color:'white'}}>A must read book for everyone this book taught me so many things.</Text>
    <Button transparent>
        <Text style ={{textTransform:"capitalize",color:'red'}}>Read more ></Text>
    </Button>
    <CardItem style ={{backgroundColor:'blue'}}> 
        <Left>
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    <AntDesign name="star" size={24} color="red" />
    </Left>
    </CardItem>
    </Col>
    <Col style={{width:"40%",flex:1}}>
    <Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.U6MdxPkEarKCTbmj707hDQAAAA%26pid%3DApi&f=1'}} style={{height: 200, width: 130, flex: 0.4}}/>
    </Col>
</Grid>
</Card>
</Carousel>
    </Content>
</Container>
              );
        }
    }