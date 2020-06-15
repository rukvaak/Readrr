import React, { Component } from 'react';
import { StyleSheet,ImageBackground,AsyncStorage,KeyboardAvoidingView,ToastAndroid} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button,Text, View ,CheckBox,ListItem,Body,AppLoading} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ValidationComponent from 'react-native-form-validator';
import  ApiService from '../../Services/apiservice';
export default class  SignupScreen extends  ValidationComponent{
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
      this.state = {name:"",fullname:"",email:"",pass:"", checked:false,errorMessage:""};
      
    }

    state = {
      loading: true,
      validate:false
    }
    onePressed() {

      this.setState({ checked: !this.state.checked });
   
  
      
  }
  register(){
   var validated = this.validate({
      name: {required: true},
      email: {required:true,email:true},
      pass:{required:true}
    });
    this.setState({validate:validated})
    console.log(validated);
    let user = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.pass
    }
    if(validated){
      let api = new ApiService();
      api.signUpUsers(user).then(result=>{
        console.log(result.data);
        ToastAndroid.show("open login page to use your credentials", ToastAndroid.SHORT);
        if(result.data.message){
          this.setState({
            errorMessage:result.data.message
          })
        }
        else{
          this.setState({
            errorMessage:""
          })
        }
      })
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
                      Sign Up
                    </Text>
                  </Col>
                  <Col size={6}>
                  </Col>
                </Grid>
              </View>
              <View style={{flex:0.2}}>

              </View>
                  <Content style = {styles.content}>
                      <Form style = {styles.form}> 
                          <Item last rounded style = {styles.inputfield}>
                           <Icon name="user" size ={30}/>
                           <Input  ref="name" onChangeText={(name) => this.setState({"name":name})} value={this.state.name}  placeholder="Enter the Username"  placeholderTextColor="grey" value={this.state.name}/>
                          </Item>
                          {!this.state.validate && this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage =><Text style={{textAlign:"center",flex:1,color:"red"}}>{"Please Enter Name"}</Text>) }
                          <Item last rounded style = {styles.inputfield}>
                              <Icon name = "envelope" size = {30}/>
                              <Input ref="email" onChangeText={(email) => this.setState({"email":email})} value={this.state.email}  placeholder="Enter the Email"  placeholderTextColor="grey"  value={this.state.email} />
                          </Item>
                          {!this.state.validate && this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={{textAlign:"center",flex:1,color:"red"}}>{errorMessage.includes("mandatory")?"Please Enter Email":"Please Enter valid Email Address"}</Text>) }
                          <Item last rounded style = {styles.inputfield}>
                              <Icon name = "lock" size = {40} />
                              <Input ref="pass" secureTextEntry={true} onChangeText={(pass) => this.setState({"pass":pass})} value={this.state.pass} placeholder="Enter the Passwrod"  placeholderTextColor="grey"   value={this.state.pass} />
                          </Item>
                          {!this.state.validate && this.isFieldInError('pass') && this.getErrorsInField('pass').map(errorMessage => <Text style={{textAlign:"center",flex:1,color:"red"}}>{"Please Enter Password"}</Text>) }
                          <View style={{ flexDirection: 'row' ,margin:20}}>
          <CheckBox checked={this.state.checked} 
            onPress={this.onePressed.bind(this)} rounded/>
          <Text style={{textAlign:'center'}}>Please sign me up to the latest book news and exclusives</Text>
        </View>
        <View>
       {<Text style={{textAlign:"center",flex:1,color:"red"}}>{this.state.errorMessage}</Text>}
        </View>
         
                          <Button style = {styles.submit} onPress={this.register.bind(this)}>
                              <Text>Create Account </Text>
                          </Button>
                          <Text style = {styles.or} >Or</Text>
                          <View style = {styles.social}>
                              <Icon name = "instagram" size = {40} color = "#231F20"  style={styles.icon}/>
                              <Icon name="facebook" size={40} color="#4267b2" style={styles.icon} />
                              <Icon name="google" size={40} color="#38A1F3" style={styles.icon}/>
                          </View>
                      </Form>
                  </Content>
                  <Text style = {{textAlign:'center'}}>By signing in,creating an account,you agree to our Terms of use and our privacy policy</Text>
          </Container>
          
          );
      }
     
    }
  const styles = StyleSheet.create({
    social:{
        justifyContent:'center',   
        flexDirection:'row',
        marginTop:"3%",
      },
      or:{ 
        textAlign:'center',
        marginTop:"5%",
    
      },
      user:{
       
       
      },
      submit:{
        justifyContent:'center',
         backgroundColor:'#7b0682',
         margin:20,
         flex:1,
         flexDirection:"row",
         borderRadius:24,
        },
        body:{
            flexDirection:'row', 
            justifyContent:'space-between',
          },
           inputfield:{
            marginTop:"3%",
            justifyContent:'center',
            marginTop:"3%",
            shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 2,
            borderWidth: 1,

          },
          signin:{
            fontSize:30,
            justifyContent:'center',
            alignItems:'center',
            textAlign:'center',
          },
          form:{
            justifyContent:'space-around',
           
          },
          content:{
            flex:1,
           },
           header:{
            backgroundColor:'rgb(115,0,217)'
          },
          icon:{
            margin:10
          }
  });
