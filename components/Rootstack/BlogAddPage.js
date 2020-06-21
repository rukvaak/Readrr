import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, ImageBackground, FlatList, Button,Picker } from 'react-native';
import { Card, Image, Avatar, ListItem, Icon, Divider } from 'react-native-elements';
import * as Font from 'expo-font';
//import {Picker} from 'expo';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Form, Item, Input, Label } from 'native-base';
import ValidationComponent from 'react-native-form-validator';
import ViewMoreText from 'react-native-view-more-text';
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { getRequest } from '../../Services/data-service';
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

import RatingComponent from '../Common/Rating';
import AvatarVertical from '../Common/AvatarVertical';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const { SlideInMenu } = renderers;

const Data = [
  {
    id: "2",
    image: require('../../assets/LilyAllen.jpg'),
    Author: "Lily Allen"
  }
]

const Reviews = [
  {
    id: "1",
    Reviewer: "Vanessa",
    review: 'As far as celebrity memoirs go you really get your moneys worth here. I believe if your going to write a tell all memoir you might as well tell the truth and nothing but the truth and this is what Lily Allen does. Her life is a series of big fuck ups and she owns them all, she is a straight shooter and doesn’t mess about with anything that tries to sell a pretty picture. You get real. There is much to feel sad for Lily and she wears all her vulnerabilities on her sleeve it’s hard to feel any criticism. She’s brave and her story adds to the narrative of empowering women to speak up and not feel ashamed. Taking back the power from men, the fakes, the users and the media who have taken so much from her already. Standing up to the haters and owning her story. Gotta love a woman strong enough to do that.'
  },
  {
    id: "2",
    Reviewer: "Monica ",
    review: "Not my usual read. Thought this was going to be more of a gossipy celebrity memoir but Lily Allen tells a very personal story. Especially enjoyed hearing about how she wrote her first song and she has some worthwhile things to say about the way women are treated in our society, not just the music industry. I didn't exactly warm to Lily but I've enjoyed her music over the years and I applaud her refusal to shut the fuck up and be the good little woman."
  },
  {
    id: "3",
    Reviewer: "Becky",
    review: "This book is depressing. Whilst I can't help but admit I buy into the culture of celebrity. As a teen I liked Lily, I bought her first single, queued at New Look to buy her clothing range, I watched her BBC3 show, her show about LucyinDisguise... I switched off when she began taking politics into her own. I think the book is quite sad, and you're not able to compartmentalise the content as that of some complete stranger, you'll end up empathising. Imagine it's a stranger and you might feel differently. Lily doesn't realise how good she's had it, but has always had a penchant for looking at the glass half empty. Stories of a private school and not fitting in, being in a house alone eating pasta, her celebrity stepfather stepping in and being the hero (call Childline!), her first foray into music because of her last name (then yes hard work), her happy marriage she tarnished because she had to be the breadwinner and leave home (Idontgetit). Nothing ever is her fault somehow, and it gets tiring. By the time the strange story of the Calais debacle rolls around and then describing herself going over, high on pills, to physically attack her ex-husband over his new relationship (after everything she had professed?) - I was done, it was toecurling. Morose as it was, other than the loss of a child and a crazed stalker, this book should be about how lucky and fortunate someone has been. Lily's had success, Lily has had a beautiful family and loving Husband. Lily was the last of the pre-digital generation of artists that could muster a label to rent a house in the Cotswolds, kit out her home with a studio and to fly her abroad for music video shoots, helicopter into Glastonbury, grandiose, a Fleetwood Mac lifestyle to someone that happened to someone too young to really appreciate it. I felt like Lily is a lost soul, someone that can never be happy (This can also be me). Live in the moment, appreciate what you have girl."
  }
]

const actions = [
  {
    text: "Read",
    icon: <Icon name="local_library" color='gray' size={25} />,
    name: "ReadBlog",
    position: 1
  }
];

class BlogAddPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    this.rendernavigation = this.rendernavigation.bind(this);
    this.SelectCategories = this.SelectCategories.bind(this);
    this.renderImageSelector = this.renderImageSelector.bind(this);
    this.onImageSelectorClicked = this.onImageSelectorClicked.bind(this);
    this.useLibraryHandler = this.useLibraryHandler.bind(this);
    this.insertImage = this.insertImage.bind(this);
  }

  state = {
    data: Data,
    reviews: Reviews,
    titleinput: '',
    "categories": [],
    categoryinput: '',
    imagepickerbool: false,
    preinsertimage: require('../../assets/CreatePlus.jpg'),
    postinsertimage: '',
    pickerResult: '',
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.categories) {
      let categoriesinput = [];
      nextProps.data.categories.forEach(element => {
        var obj = {};
        obj["label"] = element.category_name;
        obj["value"] = element._id;
        categoriesinput.push(obj);
      });
      this.setState({
        "categories": categoriesinput
      })
      //console.log("Categories: ", categoriesinput)
    }


  }
  componentWillMount() {
    actionPayload = {
      route: 'categories',
      token: this.props.token //token is mandatory
    }
    this.props.onRequestUpdate();
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
        pickerResult:result
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

  renderViewMore(onPress) {
    return (
      <Text style={styles.viewmore} onPress={onPress}>{"Read more >"} </Text>
    )
  }

  renderViewLess(onPress) {
    return (
      <Text style={styles.viewmore} onPress={onPress}>{"Show less >"}</Text>
    )
  }

  _handleTextReady = () => {
    // ...
  }

  rendernavigation() {
    //console.log("categoryinput",this.state.categoryinput)
    this.props.navigation.navigate('PostEditor', {  BlogTitle: this.state.titleinput,
                                                    BlogCategory: this.state.categoryinput,
                                                    BlogImage: this.state.postinsertimage,
                                                    BlogDescription: this.state.descriptioninput
    });
  }

  SelectCategories(value) {
    this.setState({ categoryinput: value })
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
                <Form style={{paddingBottom: 10}}>
                  <Item floatingLabel last style={{borderColor: 'transparent' ,borderBottomColor: '#000000'}}>
                    <Label style={{textAlignVertical: 'center', color: '#000000'}}>Blog Title</Label>
                    <Input ref="title" onChangeText={(titleinput) => this.setState({ titleinput })} value={this.state.titleinput}/>
                  </Item>
                  {/* {!this.state.validate && this.isFieldInError('title') && this.getErrorsInField('title').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter The Title"}</Text>)} */}
                </Form>
              }
                containerStyle={{ backgroundColor: '#e6e367', borderWidth: 0.5, shadowOpacity: 1, borderColor: 'gray' }}
              >
                  <Label style={{textAlignVertical: 'center', color: '#000000', fontSize: 14}}>Select Category</Label>
                <Picker
                  mode="dropdown"
                  //style={{ width: 120 }}
                  selectedValue={this.state.categoryinput}
                  onValueChange={itemValue => this.SelectCategories(itemValue)}
                  style={{borderColor: '#000000'}}
                >
                  {this.state.categories.map((item, index) => {
                    return <Picker.Item key={index} value={item.value} label={item.label} />
                  })}
                </Picker>
              </Card>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textphoto}>
                Add Photo
                  </Text>
              <TouchableOpacity onPress={() => this.useLibraryHandler()}>
                <View style={styles.item}>
                  { this.state.imagepickerbool ?
                    <Image style={styles.image}
                    containerStyle={styles.imageContainer}
                    source={{uri: this.state.postinsertimage}}
                  /> :
                  <Image style={styles.image}
                    containerStyle={styles.imageContainer}
                    source={this.state.preinsertimage}
                  />}
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textinner}>
                Description
                </Text>
              <Card containerStyle={styles.card}>
                <Form style={styles.form}>
                  <Item last rounded style={styles.user}>
                    <Input ref="description" onChangeText={(descriptioninput) => this.setState({ descriptioninput })} value={this.state.descriptioninput} placeholder="Enter the Description" placeholderTextColor="white" style={{ color: 'white' }} />
                  </Item>
                  {/* {!this.state.validate && this.isFieldInError('description') && this.getErrorsInField('description').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter The Description"}</Text>)} */}
                </Form>
              </Card>
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
    width: (screenWidth * 45) / 100,
    height: (screenHeight * 35) / 100,
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
    onRequestUpdate: () => dispatch(getRequest(actionPayload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogAddPage);
