import React, { Component } from 'react';
import { StyleSheet, ImageBackground, AsyncStorage, KeyboardAvoidingView, ToastAndroid, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Image, Avatar } from 'react-native-elements';
import { Container, Header, Content, Form, Item, Input, Button, Text, View, CheckBox, ListItem, Body, AppLoading } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ValidationComponent from 'react-native-form-validator';
import ApiService from '../../Services/apiservice';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class SignupScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = { name: "", fullname: "", email: "", pass: "", checked: false, errorMessage: "" };
    this.renderImageSelector = this.renderImageSelector.bind(this);
    this.onImageSelectorClicked = this.onImageSelectorClicked.bind(this);
    this.useLibraryHandler = this.useLibraryHandler.bind(this);
    this.insertImage = this.insertImage.bind(this);

  }

  state = {
    loading: true,
    validate: false,
    imagepickerbool: false,
    postinsertimage: '',
    pickerResult: ''
  }
  onePressed() {

    this.setState({ checked: !this.state.checked });



  }
  register() {
    var validated = this.validate({
      name: { required: true },
      email: { required: true, email: true },
      pass: { required: true }
    });
    this.setState({ validate: validated })
    console.log(validated);
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.pass,
      isAdmin: false,
      profile_pic: this.state.postinsertimage
    }
    if (validated) {
      let api = new ApiService();
      api.signUpUsers(user).then(result => {
        console.log(result.data);
        if (result.data.message) {
          this.setState({
            errorMessage: result.data.message
          })
        }
        else {
          this.setState({
            errorMessage: ""
          })
          ToastAndroid.show("Registration successful. Welcome to Readrr Family.", ToastAndroid.LONG);
          this.props.navigation.navigate('Signin');
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

  renderImageSelector() {
    return (
      <Menu renderer={SlideInMenu} onSelect={this.onImageSelectorClicked}>
        <MenuTrigger>
          <MaterialCommunityIcons name="image" size={28} color="#737373" />
        </MenuTrigger>
        <MenuOptions>
          <View style={styles.dividermenu} />
          <MenuOption value={1} >
            <Text style={styles.menuOptionText}>
              Photo Library
            </Text>
          </MenuOption>
          <View style={styles.dividermenu} />
          <MenuOption value={2}>
            <Text style={styles.menuOptionText}>
              Cancel
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );

  }

  onImageSelectorClicked = (value) => {
    if (value == 1) {
      this.useLibraryHandler();
    }

  }

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      //aspect: [4,3],
      base64: true,
      quality: 0.5
    });
    if (!result.cancelled) {
      this.setState({
        pickerResult: result
      });

      this.insertImage(result.uri);

    }

  };

  insertImage(url) {

    //console.log("Local Url: ", this.state.pickerResult)
    this.setState({ imagepickerbool: true })
    let imageUri = this.state.pickerResult ? `data:image/jpg;base64,${this.state.pickerResult.base64}` : null;


    this.setState({ postinsertimage: imageUri })
  }

  askPermissionsAsync = async () => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    this.setState({
      hasCameraPermission: camera.status === 'granted',
      hasCameraRollPermission: cameraRoll.status === 'granted'
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (

      <Container>
        <View>
          <Text style={{ fontSize: 30, fontWeight: "bold", margin: 10 }}>
            Sign Up
          </Text>
        </View>

        <Content style={styles.content}>
          <Form style={styles.form}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={styles.textphoto}>
                Add Photo
              </Text>
              {this.state.imagepickerbool ?
                <Avatar
                  size="xlarge"
                  rounded
                  source={{ uri: this.state.postinsertimage }}
                  showEditButton
                  containerStyle={{ borderColor: 'grey', borderWidth: 5 }}
                  onPress={() => this.useLibraryHandler()}
                  activeOpacity={0.7}
                /> :
                <Avatar
                  size="xlarge"
                  rounded
                  imageProps={{ resizeMode: 'cover', width: 200, height: 200 }}
                  source={require('../../assets/CreatePlus.jpg')}
                  showEditButton
                  containerStyle={{ borderColor: 'grey', borderWidth: 5 }}
                  onPress={() => this.useLibraryHandler()}
                  activeOpacity={0.7}
                />}
            </View>
            <Item last rounded style={styles.inputfield}>
              <Icon name="user" size={30} />
              <Input ref="name" onChangeText={(name) => this.setState({ "name": name })} value={this.state.name} placeholder="Enter the Username" placeholderTextColor="grey" value={this.state.name} />
            </Item>
            {!this.state.validate && this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter Name"}</Text>)}
            <Item last rounded style={styles.inputfield}>
              <Icon name="envelope" size={30} />
              <Input ref="email" onChangeText={(email) => this.setState({ "email": email })} value={this.state.email} placeholder="Enter the Email" placeholderTextColor="grey" value={this.state.email} />
            </Item>
            {!this.state.validate && this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{errorMessage.includes("mandatory") ? "Please Enter Email" : "Please Enter valid Email Address"}</Text>)}
            <Item last rounded style={styles.inputfield}>
              <Icon name="lock" size={40} />
              <Input ref="pass" secureTextEntry={true} onChangeText={(pass) => this.setState({ "pass": pass })} value={this.state.pass} placeholder="Enter the Passwrod" placeholderTextColor="grey" value={this.state.pass} />
            </Item>
            {!this.state.validate && this.isFieldInError('pass') && this.getErrorsInField('pass').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter Password"}</Text>)}
            <View style={{ flexDirection: 'row', margin: 20 }}>
              <CheckBox checked={this.state.checked}
                onPress={this.onePressed.bind(this)} rounded />
              <Text style={{ textAlign: 'center' }}>Please sign me up to the latest book news and exclusives</Text>
            </View>
            <View>
              {<Text style={{ textAlign: "center", flex: 1, color: "red" }}>{this.state.errorMessage}</Text>}
            </View>

            <Button style={styles.submit} onPress={this.register.bind(this)}>
              <Text>Create Account </Text>
            </Button>
            <Text style={styles.or} >Or</Text>
            <View style={styles.social}>
              <Icon name="instagram" size={40} color="#231F20" style={styles.icon} />
              <Icon name="facebook" size={40} color="#4267b2" style={styles.icon} />
              <Icon name="google" size={40} color="#38A1F3" style={styles.icon} />
            </View>
          </Form>
        </Content>
        <Text style={{ textAlign: 'center' }}>By signing in,creating an account,you agree to our Terms of use and our privacy policy</Text>
      </Container>

    );
  }

}
const styles = StyleSheet.create({
  social: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: "3%",
  },
  or: {
    textAlign: 'center',
    marginTop: "5%",

  },
  submit: {
    justifyContent: 'center',
    backgroundColor: '#7b0682',
    margin: 20,
    flex: 1,
    flexDirection: "row",
    borderRadius: 24,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputfield: {
    marginTop: "3%",
    justifyContent: 'center',
    marginTop: "3%",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth: 1,
  },
  textphoto: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10
  },
  signin: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  form: {
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgb(115,0,217)'
  },
  icon: {
    margin: 10
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',
    borderRadius: 10,
    alignSelf: 'center'
  },
});
