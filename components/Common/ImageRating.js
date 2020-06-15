import React from 'react';
import { Dimensions,StyleSheet,View,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import { Card, Image, Rating } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Button,Text} from 'native-base';

import { StackActions, NavigationActions } from 'react-navigation';
/* const resetAction = StackActions.reset({
     index: 1, 
     key: null,
     actions: [
          NavigationActions.navigate({ routeName: 'Blogpage' })
     ],
}); */


const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'Homepage' })]
});
const goToBlogpage = NavigationActions.navigate({
  routeName: 'Blogpage'
});


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

class ImageRating extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
    super(props);
    this.rendernavigation = this.rendernavigation.bind(this);
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

  rendernavigation(){
    /* this.props.props.navigation.dispatch(resetAction); */
    /* this.props.props.navigation.navigate('Rootstack', { screen: 'Blogpage' }); */
    /* this.props.props.navigation.dispatch(goToBlogpage); */
    this.props.props.navigation.navigate('Blogpage');
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
                  <Text style={styles.TextBold}>Most Popular</Text>
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
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.rendernavigation}
                      >
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
                          <Rating
                            type='custom'
                            ratingCount={5}
                            imageSize={20}
                            ratingBackgroundColor='#5abd8c'
                            ratingColor='#5abd8c'
                            onFinishRating={this.ratingCompleted}
                            style={{ justifyContent: 'flex-start',   justifyContent: 'center', alignSelf: 'center' }}
                          />
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
},
}
);

export default ImageRating;
