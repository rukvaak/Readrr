import React from 'react';
import { Dimensions, StyleSheet,View,ImageBackground,Platform, ScrollView, Text} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Button,Container, Content, Header, Left, Body, Right, Title,Footer, FooterTab } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

/* import { default as BottomDrawer} from '../components/Common/BottomDrawer'; */
/* import { default as SideDrawer} from '../components/Common/SideDrawer'; */

const { width: screenWidth } = Dimensions.get('window');

class FooterComponent extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
    super(props);
    this.renderLibraryPage = this.renderLibraryPage.bind(this); 
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

  renderLibraryPage(){
    
  }

  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
        return(
                  <Footer>
                    <FooterTab style={styles.footer}>
                      <Button vertical onPress={() => alert("You pressed Feed button")}>
                        <Icon name="menu" color='#ffffff' size={25}/>
                        <Text style={styles.footertext}>Feed</Text>
                      </Button>
                      <Button vertical onPress={()=>this.props.navigation.navigate('LibraryPage') }>
                        <Icon type='font-awesome' name='book' color='#ffffff' size={25}/>
                        <Text style={styles.footertext}>Library</Text>
                      </Button>
                      <Button vertical onPress={() => alert("You pressed Edit button")}>
                          <Icon raised name="edit" color='black' size={25}/>
                      </Button>
                      <Button vertical onPress={() => alert("You pressed Chat button")}>
                        <Icon name="message" color='#ffffff' size={25}/>
                        <Text style={styles.footertext}>Chat</Text>
                      </Button>
                      <Button vertical onPress={() => alert("You pressed My button")}>
                        <Icon type='font-awesome' name='user-circle-o' color='#ffffff' size={25}/>
                        <Text style={styles.footertext}>My Profile</Text>
                      </Button>
                    </FooterTab>
                  </Footer>
        );
    }
  }



const styles = StyleSheet.create({
    screen: {
    flex:1
    },
footer: {
 /*  backgroundColor: "#5abd8c",  */
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


export default FooterComponent;