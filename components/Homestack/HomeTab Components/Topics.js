import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, ScrollView, Button, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';

import { default as TitleandAuthor } from '../../Common/TitleandAuthor';
import { default as TopicTitle } from '../../Common/TopicTitle';

import * as RootNavigation from '../../../RootNavigation.js';

const ipconfig = require('../../../Services/config');


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class Topics extends React.Component {

  constructor(props) {
    super(props);
  }
  state = {
    loading: true
  }


  render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <TopicTitle topictitle="Topics" />
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.topics}
          renderItem={({ item }) =>
          <TouchableOpacity activeOpacity={0.5} 
            onPress={() => RootNavigation.navigate('Topics_ViewAll', {topictitle: 'TopicBlogs', topic_id: item._id})}>
          <View style={{ borderWidth: 5, borderColor: "#ffffff", borderLeftColor: "#ffffff", overflow: 'hidden', borderRadius: 20, marginHorizontal: 5 }}>
              <ImageBackground source={{ uri: ipconfig.ipConfig.ipaddress + ':3002?url=' + item.category_image }} style={{ height: 200, width: 175, flex: 1 }}>
                  <Text style={styles.innerText}>
                      {item.category_name}
                  </Text>
              </ImageBackground>
          </View>
      </TouchableOpacity>
          } />
      </View>
    )
  }

}
const styles = StyleSheet.create(
  {
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'contain',
      borderRadius: 10
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      borderRadius: 10,
      margin: 10
    },
    ButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      justifyContent: 'center',
      alignSelf: 'center',
      color: '#ffffff',
      padding: 30
    },
    innerText: {
      color: 'white',
      fontSize: 20,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.5)',

  },
  }
)

export default Topics;