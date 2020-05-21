import React,{Component} from 'react';
import {
  Text, 
  View,
  ImageBackground,
  SafeAreaView,StyleSheet,Dimensions } from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import {Grid,Col,Row} from 'react-native-easy-grid';
import MultiSelect from 'react-native-multiple-select';
const data = [
    {
       bgimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faboutreact.com%2Fwp-content%2Fuploads%2F2018%2F09%2Freact_native_grid_image_gallery.png&f=1&nofb=1',
       catnames:'Arts and photography',
       key:'1',
    },
    {
        bgimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faboutreact.com%2Fwp-content%2Fuploads%2F2018%2F09%2Freact_native_grid_image_gallery.png&f=1&nofb=1',
        catnames:'Biography and memory',
        key:'2',
    },
    {
        bgimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faboutreact.com%2Fwp-content%2Fuploads%2F2018%2F09%2Freact_native_grid_image_gallery.png&f=1&nofb=1',
        catnames:'Buisness and money',
        key:'3',
    },
    {
        bgimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faboutreact.com%2Fwp-content%2Fuploads%2F2018%2F09%2Freact_native_grid_image_gallery.png&f=1&nofb=1',
        catnames:'Computer and Tech',
        key:'4',
    },
    {
        bgimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faboutreact.com%2Fwp-content%2Fuploads%2F2018%2F09%2Freact_native_grid_image_gallery.png&f=1&nofb=1',
        catnames:'Comics and graphics',
        key:'5',
    },
    {
        bgimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faboutreact.com%2Fwp-content%2Fuploads%2F2018%2F09%2Freact_native_grid_image_gallery.png&f=1&nofb=1',
        catnames:'Stories and novels',
        key:'6',
    }
];
export default class CategoriesScreen extends Component{
  _renderItem (data){
    return([
      <Row style = {styles.row}>
      <ImageBackground source={{uri:data.bgimage}} style = {styles.background}>
      <Text style = {styles.catname} > {data.catnames} </Text>
      </ImageBackground>
      </Row>  

    ]);
    };


    render(){
        return(
          <View>
            <Text style = {styles.header} >Choose Your Interest</Text>
    <FlatList 
    data = {data}
    key={data.key}
    numColumns= {2}
    renderItem={({item}) =>(
this._renderItem(item)
    )}
    />
</View>
        );
};
}






const styles = StyleSheet.create({
  screen:{
    flex:1,
    width:"100%",
    height:"100%",
    marginHorizontal:8,
  },
  catname:{
    fontSize:17,
    textAlign:'center',
    color:'white',
    fontWeight:'200',
    backgroundColor:'#4e2269'
  },
  background:{
  width:"100%",
  height:"100%",

  
  },
  row:{
    backgroundColor:'#1dc192',
    borderRadius:10,
    margin:10,
   justifyContent:'center',
  },
  header:{
    fontSize:25,
  textAlign:'center',
    margin:'5%',
    fontWeight:'400',
    backgroundColor:'#2aa0ea'
  },

    });

