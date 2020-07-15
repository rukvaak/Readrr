import React from 'react'
const axios = require('axios');
import {Text,View,StyleSheet, Alert,Dimensions,Image,AsyncStorage,Linking} from "react-native";

const ipconfig = require('../Services/config');

export default class ApiService extends React.Component {
  constructor() {
      super();

  }

   URL =ipconfig.ipConfig.ipaddress+":3002/";

  signUpUsers(user){
      var config = {
          headers:{
              "Content-Type":"application/json"
          }
      }

     
      return axios.post(this.URL+"users",user,config);
  }

}