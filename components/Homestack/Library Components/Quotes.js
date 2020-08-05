import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Image, Rating, Divider, Button, Icon, Avatar } from 'react-native-elements';
import * as Font from 'expo-font';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

// import { default as ProgressBar } from '../../Common/ProgressBar';
// import { default as ImageComponent } from '../../Common/ImageComponent';
// import { default as TitleandAuthor } from '../../Common/TitleandAuthor';
// import AvatarVertical from '../../Common/AvatarVertical';

import { getRequest, postRequest } from '../../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class Quotes extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    this.postlike = this.postlike.bind(this);
    this.postfollow = this.postfollow.bind(this);
  }

  state = {
    quotes: [],
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.quoteData) {
      //console.log('qqqqqqqqqquuuuuuuuuoooooooootes:', user_data)
      this.setState({
        quotes: nextProps.data.quoteData
      })
    } else if (nextProps.data.quotelikes) {
      //("Recieved data")
      showToastWithGravity();
      //this.props.navigation.navigate('Homestack');
    } else if (nextProps.data.FollowUnfollowData) {
      var body = {};
      body["event"] = "quoteData"
      actionPayload = {
        route: 'quotes',
        body: body,
        token: this.props.token //token is mandatory
      }
      this.props.onRequestUpdate();

    }
  }

  componentWillMount() {
    var body = {};
    body["event"] = "quoteData"
    actionPayload = {
      route: 'quotes',
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

  postlike(item) {
    //item.like_icon === 'heart' ?  item.like_icon = 'heart-o' : item.like_icon = 'heart'
    if (item.user_liked) {
      item.quotes_likes--
      item.user_liked = false
    } else {
      item.quotes_likes++
      item.user_liked = true
    }

    var body = {};
    body["event"] = "quoteLikeupdate"
    body["quote_id"] = item._id
    // body['quote_likes'] = item.quotes_likes
    body['like_dislike'] = item.user_liked
    actionPayload = {
      route: 'quotes',
      data: body,
      token: this.props.token //token is mandatory
    }
    this.props.onRequestPostUpdate();
  }

  postfollow(item) {
    var body = {};
    if (item.user_followed) {
      item.user_followed = false
      body["follow_unfollow"] = false
      // console.log('inside true if', this.state.user_present)
    } else {
      item.user_followed = true
      body["follow_unfollow"] = true
      // console.log('inside false if', this.state.user_present)
    }

    body["event"] = "FollowUnfollowData"
    body["author_id"] = item.user_id
    actionPayload = {
      route: 'updateuserinfo',
      data: body,
      token: this.props.token //token is mandatory
    }
    // console.log('outside if', actionPayload.data.follow_unfollow)
    this.props.onRequestPostUpdate();
  }

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <View style={styles.screen}>
        <FlatList
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={this.state.quotes}
          renderItem={({ item }) =>
            <Card
              title={item.quotes_title}
              image={{ uri: item.quotes_image }}
              imageStyle={{ height: screenHeight / 3 }}
              imageProps={{ resizeMode: 'contain' }}
              containerStyle={{ justifyContent: 'flex-start' }}>
              <Grid style={styles.avatar}>
                <Col style={{ justifyContent: 'center' }}>
                  <Avatar rounded size='large' source={{ uri: item.user_profile_pic }} />
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                  <Text style={styles.avatartitle}>
                    {item.user_name}
                  </Text>
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                  <TouchableOpacity
                    style={styles.avatarButtonStyle}
                    activeOpacity={0.5}
                    onPress={() => this.postfollow(item)}
                  >
                    <Text style={styles.avatarButtonText}>
                      {item.user_followed ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
              {/* <AvatarVertical author={{
                user_id: item.user_id,
                user_profile_pic: item.user_profile_pic,
                user_name: item.user_name,
                user_followed: item.user_followed,
                props_flag: false
              }}
                bottomDivider={false}
              /> */}
              <Divider style={styles.Divider} />
              <Icon
                raised={false}
                name={item.user_liked ? 'heart' : 'heart-o'}
                type='font-awesome'
                color={item.user_liked ? 'red' : 'grey'}
                size={30}
                onPress={() => this.postlike(item)} />
              <Text style={{ textAlign: 'center' }}>
                {item.quotes_likes + " likes"}
              </Text>
            </Card>
          }
        />

      </View>


    );
  }
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#e6e6e6'
  },
  avatar: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '5%'
  },
  avatartitle: {
    paddingTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    textAlign: 'center'
  },
  avatarButtonStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#5abd8c',
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 20,
    width: 100,
    height: 30
  },
  avatarButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#ffffff'
  },
  TextBold: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 20
  },
  item: {
    width: (screenWidth * 95) / 100,
    height: (screenHeight * 60) / 100,
    alignSelf: 'center'
  },
  item1: {
    width: (screenWidth * 95) / 100,
    height: (screenHeight * 60) / 100,
    alignSelf: 'center'
  },
  Divider: {
    backgroundColor: 'black',
    height: 0.5,
    marginVertical: 10
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: 20,
    alignSelf: 'center',
    marginHorizontal: 5,
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: 'grey',
    justifyContent: 'center',
    alignSelf: 'center'
  }
}
);

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
    onRequestPostUpdate: () => dispatch(postRequest(actionPayload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quotes);

