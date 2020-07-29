import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Image, Rating, Divider, Button, Icon } from 'react-native-elements';
import * as Font from 'expo-font';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

import { default as ProgressBar } from '../../Common/ProgressBar';
import { default as ImageComponent } from '../../Common/ImageComponent';
import { default as TitleandAuthor } from '../../Common/TitleandAuthor';
import AvatarVertical from '../../Common/AvatarVertical';

import { getRequest, postRequest } from '../../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Data = [
  {
    id: "1",
    image: require('../../../assets/EmileZola.jpg'),
    title: "The Disappearance of Emile Zola",
    Author: "Michael Rosen"
  },
  {
    id: "2",
    image: require('../../../assets/Fatherhood.jpg'),
    title: "FatherHood: The Truth",
    Author: "Marcus Berkmann"
  },
  {
    id: "3",
    image: require('../../../assets/Time-Travellers.jpg'),
    title: "The Time-Travellers Handbook",
    Author: "Lottie Stride"
  },
]

class Quotes extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    this.postlike = this.postlike.bind(this);
  }

  state = {
    quotes: [],
    author: {},
    like_icon: 'heart-o',
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.quoteData) {
      let user_data = {};
      user_data['user_id'] = (nextProps.data.quoteData[0].user_id);
      user_data['user_name'] = (nextProps.data.quoteData[0].user_name);
      user_data['user_profile_pic'] = (nextProps.data.quoteData[0].user_profile_pic);
      //console.log('qqqqqqqqqquuuuuuuuuoooooooootes:', user_data)
      this.setState({
        quotes: nextProps.data.quoteData,
        author: user_data
      })
    } else if (nextProps.data.quotelikes) {
      //("Recieved data")
      showToastWithGravity();
      this.props.navigation.navigate('Homestack');
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
    item.like_icon === 'heart' ?  item.like_icon = 'heart-o' : item.like_icon = 'heart'
    if (item.like_icon === 'heart' ) {
      item.quotes_likes++
    } else if(item.like_icon === 'heart-o' ) {
      item.quotes_likes--
    } 

    var body = {};
    body["event"] = "quoteLikeupdate"
    body["quote_id"] = item._id
    body['quote_likes'] = item.quotes_likes
    actionPayload = {
      route: 'quotes',
      data: body,
      token: this.props.token //token is mandatory
    }
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
              containerStyle={{justifyContent: 'flex-start'}}>
              <AvatarVertical author={this.state.author} bottomDivider={false} />
              <Divider style={styles.Divider} />
              <Icon
                raised={false}
                name={item.like_icon === undefined ? 'heart-o' : item.like_icon}
                type='font-awesome'
                color='grey'
                size={30}
                onPress={() => this.postlike(item)} />
              <Text style={{ textAlign: 'center' }}>
                {item.quotes_likes+" likes"}
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

