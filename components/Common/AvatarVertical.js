import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Image, Avatar, ListItem, FlatList, Divider } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import { getRequest, postRequest } from '../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

class AvatarVertical extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    this.postfollow = this.postfollow.bind(this);
    //console.log('props: ', props)
  }

  state = {
    user_present: false,
    bottomDivider: false,
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


  componentWillReceiveProps(nextProps) {
    if (nextProps.data.FollowData) {
      console.log('qqqqqqqqqquuuuuuuuuoooooooootes:', nextProps.data.FollowData[0])
      this.setState({
        user_present: nextProps.data.FollowData[0].user_present
      })
    } else if (nextProps.data.FollowUnfollowData) {
      var body = {};
      body["event"] = "FollowData"
      body["author_id"] = this.props.author.user_id
      actionPayload = {
        route: 'updateuserinfo',
        body: body,
        token: this.props.token //token is mandatory
      }
      this.props.onRequestUpdate();
    }
  }

  componentWillMount() {
    var body = {};
    body["event"] = "FollowData"
    body["author_id"] = this.props.author.user_id
    actionPayload = {
      route: 'updateuserinfo',
      body: body,
      token: this.props.token //token is mandatory
    }
    this.props.onRequestUpdate();

  }

  postfollow() {
    var body = {};
    if (this.state.user_present) {
      this.setState({ user_present: false })
      body["follow_unfollow"] = false
      console.log('inside true if', this.state.user_present)
    } else {
      this.setState({ user_present: true })
      body["follow_unfollow"] = true
      console.log('inside false if', this.state.user_present)
    }

    body["event"] = "FollowUnfollowData"
    body["author_id"] = this.props.author.user_id
    actionPayload = {
      route: 'updateuserinfo',
      data: body,
      token: this.props.token //token is mandatory
    }
    console.log('outside if', actionPayload.data.follow_unfollow)
    this.props.onRequestPostUpdate();
  }


  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <Grid style={styles.screen}>
        <Col style={{ justifyContent: 'center' }}>
          <Avatar rounded size='large' source={{ uri: this.props.author.user_profile_pic }} />
        </Col>
        <Col style={{ justifyContent: 'center' }}>
          <Text style={styles.title}>
            {this.props.author.user_name}
          </Text>
        </Col>
        <Col style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.ButtonStyle}
            activeOpacity={0.5}
            onPress={() => this.postfollow()}
          >
            <Text style={styles.ButtonText}>
              {this.state.user_present ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </Col>
      </Grid>
    );
  }
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '5%'
  },
  TextBold: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20
  },
  title: {
    paddingTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    textAlign: 'center'
  },
  ButtonStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#5abd8c',
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 20,
    width: 100,
    height: 30
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#ffffff'
  },

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
)(AvatarVertical);