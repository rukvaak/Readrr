import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, ScrollView, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Image } from 'react-native-elements';

import { default as TitleandAuthor } from './TitleandAuthor';
import { default as TopicTitle } from './TopicTitle';

const ipconfig = require('../../Services/config');

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
            <TouchableOpacity activeOpacity={0.5} onPress={this.login}>
              <Image style={styles.image, {backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'}} containerStyle={styles.imageContainer}>
                <Text
                  style={styles.ButtonText}>
                  {item.category_name}
                </Text>
              </Image>
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
  }
)

export default Topics;