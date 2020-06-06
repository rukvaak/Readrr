import React from 'react';
import { Dimensions,StyleSheet,View,FlatList,ScrollView, TouchableOpacity} from 'react-native';
import { Card, Image, Rating } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Button,Text} from 'native-base';

const { width: screenWidth } = Dimensions.get('window');

const Data=[
  {
    id:"1",
    image:require('../../assets/TheFatalTree.jpg'),
    title: "The Fatal Tree",
    Author: "Jake Arnott"
  },
  {
    id:"2",
    image:require('../../assets/DayFour.jpg'),
    title: "Day Four",
    Author: "Sarah Lotz"
  },
  {
    id:"3",
    image:require('../../assets/DoortoDoor.jpg'),
    title: "Door to Door",
    Author: "Edward Humes"
  },
]

class RecentlyViewed extends React.Component{
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
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.TextBold}>Recently Viewed</Text>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={styles.ButtonStyle}
                    activeOpacity={0.5}
                    onPress={this.login}
                  >
                    <Text style={styles.ButtonText}>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  paddingLeft:20,
  paddingBottom: 10
},
imageContainer: {
  flex: 1,
  marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  borderRadius: 20
},
item: {
  width: screenWidth - 180,
  height: screenWidth - 120
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
},
ButtonStyle: {
  justifyContent: 'center',
  textAlign: 'center',
  borderWidth: 0,
  alignSelf: 'flex-end',
  marginHorizontal: 10
},
ButtonText:{
  fontSize:18,
  fontWeight:"bold",
  textAlign: 'center',
  color: 'blue',
  textDecorationLine: 'underline'
}
}
);

export default RecentlyViewed;
