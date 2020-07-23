import React from 'react';
import { Dimensions,StyleSheet,View,FlatList,ScrollView} from 'react-native';
import { Card, Image, Rating, Badge } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Button,Text} from 'native-base';

import { default as ProgressBar} from '../../Common/ProgressBar';

const { width: screenWidth } = Dimensions.get('window');

const Data=[
 {
   category: "Arts & Photography",
   listarray: [
    {
      id:"1",
      image:require('../../../assets/GoodDaysStart.jpg'),
      title: "Good Days Start With Gratitude",
      Author: "Pretty Simple Press"
    },
    {
      id:"2",
      image:require('../../../assets/TheWayIHeardit.jpg'),
      title: "The Way I Heard it: True Tales",
      Author: "Mike Rowe"
    },
    {
      id:"3",
      image:require('../../../assets/TheArtOfPhotography.jpg'),
      title: "The Art Of Photography",
      Author: "Bruce Barnbaum"
    },
   ]
 },
 {
  category: "Business & Money",
  listarray: [
   {
     id:"1",
     image:require('../../../assets/HowToStartABusiness.jpg'),
     title: "How To Start A Business Without Any Money",
     Author: "Rachel Bridge"
   },
   {
     id:"2",
     image:require('../../../assets/RichDadPoorDad.jpg'),
     title: "Rich Dad Poor Dad",
     Author: "Robert T. Kiyosaki"
   },
   {
     id:"3",
     image:require('../../../assets/MoneyMasterTheGame.jpg'),
     title: "Money Master The Game",
     Author: "Tony Robbins"
   },
  ]
}
]

class Wishlist extends React.Component{
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
                <FlatList
                  pagingEnabled={true}
                  showsVerticalScrollIndicator={false}
                  data={Data}
                  renderItem={({item})=>
                    <View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Text style={styles.TextBold}>{item.category}</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Badge status='success' containerStyle={{ alignSelf:'flex-end',paddingVertical: 10}}
                              textStyle={{color: 'white', fontSize: 20}}
                            value={item.listarray.length}/>
                        </View>
                      </View>
                      <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={item.listarray}
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
  paddingVertical: 10
},
TextBold1:{
  fontSize:20,
  fontWeight:"bold",
  paddingVertical: 10,
  marginRight: 10,
  textAlign: 'right',
  color: 'turquoise'
},
imageContainer: {
  flex: 1,
  marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  borderRadius: 20
},
item: {
  width: screenWidth - 180,
  height: screenWidth,
  paddingRight: 15
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

export default Wishlist;
