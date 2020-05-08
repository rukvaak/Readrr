import React, { Component } from 'react';
import { StyleSheet,ImageBackground,AsyncStorage,FlatList,ToastAndroid} from 'react-native';
import * as Font from 'expo-font';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Item, Input, Button,Text, View ,CheckBox,ListItem,Body,AppLoading} from 'native-base';
export default class  LanguageScreen extends React.Component{
    constructor(props){
      super(props);     
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
       
    render(){
      if (this.state.loading) {
        return (
          <View></View>
        );
      }
          return(
              <View style={styles.screen}>
                     <ImageBackground source={require('../assets/lang.png')} style={styles.background}/>
                         <Text style = {styles.select}>Please Choose your language</Text>
                      <Grid style= {{flex:0.80}}>
                        <Col>
                     <Button style = {styles.opt}><Text>English</Text></Button>
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
    
        },
        background:{
            width:'100%',
            height:'100%',
            flex:0.60,
        },
        select:{
          color:"black",
          fontSize:30,
          fontWeight:'700',
          justifyContent:'center'

        },
        opt:{
            justifyContent:'center',
             backgroundColor:'#7b0682',
             width:"70%",
             marginLeft:"12%",
             borderRadius:24,
             marginTop:"3%",
            },
});
