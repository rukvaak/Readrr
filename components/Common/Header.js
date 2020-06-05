import React from 'react';
import { Dimensions, StyleSheet,View,Image,Platform, ScrollView, Text} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Button,Container, Content, Header, Left, Body, Right, Title,Footer, FooterTab } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

/* import { default as BottomDrawer} from '../components/Common/BottomDrawer'; */
/* import { default as SideDrawer} from '../components/Common/SideDrawer'; */

const { width: screenWidth } = Dimensions.get('window');


class HeaderComponent extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
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

  renderRightComponent(){


  }

  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
        return(
                  <Header style={styles.header}>
                    <Left style={{ marginStart: -30}}>
                        <Button transparent vertical active={true} onPress={() => this.props.navigation.navigate('Homepage')}>
                            <Image
                                source={require('../../assets/Readrr-logo.png')}
                                style={{ width: screenWidth -320, height: screenWidth - 320}}
                            />
                        </Button>
                    </Left>
                    <Body>
                      <Title style={{fontSize: 28, fontWeight: 'bold', color: '#ffffff', paddingLeft: 30}}>Readrr</Title>
                    </Body>
                    <Right>
                 {/*      <Button transparent onPress={() => alert("You pressed this button")}> */}
                      <Button transparent onPress={() => alert("You pressed Notificaton button")}>
                        <Icon name='notifications'  color='#ffffff' size={30}/>
                      </Button>
                      <Button transparent onPress={() => alert("You pressed search button")}>
                        <Icon name='search'  color='#ffffff' size={30}/>
                      </Button>
                    </Right>
                  </Header>
        );
    }
  }



const styles = StyleSheet.create({
    screen: {
    flex:1
    },
header: {
  backgroundColor: "#f7931e", 
  height: 60,
  shadowColor: 'transparent',
  borderBottomWidth: 0, 
  shadowOffset: {height: 0, width: 0}, 
  shadowOpacity: 0, elevation: 0
},
footer: {
  backgroundColor: "#f7931e", 
  height: 60
},
footericon: {
  color: "#ffffff",
  fontSize: 35
},
footertext: {
  color: "#ffffff",
  fontSize: 14
}

});


export default HeaderComponent;