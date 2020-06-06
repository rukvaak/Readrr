import React from 'react';
import { Dimensions,StyleSheet,View,FlatList,ScrollView} from 'react-native';
import { Card, Image, Rating } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Button,Text} from 'native-base';

import { default as ProgressBar} from '../Common/ProgressBar';

const { width: screenWidth } = Dimensions.get('window');

const Data=[
  {
    id:"1",
    image:require('../../assets/EmileZola.jpg'),
    title: "The Disappearance of Emile Zola",
    Author: "Michael Rosen"
  },
  {
    id:"2",
    image:require('../../assets/Fatherhood.jpg'),
    title: "FatherHood: The Truth",
    Author: "Marcus Berkmann"
  },
  {
    id:"3",
    image:require('../../assets/Time-Travellers.jpg'),
    title: "The Time-Travellers Handbook",
    Author: "Lottie Stride"
  },
]

class Reading extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
    super(props);
  }
  
  state = {
    data: {},
    loading: true
  }

  componentWillReceiveProps(){
    this.setState({data: this.props.data})
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
        return(
            <View style={styles.screen}>
              <Text>{"\n"}</Text>
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={Data}
                renderItem={({item})=>
                    <View style={styles.item}>
                      <Image style={styles.image} containerStyle={styles.imageContainer} source={item.image}/> 
                      <Text style={styles.title}>
                      {item.title } 
                      {/* {this.state.data.title} */}
                      </Text>
                      <Text style={styles.subtitle}>
                      {"By "+item.Author } 
                      {/* {this.state.data.title} */}
                      </Text>
                    </View>       
                }
              />

            </View>

         
        );
    }
  }



const styles = StyleSheet.create({
screen: {
    flex:1,
    flexDirection: 'column',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
},
TextBold:{
  fontSize:20,
  fontWeight:"bold",
  paddingLeft:20
},
imageContainer: {
  flex: 1,
  marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  borderRadius: 20
},
item: {
  width: screenWidth - 180,
  height: screenWidth
},
image:{
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

export default Reading;
