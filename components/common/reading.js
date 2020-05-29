import React, { Component } from 'react';
import { Image ,StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,Right} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import profie from './profile';
import Carousel from "react-native-carousel-control";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
export default class Reading extends Component {
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
            <Content>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TiCn965BTlWI3P-EpbYqRQHaJn%26pid%3DApi&f=1'}} style={{height: 500, width: 400, flex: 1}}>
    </Image>
    <Text>The fatal tree</Text>
    <CardItem>
        <Left>
    <Button style ={{marginRight:10}}><Text>Read now</Text></Button>
    <Button style ={{marginRight:10}}><Text>share this</Text></Button>
    <Button><Text>comment</Text></Button>
    </Left>
    </CardItem>
    </Card>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KJtemcXgwp8BY5fuw2zjMQAAAA%26pid%3DApi&f=1'}} style={{height: 500, width: 400, flex: 1}}>
    </Image>
<Text>The fatal tree</Text>
<CardItem>
        <Left>
    <Button style ={{marginRight:10}}><Text>Read now</Text></Button>
    <Button style ={{marginRight:10}}><Text>share this</Text></Button>
    <Button><Text>comment</Text></Button>
    </Left>
    </CardItem>
    </Card>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.U6MdxPkEarKCTbmj707hDQAAAA%26pid%3DApi&f=1'}} style={{height: 500, width: 400, flex: 1}}/>
<Text>The fatal tree</Text>
<CardItem>
        <Left>
    <Button style ={{marginRight:10}}><Text>Read now</Text></Button>
    <Button style ={{marginRight:10}}><Text>share this</Text></Button>
    <Button><Text>comment</Text></Button>
    </Left>
    </CardItem>
    </Card>
    <Card>
<Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.p49ksKZQg5E-p0RV4MLMzwAAAA%26pid%3DApi&f=1'}} style={{height: 500, width: 400, flex: 1}}/>
<Text>The fatal tree</Text>
<CardItem>
        <Left>
    <Button style ={{marginRight:10}}><Text>Read now</Text></Button>
    <Button style ={{marginRight:10}}><Text>share this</Text></Button>
    <Button><Text>comment</Text></Button>
    </Left>
    </CardItem>
    </Card>
</Content>
</Container>   
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

})