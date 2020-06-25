import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, ScrollView, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Image } from 'react-native-elements';

import { default as TitleandAuthor } from './TitleandAuthor';
import { default as TopicTitle } from './TopicTitle';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Data = [
  {
    id: "1",
    title: "Graphics",
    backgroundColor: "#1c4a7e"
  },
  {
    id: "2",
    title: "Tips and Tricks",
    backgroundColor: "#c65135"
  },
  {
    id: "3",
    title: "Something",
    backgroundColor: "#1c4a7e"
  },
  {
    id: "4",
    title: "Anything",
    backgroundColor: "#c65135"
  },
]
class Topics extends React.Component {

  render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <TopicTitle topictitle="Topics" />
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={Data}
          renderItem={({ item }) =>
            <TouchableOpacity activeOpacity={0.5} onPress={this.login}>
              <Image style={styles.image, { backgroundColor: item.backgroundColor }} containerStyle={styles.imageContainer}>
                <Text
                  style={styles.ButtonText}>
                  {item.title}
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