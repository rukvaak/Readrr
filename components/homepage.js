import React from 'react';
import { Dimensions, StyleSheet,View,ImageBackground,Platform, ScrollView, Text} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Button,Container, Content, Header, Left, Body, Right, Title,Footer, FooterTab } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import  { default as ImageCarousel}   from '../components/Common/ImageCarousel';
import  { default as Avatarcomponent}   from '../components/Common/Avatar';
import  { default as YouMayLike}   from '../components/Common/YouMayLike';
import  { default as ImageRating}   from '../components/Common/ImageRating';
import  { default as Topics}   from '../components/Common/Topics';
import { default as RecentlyViewed} from '../components/Common/RecentlyViewed';
import { default as HeaderComponent} from '../components/Common/Header';
import { default as FooterComponent} from '../components/Common/Footer';
/* import { default as BottomDrawer} from '../components/Common/BottomDrawer'; */
/* import { default as SideDrawer} from '../components/Common/SideDrawer'; */

const { width: screenWidth } = Dimensions.get('window');

const Data=[
  {
    id:"1",
    image:require('../assets/MichaelRosen.jpg'),
    Author: "Michael Rosen"
  },
  {
    id:"2",
    image:require('../assets/MarcusBerkmann.jpg'),
    Author: "Marcus Berkmann"
  },
  {
    id:"3",
    image:require('../assets/DeliaOwens.jpg'),
    Author: "Delia Owens"
  },
  {
    id:"4",
    image:require('../assets/StassiSchroeder.jpg'),
    Author: "Stassi Schroeder"
  }
]

export default class  Homepage extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
    super(props);
  }
  
  state = {
    loading: true,
    data: Data
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
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
        return(
            <Container> 
                  {/* <HeaderComponent/> */}

                <Content style={{flex:1}}> 

                    {/*   <ImageBackground  style={styles.background} 
                                imageStyle={{
                                            resizeMode: 'contain' // works only here!
                                }}
                      >   */}
                        {/* <View style={{paddingTop: 10}}>
                          <ImageCarousel/>
                        </View> */}
                    {/*   </ImageBackground> */}


                  <ScrollView showsVerticalScrollIndicator={false} directionalLockEnabled={false}>
                    <View>
                      <View style={{paddingTop: 10}}>
                        <ImageCarousel />
                      </View>
                      <View style={{paddingVertical: 20}}>
                        <ImageRating/>
                      </View>
                      <View style={{paddingVertical: 20}}>
                        <Topics/>
                      </View>
                      <View style={{paddingVertical: 20}}>
                        <RecentlyViewed/>
                      </View>
                      <View style={{paddingVertical: 20}}>
                        <Avatarcomponent data={this.state.data}/>
                      </View>
                      <View style={{paddingVertical: 20}}>
                        <YouMayLike/>
                      </View>
                    </View>

                  </ScrollView> 
                </Content>
                
                {/* <Footer>
                    <FooterTab style={styles.footer}>
                        <BottomDrawer/>
                    </FooterTab>
                  </Footer> */}

                  {/* <FooterComponent/> */}


             
            </Container>
        );
    }
  }



const styles = StyleSheet.create({
    screen: {
    flex:1
    },
background:{
  backgroundColor: '#5abd8c',    
  width: screenWidth, // applied to Image
  height: screenWidth - 100 ,
  borderBottomLeftRadius: 200,
  borderBottomRightRadius: 200,
  paddingTop: Platform.OS === 'ios' ? 60 : 0,
},
header: {
  backgroundColor: "#5abd8c", 
  height: 60,
  shadowColor: 'transparent',
  borderBottomWidth: 0, 
  shadowOffset: {height: 0, width: 0}, 
  shadowOpacity: 0, elevation: 0
},
footer: {
  backgroundColor: "#5abd8c", 
  height: 60
},
footericon: {
  color: "#ffffff",
  fontSize: 35
},
footertext: {
  color: "#ffffff",
  fontSize: 14
},
buttons:{
    flex:.2,
    justifyContent:'space-around',
    flexDirection:'column',
    alignItems:'center',
    

},
        signbuttons:{
            backgroundColor:'rgb(217,0,210)',
          justifyContent:'center',
            width:"70%",
            borderRadius:18,
          
        },
        signbutton:{
        backgroundColor:'rgb(116,0,217)',
        justifyContent:'center',
        width:"70%",
        borderRadius:18,
       
        }

});