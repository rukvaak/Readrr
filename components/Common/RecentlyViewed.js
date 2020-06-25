import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Image, Rating } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text } from 'native-base';

import { default as TitleandAuthor } from './TitleandAuthor';
import { default as TopicTitle } from './TopicTitle';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Data = [
  {
    id: "1",
    image: require('../../assets/TheFatalTree.jpg'),
    title: "The Fatal Tree",
    Author: "Jake Arnott"
  },
  {
    id: "2",
    image: require('../../assets/DayFour.jpg'),
    title: "Day Four",
    Author: "Sarah Lotz"
  },
  {
    id: "3",
    image: require('../../assets/DoortoDoor.jpg'),
    title: "Door to Door",
    Author: "Edward Humes"
  },
]

class RecentlyViewed extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    //console.log('Props: ',props.recentlyviewed[0].blog_title)
  }

  state = {
    data: [],
    loading: true
  }

  //componentWillReceiveProps(){
  //  if (this.props.recentlyviewed.length > 0) {

  //this.setState({data: this.props.data})
  //console.log('Props: ',this.props.recentlyviewed.length)
  //  }
  //}



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
      <View style={styles.screen}>
        <TopicTitle topictitle="Recently Viewed" />
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.recentlyviewed}
          renderItem={({ item }) =>
            <TitleandAuthor image={item.blog_image} title={item.blog_title} author={item.user.name} />
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
    right: 0
  },
  TextBold: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingBottom: 10
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 20
  },
  item: {
    width: (screenWidth * 45) / 100,
    height: (screenHeight * 35) / 100,
    alignSelf: 'center'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10
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

export default RecentlyViewed;