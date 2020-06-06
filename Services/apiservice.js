import React from 'react'
const axios = require('axios');
import {Text,View,StyleSheet, Alert,Dimensions,Image,AsyncStorage,Linking} from "react-native";

export default class ApiService extends React.Component {
  constructor() {
      super();

  }

   URL ="http://192.168.225.238:3002/";

  signUpUsers(user){
      var config = {
          headers:{
              "Content-Type":"application/json"
          }
      }

     
      return axios.post(this.URL+"users",user,config);
  }

}