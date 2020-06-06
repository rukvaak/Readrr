  import React,{Component} from 'react';
import {
  Text, 
  View,
  ImageBackground,
  SafeAreaView,StyleSheet } from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Grid,Col,Row} from 'react-native-easy-grid';
import MultiSelect from 'react-native-multiple-select';
export default class CategoriesScreen extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
<View style = {styles.screen}>

<Text style = {styles.header} >Choose Your Interest</Text>
<Grid>
<Col>
<Row style = {styles.row1}>
  <ImageBackground source={require('../assets/arts.jpg')} style = {styles.background}>
<Text style = {styles.catname} >Arts and photography</Text>
</ImageBackground>
</Row>
<Row style = {styles.row2}> 
<ImageBackground source={require('../assets/biography.jpg')} style = {styles.background}>
<Text style = {styles.catname}>Biography and memory</Text>
</ImageBackground>
  </Row>  
  <Row style = {styles.row3}>
  <ImageBackground source={require('../assets/buisness.jpg')} style = {styles.background}>
  <Text style = {styles.catname}>Buisness and money</Text>
  </ImageBackground>
  </Row>
</Col>
<Col>
<Row style = {styles.row4}>
<ImageBackground source={require('../assets/computer.jpg')} style = {styles.background}>
<Text style = {styles.catname}>Computer and Tech</Text>
</ImageBackground>
</Row>
<Row style ={styles.row5}> 
<ImageBackground source={require('../assets/comics.jpg')} style = {styles.background}>
<Text style = {styles.catname}>Comics and graphics</Text>
</ImageBackground>
</Row>
<Row style = {styles.row6}>
<ImageBackground source={require('../assets/children.jpg')} style = {styles.background}>
<Text style = {styles.catname}>Childrens play</Text>
</ImageBackground>
</Row>
</Col>
  </Grid>
</View>
    );
  }
}



const styles = StyleSheet.create({
  header:{
    fontSize:25,
  textAlign:'center',
    margin:'5%',
    fontWeight:'400',
    backgroundColor:'#2aa0ea'
  },
  screen:{
    flex:1,
  },
  catname:{
    fontSize:17,
    textAlign:'center',
    color:'white',
    fontWeight:'200',
    backgroundColor:'#4e2269'
  },
  row1:{
    backgroundColor:'#1dc190',
    borderRadius:10,
    margin:10,
   justifyContent:'center'
  },
  row2:{
    backgroundColor:'blue',
    borderRadius:10,
    margin:10,
    justifyContent:'center'
  },
  row3:{
    backgroundColor:'#4e2269',
    borderRadius:10,
    margin:10,
    justifyContent:'center'
  },
  row4:{
    backgroundColor:'#ea7a2a',
    borderRadius:10,
    margin:10,
    justifyContent:'center'
  },
  row5:{
    backgroundColor:'#2aa0ea',
    borderRadius:10,
    margin:10,
    justifyContent:'center'
  },
  row6:{
    backgroundColor:'#fc0547',
    borderRadius:10,
    margin:10,
    justifyContent:'center'
  },
  background:{
  width:"100%",
  height:"100%",
  textAlign:'center',
  }
    });

