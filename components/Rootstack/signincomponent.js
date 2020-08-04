import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, View, CheckBox, ListItem, Body, AppLoading, Left, Title, Right } from 'native-base';
import { StyleSheet, AsyncStorage, ToastAndroid } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import { Col, Row, Grid } from "react-native-easy-grid";
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import ApiService from '../../Services/apiservice';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import axios from 'axios';
import LoginScreen from './logincomponent';
import { postRequest } from '../../Services/data-service'

import { Directions } from 'react-native-gesture-handler';
import { HeaderTitle } from '@react-navigation/stack';
let actionPayload;
let token;
class SigninScreen extends ValidationComponent {
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };
  constructor(props) {
    super(props);
    this.state = { name: "Rukvaak1223@gmail.com", pass: "boson23232", checked: false };
  }

  state = {
    loading: true
  }
  // componentDidMount() {
  //   this._loadInitialState.done();
  // }
  // _loadInitialState = async () => {
  //   // var value = await AsyncStorage.getItem('user');
  //   // if (value !== null){
  //   //   this.props.navigation.navigate('Language');
  //   // }
  // }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  componentWillReceiveProps(nextProps) {
    //console.log("next" + JSON.stringify(nextProps))

    // take action here based on nextProps; 
    if (nextProps.data) {
     // console.log(nextProps.data.match)
      if (nextProps.data.match != undefined && nextProps.data.match) {
        //console.log(nextProps["data"])
        token = nextProps["data"]["token"];
        this.props.onTokenRecieved();
        this.props.navigation.navigate('Language');

      }
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown : null
    })
  }

  _onPressButton() {
    this.validate({
      name: { minlength: 3, maxlength: 7, required: true },
      pass: { minlength: 3, maxlength: 10, required: true },
    });
  }

  onePressed() {
    this.setState({ checked: !this.state.checked });

  }
  loginto() {
    var validated = this.validate({
      email: { required: true, email: true },
      pass: { required: true }
    });
    this.setState({ validate: validated })

    let user = {
      user: this.state.name,
      password: this.state.pass
    }
    if (validated) {
      actionPayload = {
        route: 'users/validate',
        data: user,
        image: false
      }
      this.props.onRequestUpdate();

    }
  }
  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <Container>
        <Content style={styles.content}>
          <Form style={styles.form}>
            <Text style={{ fontSize: 30, fontWeight: "bold", margin: '5%' }}>
              Sign In
            </Text>
            <Item last rounded style={styles.user}>
              <Icon name="user" size={30} color="black" />
              <Input ref="email" onChangeText={(name) => this.setState({ name })} value={this.state.name} placeholder="Enter the Username" placeholderTextColor="grey" />

            </Item>
            {!this.state.validate && this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter The Name"}</Text>)}
            <Item last rounded style={styles.pass}>
              <Icon name="lock" size={30} color="#900" />
              <Input ref="pass" onChangeText={(pass) => this.setState({ pass })} value={this.state.pass} placeholder="Enter the Password" placeholderTextColor="grey" />
            </Item>
            {!this.state.validate && this.isFieldInError('pass') && this.getErrorsInField('pass').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter The Password"}</Text>)}
            <View style={{ flexDirection: 'row', margin: 20 }}>
              <CheckBox checked={this.state.checked}
                style={{ marginRight: 20 }}
                onPress={this.onePressed.bind(this)} rounded />
              <Text>Remember me</Text>
            </View>
            {<Text style={{ textAlign: "center", flex: 1, color: "red" }}>{this.state.errorMessage}</Text>}
            <Button style={styles.submit} onPress={this.loginto.bind(this)} ><Text>SIGN in & continue</Text></Button>
          </Form>
          <Text style={styles.or}>OR</Text>

          <View style={styles.social}>
            <Icon name="instagram" size={40} color="#231F20" style={styles.icon} />
            <Icon name="facebook" size={40} color="#4267b2" style={styles.icon} />
            <Icon name="google" size={40} color="#38A1F3" style={styles.icon} />
          </View>
          <Text style={{ textAlign: 'center' }}>by signing in,creating an account,you agree to our Terms of use and our privacy policy</Text>
        </Content>
      </Container>

    );
  }

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgb(116,0,217)'
  },
  content: {
    flex: 1,
  },
  form: {
    marginTop: "35%",
  },
  icon: {
    margin: 10
  },
  signin: {
    fontSize: 30,
    textAlign: 'center',
  },
  user: {
    marginTop: "5%",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth: 1,

  },
  pass: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth: 1,
    marginTop: "5%"
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submit: {
    justifyContent: 'center',
    backgroundColor: '#7b0682',
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    borderRadius: 24,
  },
  or: {
    textAlign: 'center'
  },
  social: {
    justifyContent: 'center',
    flexDirection: 'row'
  },


});
const mapStateToProps = (state, props) => {
  return {
    store: state.store,
    loading: true,
    data: state.items,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestUpdate: () => dispatch(postRequest(actionPayload)),
    onTokenRecieved: () => dispatch({ type: 'TOKEN', value: token })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreen);