import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card, Image, Rating } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { default as ImageComponent } from '../../Common/ImageComponent';
import { default as TitleandAuthor } from '../../Common/TitleandAuthor';
import { default as RatingComponent } from '../../Common/Rating';

import * as RootNavigation from '../../../RootNavigation.js';

import { getRequest } from '../../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class Reading extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
  }

  state = {
    data: {},
    stories: [],
    story: [],
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.StoriesData) {
      //console.log('StoriesDataAAAAAAAAAAAAAAAAAAAAAAAA', nextProps.data.StoriesData)
      this.setState({
        stories: nextProps.data.StoriesData
      })
    }

  }

  componentWillMount() {
    var body = {};
    var routename;
    body["event"] = "StoriesData";
    routename = 'stories';
    actionPayload = {
      route: routename,
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
    return(
      <SafeAreaView style={styles.screen}>
        <FlatList
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.stories}
          columnWrapperStyle={styles.row}
          renderItem={({item})=>
          <TouchableOpacity activeOpacity={0.5} 
          onPress={() => RootNavigation.navigate('Storypage',{ story_id: item._id})}>
                  <View style={styles.item}>
                      <ImageComponent image={item.story_image} /> 
                      <TitleandAuthor title={item.story_title} author={item.story_author} />
                      <RatingComponent rating={item.story_rating}/>
                  </View>  
              </TouchableOpacity>     
          }
        />

      </SafeAreaView>

   
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
row: {
  justifyContent: "space-around",
  margin: 10
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
    width: (screenWidth * 45) / 100,
    height: (screenHeight * 35) / 100
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: 10
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
    onRequestUpdate: () => dispatch(getRequest(actionPayload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reading);
