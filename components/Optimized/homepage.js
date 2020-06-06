import React,{Component} from 'react';
import {
  Text, 
  View,
  ImageBackground,
  SafeAreaView,StyleSheet } from 'react-native';

import Grid from 'react-native-grid-component';
export default class Category extends Component{
  constructor(props){
    super(props);
  }

  list = [
    {
      image: require('../assets/avatar.jpg'),
      title: 'Arts and photography'
    },
    {
      image: require('../assets/home.jpg'),
      title: 'Biography and memory'
    },
    {
      image: require('../assets/homeicon.jpg'),
      title: 'Buisness and money'
    },
    {
      image: require('../assets/icon.png'),
      title: 'Computer and Tech'
    },
    {
      image: require('../assets/splash.png'),
      title: 'Comics and graphics'
    },
    {
      image: require('../assets/YouMayLike.jpg'),
      title: 'Childrens play'
    }
  ];

  _renderItem = (data, i) => (
    <View style = {styles.item} key={i}>
      <ImageBackground source={data.image} style = {styles.background}>
        <Text style = {styles.catname} >{data.title}</Text>
      </ImageBackground>
    </View>

  );
  _renderPlaceholder = i => <View style={styles.item} key={i} />;

  render(){
    return(
      <View style = {styles.screen}>
        <Text style = {styles.header} >Choose Your Interest</Text>
        <Grid
          style={styles.list}
          renderItem={this._renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data={this.list}
          numColumns={2}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  header:{
    fontSize:30,
  textAlign:'left',
    margin:'5%',
    fontWeight: 'bold'
  },
  screen:{
    flex:1,
  },
  catname:{
    fontSize:17,
    textAlign:'center',
    color:'white',
    fontWeight:'200'
  },
  item: {
    flex: 1,
    height: 200,
    margin: 2
  },
  background:{
  width:"100%",
  height:"100%",
  textAlign:'center',
  }
  });

