import React, { Component } from 'react';
import { StyleSheet,ImageBackground,AsyncStorage,FlatList,ToastAndroid} from 'react-native';
import * as Font from 'expo-font';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Item, Input, Button,Text, View ,CheckBox,ListItem,Body,AppLoading} from 'native-base';
export default class  LanguageScreen extends React.Component{
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  }
    constructor(props){
      super(props);   
      this.renderCategories = this.renderCategories.bind(this);  
    }
    state = {
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
    renderCategories(){
      this.props.navigation.navigate('Categories');
    }
    render(){
      if (this.state.loading) {
        return (
          <View></View>
        );
      }

      
          return(
              <View style={styles.screen}>
                     <ImageBackground source={require('../../assets/lang.png')} style={styles.background}/>
                         <Text style = {styles.select}>Please Choose your language</Text>
                      <Grid style= {{flex:0.80}}>
                        <Col >
                     <Button style = {styles.opt}onPress={this.renderCategories}><Text>English</Text></Button>
                     <Button style = {styles.opt}><Text>Hindi</Text></Button>
                     </Col>
                     <Col>
                     <Button style = {styles.opt}><Text>Kannada</Text></Button>
                     <Button style = {styles.opt}><Text>TELUGU</Text></Button>
                     </Col>
                   </Grid>
              </View>
          );
      }
    }


    const styles = StyleSheet.create({
        screen: {
        flex:1,
        backgroundColor:'#ffff'
        },
        background:{
            width:'100%',
            height:'100%',
            flex:0.60,
        },
        select:{
          color:"black",
          fontSize:20,
          fontWeight:'500',
          textAlign:'center',
          margin:20
          

        },
        opt:{
            justifyContent:'center',
             backgroundColor:'#7b0682',
             width:"70%",
             marginLeft:"12%",
             borderRadius:24,
             marginTop:"3%",
             margin:20
            },
});
