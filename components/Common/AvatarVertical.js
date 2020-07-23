import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Image, Avatar, ListItem, FlatList,Divider } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

const { width: screenWidth } = Dimensions.get('window');


class AvatarVertical extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    //console.log('props: ', props)
  }

  state = {
    data: {},
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

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <Grid style={styles.screen}>
        <Col style={{justifyContent: 'center'}}>
          <Avatar rounded size='large' source={{ uri: this.props.author.user_profile_pic }} />
        </Col>
        <Col style={{justifyContent: 'center'}}>
          <Text style={styles.title}>
            {this.props.author.user_name}
          </Text>
        </Col>

        <Col style={{justifyContent: 'center'}}>
        <TouchableOpacity
            style={styles.ButtonStyle}
            activeOpacity={0.5}
            onPress={this.login}
          >
            <Text style={styles.ButtonText}>
              Follow
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
    fontSize: 18,
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

export default AvatarVertical;
