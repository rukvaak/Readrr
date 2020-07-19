import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Image, Rating } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text } from 'native-base';

import { default as TopicTitle } from '../../Common/TopicTitle';
import { default as TitleandAuthor } from '../../Common/TitleandAuthor';
import { default as ImageComponent } from '../../Common/ImageComponent';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class YouMayLike extends React.Component {
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

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <View style={styles.screen}>
        <TopicTitle topictitle="You May Like" />
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.you_may_like}
          renderItem={({ item }) =>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.rendernavigation}
            >
              <View style={styles.item}>
                <ImageComponent image={item.blog_image} />
                <TitleandAuthor title={item.blog_title} author={item.blog_author} />
              </View>
            </TouchableOpacity>
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
  },
  ButtonStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 0,
    alignSelf: 'flex-end',
    marginHorizontal: 10
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline'
  },
}
);

export default YouMayLike;