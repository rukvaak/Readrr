import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import { Card, Image, Avatar, ListItem, Icon, Divider } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Form, Item, Input, Label } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { postRequest } from '../../Services/data-service';
let actionPayload;
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const moment = require('moment');

const { SlideInMenu } = renderers;

const showToastWithGravity = () => {
  ToastAndroid.showWithGravity(
    "QUOTE SAVED SUCCESSFULLY",
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM
  );
};

class QuoteAddpage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    this.rendernavigation = this.rendernavigation.bind(this);
    this.renderImageSelector = this.renderImageSelector.bind(this);
    this.onImageSelectorClicked = this.onImageSelectorClicked.bind(this);
    this.useLibraryHandler = this.useLibraryHandler.bind(this);
    this.insertImage = this.insertImage.bind(this);
  }

  state = {
    titleinput: '',
    imagepickerbool: false,
    preinsertimage: require('../../assets/CreatePlus.jpg'),
    postinsertimage: '',
    pickerResult: '',
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      console.log("Recieved data")
      showToastWithGravity();
      this.props.navigation.navigate('Homestack');
    }   
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })

    this.props.navigation.setOptions({
      title: this.state.titleinput,
      /* headerRight: () => <Button
      onPress={() => this.rendernavigation()}
      title="SAVE"
      color="#000000"
    /> */
    })
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



  rendernavigation() {

    var body = {};
        body['quote_title'] = this.state.titleinput
        body['quote_image'] = this.state.postinsertimage
        body['created_on'] = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

        actionPayload = {
            route: 'quotes',
            data: body,
            token: this.props.token,
            image: true
          }
          this.props.onRequestUpdate();

    //this.props.navigation.navigate('CreatePostQuotePage');
  }


  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <ImageBackground style={styles.imagebackground} source={require('../../assets/Blogpagebackground.png')}>
            <View /* style={{paddingTop: 20}} */>
              <Card title={
                <Form style={{ paddingBottom: 10 }}>
                  <Item floatingLabel last style={{ borderColor: 'transparent', borderBottomColor: '#000000' }}>
                    <Label style={{ textAlignVertical: 'center', color: '#000000' }}>Quote Title</Label>
                    <Input ref="title" onChangeText={(titleinput) => this.setState({ titleinput })} value={this.state.titleinput} />
                  </Item>
                  {/* {!this.state.validate && this.isFieldInError('title') && this.getErrorsInField('title').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter The Title"}</Text>)} */}
                </Form>
              }
                containerStyle={{ backgroundColor: '#e6e367', borderWidth: 0.5, shadowOpacity: 1, borderColor: 'gray' }}
              >
              </Card>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textphoto}>
                Add Photo
              </Text>
              <TouchableOpacity onPress={() => this.useLibraryHandler()}>
                <View style={styles.item}>
                  {this.state.imagepickerbool ?
                    <Image style={styles.image}
                      containerStyle={styles.imageContainer}
                      source={{ uri: this.state.postinsertimage }}
                    /> :
                    <Image style={styles.image}
                      containerStyle={styles.imageContainer}
                      source={this.state.preinsertimage}
                    />}
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.rendernavigation()}
                style={{ borderRadius: 20, marginVertical: 20, height: 40, width: screenWidth / 2, justifyContent: 'center', backgroundColor: "#841584", alignSelf: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>PUBLISH</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  viewmore: {
    color: '#0066ff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  textmain: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: (screenWidth * 20) / 100,
    paddingTop: 15
  },
  create: {
    backgroundColor: '#424141',
    overflow: 'hidden',
    borderRadius: 20,
    width: screenWidth / 2.2,
    height: screenHeight / 3.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textinner: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'auto',
    paddingTop: 10,
    paddingLeft: 15
  },
  user: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth: 1,
    height: screenHeight / 5

  },
  textphoto: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10
  },
  dividermenu: {
    marginVertical: 0,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  Divider: {
    backgroundColor: 'black',
    height: 2,
    marginHorizontal: screenWidth * 0.4,
    margin: 5
  },
  TextBold: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20
  },
  card: {
    top: 0,
    backgroundColor: '#817cb7',
    borderRadius: 20
  },
  viewreview: {
    top: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    flexWrap: 'wrap',
    width: screenWidth * 0.8
  },
  title: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  ButtonStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#5abd8c',
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 20,
    width: 100,
    height: 30
  },
  menuOptionText: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#ffffff'
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 20
  },
  item: {
    width: (screenWidth * 95) / 100,
    height: (screenHeight * 50) / 100,
    alignSelf: 'center'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',
    borderRadius: 10,
    alignSelf: 'center'
  },
  imagebackground: {
    flex: 1,
    resizeMode: "cover"
  }
}
);

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
    onRequestUpdate: () => dispatch(postRequest(actionPayload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteAddpage);
