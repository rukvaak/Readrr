import React from 'react';
import { Dimensions, StyleSheet, View, ImageBackground, Platform, ScrollView, Text } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Container, Content, Header, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import { default as ImageCarousel } from '../Common/ImageCarousel';
import { default as Avatarcomponent } from '../Common/Avatar';
import { default as YouMayLike } from '../Common/YouMayLike';
import { default as ImageRating } from '../Common/ImageRating';
import { default as Topics } from '../Common/topic';
import { default as RecentlyViewed } from '../Common/RecentlyViewed';
import { default as HeaderComponent } from '../Common/Header';
import { default as FooterComponent } from '../Common/Footer';
/* import { default as BottomDrawer} from '../components/Common/BottomDrawer'; */
/* import { default as SideDrawer} from '../components/Common/SideDrawer'; */

import { getRequest } from '../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

const TabIcon = (props) => (
  <Icon name="menu" color={color} size={size} />
)

const { width: screenWidth } = Dimensions.get('window');

const moment = require('moment');

const Data = [
  {
    id: "1",
    image: require('../../assets/MichaelRosen.jpg'),
    Author: "Michael Rosen"
  },
  {
    id: "2",
    image: require('../../assets/MarcusBerkmann.jpg'),
    Author: "Marcus Berkmann"
  },
  {
    id: "3",
    image: require('../../assets/DeliaOwens.jpg'),
    Author: "Delia Owens"
  },
  {
    id: "4",
    image: require('../../assets/StassiSchroeder.jpg'),
    Author: "Stassi Schroeder"
  }
]

class HomeTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }

  constructor(props) {
    super(props);
  }

  state = {
    loading: true,
    data: [],
    avatar: Data,
    recentlyviewed: []
  }

  componentWillReceiveProps(nextProps) {
    console.log('entering this section', nextProps.data.blogData)
    if (nextProps.data.blogData) {
      this.setState({
        recentlyviewed: nextProps.data.blogData
      })
    }


  }
  componentWillMount() {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var body = {};
    body["event"] = "homePage"
    body['fromdate'] = moment(yesterday).format("YYYY-MM-DD")
    body['todate'] = moment(today).format("YYYY-MM-DD")
    actionPayload = {
      route: 'blogs',
      body: body,
      token: this.props.token //token is mandatory
    }
    this.props.onRequestUpdate();
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
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <Container>
        {/* <HeaderComponent/> */}

        <Content style={{ flex: 1, backgroundColor: '#e6e6e6' }}>

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
              <View style={{ paddingTop: 10 }}>
                <ImageCarousel />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <ImageRating props={this.props} />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Topics />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <RecentlyViewed recentlyviewed={this.state.recentlyviewed}/>
              </View>
              <View style={{ paddingVertical: 20 }}>
              <Text style={styles.TextBold}>Follow Authors</Text>
                <Avatarcomponent avatar={this.state.avatar} />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <YouMayLike />
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
    flex: 1
  },
  background: {
    backgroundColor: '#5abd8c',
    width: screenWidth, // applied to Image
    height: screenWidth - 100,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
  },
  header: {
    backgroundColor: "#5abd8c",
    height: 60,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    shadowOffset: { height: 0, width: 0 },
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
  buttons: {
    flex: .2,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
  },
  TextBold:{
    fontSize:20,
    fontWeight:"bold",
    paddingLeft:20
  },
  signbuttons: {
    backgroundColor: 'rgb(217,0,210)',
    justifyContent: 'center',
    width: "70%",
    borderRadius: 18,

  },
  signbutton: {
    backgroundColor: 'rgb(116,0,217)',
    justifyContent: 'center',
    width: "70%",
    borderRadius: 18,

  }

});

const mapStateToProps = (state, props) => {
  return {
    store: state.store,
    loading: true,
    data: state.items,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestUpdate: () => dispatch(getRequest(actionPayload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (HomeTab);