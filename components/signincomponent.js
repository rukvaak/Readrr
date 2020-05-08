import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Text, View ,CheckBox,ListItem,Body,AppLoading} from 'native-base';
import {StyleSheet,AsyncStorage,ToastAndroid} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import { Col, Row, Grid } from "react-native-easy-grid";
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import  ApiService from '../Services/apiservice';
import axios from 'axios';
export default class SigninScreen extends ValidationComponent{
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };
  constructor(props){
    super(props);
    this.state = {name:"",pass:"",checked:false};
        }

  state = {
    loading: true
  }
  componentDidMount(){
    this._loadInitialState.done();
  }
  _loadInitialState = async() =>{
    var value = await AsyncStorage.getItem('user');
    if (value !== null){
      this.props.navigation.navigate('Language');
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }
      

_onPressButton() {
this.validate({
    name: {minlength:3, maxlength:7, required: true},
    pass: {minlength:3, maxlength:10, required:true },
  });
}

onePressed() {
 
    this.setState({ checked: !this.state.checked });
 

    
} 
loginto(){
  var validated = this.validate({
     name: {required: true},
     pass:{required:true}
   });
   this.setState({validate:validated})
   console.log(validated);
   let user = {
     name:this.state.name,
     password:this.state.pass
   }
   if(validated){
    fetch('http://192.168.225.238:3002/users',{
    method:'POST',
    headers:{
    "Content-Type":'application/json'
    },
    body:({ 
      name:this.state.name,
      pass:this.state.pass,
    })
    })
    .then((Response)=>Response.json())
    .then((result )=>{
      if(result.success === true){
        AsyncStorage.setItem('users',result.users);
        this.navigation.navigate('Language');
      }
      else {
        alert(result.data.message);
      }
    })
    .done();
  
     
   }
}
 render(){
      if (this.state.loading) {
        return (
          <View></View>
        );
      }
        return(
        
            <Container>
              <View style={{margin:3}}>
                <Grid>
                  <Col size={1}>
                  </Col>
                  <Col size={4}>
                    <Text style={{fontSize:30,fontWeight:"bold"}}>
                      Sign In
                    </Text>
                  </Col>
                  <Col size={6}>
                  </Col>
                </Grid>
              </View>
            <Content style = {styles.content}>
              <Form style = {styles.form}>
                <Item last rounded style = {styles.user}>
                    <Icon name="user" size={30} color="black" />
                <Input ref="name" onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder="Enter the Username"  placeholderTextColor="grey"/>
                  
                </Item>
                {!this.state.validate && this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage =><Text style={{textAlign:"center",flex:1,color:"red"}}>{"Please Enter The Name"}</Text>) }
                <Item last rounded style = {styles.pass}>
                <Icon name="lock" size={30} color="#900" />
                  <Input ref="pass" onChangeText={(pass) => this.setState({pass})} value={this.state.pass}   placeholder="Enter the Password"  placeholderTextColor="grey" />
                </Item>
                {!this.state.validate && this.isFieldInError('pass') && this.getErrorsInField('pass').map(errorMessage => <Text style={{textAlign:"center",flex:1,color:"red"}}>{"Please Enter The Password"}</Text>) }
                <View style={{ flexDirection: 'row' ,margin:20}}>
          <CheckBox checked={this.state.checked} 
            style={{ marginRight: 20 }}
            onPress={this.onePressed.bind(this)} rounded/>
          <Text>Remember me</Text>
        </View>
        {<Text style={{textAlign:"center",flex:1,color:"red"}}>{this.state.errorMessage}</Text>}
                <Button  style = {styles.submit} onPress={this.loginto.bind(this)} ><Text>SIGN in & continue</Text></Button>
              </Form>
              <Text style = {styles.or}>OR</Text>

              <View style = {styles.social}>
              <Icon name="instagram" size={40} color="#231F20"  style={styles.icon}/>
              <Icon name="facebook" size={40} color="#4267b2" style={styles.icon}/>
              <Icon name="google" size={40} color="#38A1F3" style={styles.icon}/>
              </View>
            </Content>
            <Text style = {{textAlign:'center'}}>by signing in,creating an account,you agree to our Terms of use and our privacy policy</Text>
          </Container>
        );
    }

}

const styles = StyleSheet.create({
header:{
  backgroundColor:'rgb(116,0,217)'
},
content:{
  flex:1,
 },
form:{
  justifyContent:'space-around',
  marginTop:"25%",
},
icon:{
  margin:10
},
signin:{
  fontSize:30,
  textAlign:'center',
},
user:{
  marginTop:"3%",
  shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
  borderWidth: 1,
 
},
pass:{
   shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
borderWidth: 1,
  marginTop:"3%"
},
body:{
  flexDirection:'row', 
  justifyContent:'space-between',
},
submit:{
  justifyContent:'center',
   backgroundColor:'#7b0682',
   margin:20,
   flex:1,
   flexDirection:"row",
   borderRadius:24,
  },
or:{ 
  textAlign:'center',
  marginTop:"5%"
},
social:{
  justifyContent:'center',   
  flexDirection:'row',
  marginTop:"3%",
},


});