import React from 'react';
import { Dimensions, StyleSheet,View,ImageBackground,Platform, ScrollView, Text, StatusBar} from 'react-native';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,MaterialCommunityIcons,MaterialIcons,Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Icon } from 'react-native-elements';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Button,Container, Content, Tab, Tabs, TabHeading,ScrollableTab } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import  { default as Avatarcomponent}   from '../components/Common/Avatar';
import { default as AvatarVertical} from '../components/Common/AvatarVertical';
import { default as HeaderComponent} from '../components/Common/Header';
import { default as FooterComponent} from '../components/Common/Footer';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';
import Reading from './Common/Reading';
import Wishlist from './Common/Wishlist';
import Author from './Common/Author';
import Topic from './Common/Topics';
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

class MyTabs extends React.Component{
  render(){
    return(
        <Tabs locked renderTabBar={()=> <ScrollableTab />}>
          <Tab heading={ 
            <TabHeading>
              <MaterialIcons name="local-library" size={18} color="white" />
              <Text style={styles.tabText}>
                READING
              </Text>
            </TabHeading>
            }
          >
            <Reading/>
          </Tab>
          <Tab heading={ 
            <TabHeading>
              <MaterialIcons name="local-library" size={18} color="white" />
              <Text style={styles.tabText}>
                WISHLIST
              </Text>
            </TabHeading>
            }
          >
            <Wishlist/>
          </Tab>
          <Tab heading={ 
            <TabHeading>
              <FontAwesome5 name="pen-alt" size={18} color="white" />
              <Text style={styles.tabText}>
                AUTHOR
              </Text>
            </TabHeading>
            }
          >
            <Author/>
          </Tab>
          <Tab heading={ 
            <TabHeading>
              <FontAwesome5 name="list-alt" size={18} color="white" />
              <Text style={styles.tabText}>
                TOPIC
              </Text>
            </TabHeading>
            }
          >
            <Reading/>
          </Tab>
        </Tabs>
    )
  }
}

export default class  Library extends React.Component{
  
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
  

  componentDidMount(){
    this._loadInitialState.done();
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
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#5abd8c' }}
      />
    );
        return(
            <Container> 
                {/* <HeaderComponent/> */}

                <Content style={{flex:1}}> 
                  <MyTabs/>
                </Content>

                {/* <FooterComponent/>    */}          
            </Container>
        );
    }
  }



const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: 'white'
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    screen: {
    flex:1
    },
    tabText: { 
      color: '#ffffff', 
      fontWeight: 'bold', 
      paddingLeft: 5,
      fontSize: 10
    },
background:{
  backgroundColor: '#5abd8c',    
  width: screenWidth, // applied to Image
  height: screenWidth - 100 ,
  borderBottomLeftRadius: 200,
  borderBottomRightRadius: 200,
  paddingTop: Platform.OS === 'ios' ? 60 : 0,
}
}
);