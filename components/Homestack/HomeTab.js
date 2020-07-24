import React from 'react';
import { Dimensions, StyleSheet, View, ImageBackground, Platform, ScrollView, Text } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Container, Content, Header, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import { default as OurPicks } from '../Homestack/HomeTab Components/OurPicks';
import { default as Avatarcomponent } from '../Common/Avatar';
import { default as YouMayLike } from '../Homestack/HomeTab Components/YouMayLike';
import { default as MostPopular } from '../Homestack/HomeTab Components/MostPopular';
import { default as Topics } from '../Homestack/HomeTab Components/Topics';
import { default as RecentlyAdded } from './HomeTab Components/RecentlyAdded';
import { default as FollowAuthors } from './HomeTab Components/FollowAuthors';

import { getRequest } from '../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

const TabIcon = (props) => (
  <Icon name="menu" color={color} size={size} />
)

const { width: screenWidth } = Dimensions.get('window');

const moment = require('moment');

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
    avatar: '',
    our_picks: {},
    most_popular: {},
    recently_added: {},
    you_may_like: {},
    topics: [],
    authors: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.blogData) {
      this.setState({
        our_picks: nextProps.data.blogData[0].our_picks,
        most_popular: nextProps.data.blogData[0].most_popular,
        recently_added: nextProps.data.blogData[0].recently_added,
        you_may_like: nextProps.data.blogData[0].you_may_like
      })
    } else if (nextProps.data.topicData) {
      this.setState({
        topics: nextProps.data.topicData
      })
    } else if (nextProps.data.authorData) {
      this.setState({
        authors: nextProps.data.authorData
      })
    }


  }
  componentWillMount() {
    // var today = new Date();
    // var yesterday = new Date(today);
    // yesterday.setDate(today.getDate() - 1);
     var body = {};
    body["event"] = "homePage"
    // body['fromdate'] = moment(yesterday).format("YYYY-MM-DD")
    // body['todate'] = moment(today).format("YYYY-MM-DD")
    actionPayload = {
      route: 'blogs',
      body: body,
      token: this.props.token //token is mandatory
    }
    this.props.onRequestUpdate();

    body = {};
    body["event"] = "categoryList"
    body["limit"] = 5
    // body['fromdate'] = moment(yesterday).format("YYYY-MM-DD")
    // body['todate'] = moment(today).format("YYYY-MM-DD")
    actionPayload = {
      route: 'categories',
      body: body,
      token: this.props.token //token is mandatory
    }
    this.props.onRequestUpdatetopics();

    body = {};
    body["event"] = "authorList"
    body["limit"] = 5
    // body['fromdate'] = moment(yesterday).format("YYYY-MM-DD")
    // body['todate'] = moment(today).format("YYYY-MM-DD")
    actionPayload = {
      route: 'updateuserinfo',
      body: body,
      token: this.props.token //token is mandatory
    }
    this.props.onRequestUpdateauthors();
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
                <OurPicks our_picks={this.state.our_picks}/>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <MostPopular most_popular={this.state.most_popular} />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Topics topics={this.state.topics}/>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <RecentlyAdded recently_added={this.state.recently_added}/>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <FollowAuthors followauthors={this.state.authors} />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <YouMayLike you_may_like={this.state.you_may_like}/>
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
    onRequestUpdatetopics: () => dispatch(getRequest(actionPayload)),
    onRequestUpdateauthors: () => dispatch(getRequest(actionPayload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (HomeTab);