import React, { Component } from 'react';
import { View, StyleSheet, Keyboard
, TouchableWithoutFeedback, Text, Dimensions
, KeyboardAvoidingView, Platform, Button, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { postRequest } from '../../Services/data-service';
import  CNRichTextEditor , { CNToolbar , getDefaultStyles, convertToObject,getInitialObject, convertToHtmlString } from "react-native-cn-richtext-editor";
import {
    Menu,
    MenuOptions, 
    MenuOption,
    MenuTrigger,
    MenuContext,
    MenuProvider,
    renderers
  } from 'react-native-popup-menu';

let actionPayload;

const moment = require('moment');

const { SlideInMenu } = renderers;

const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
const defaultStyles = getDefaultStyles();

const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "BLOG SAVED SUCCESSFULLY",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };

class PostEditor extends React.Component {

    constructor(props) {
        super(props);
        this.customStyles = {...defaultStyles, body: {fontSize: 16}, heading : {fontSize: 16}
        , title : {fontSize: 20}, ol : {fontSize: 16 }, ul: {fontSize: 16}, bold: {fontSize: 16, fontWeight: 'bold', color: 'black'}
        };  
        this.state = {
            BlogTitle: props.route.params.BlogTitle,
            BlogCategory: props.route.params.BlogCategory,
            BlogLanguage: props.route.params.BlogLanguage,
            BlogDescription: props.route.params.BlogDescription,
            BlogImage: props.route.params.BlogImage,
            BlogContent: '',
            selectedTag : 'body',
            selectedColor : 'default',
            selectedHighlight: 'default',
            colors : ['red', 'green', 'blue'],
            highlights:['yellow_hl','pink_hl', 'orange_hl', 'green_hl','purple_hl','blue_hl'],
            selectedStyles : [],
            // value: [getInitialObject()] get empty editor
            //value: convertToObject('<div><p style="text-align:justify"><span></span></p></div>', this.customStyles),
            value: [getInitialObject()],
            pickerResult:""
        };
        this.rendernavigation=this.rendernavigation.bind(this);
        this.editor = null;

    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: this.state.BlogTitle,
            headerRight: () => <Button
            onPress={() => this.rendernavigation()}
            title="SAVE"
            color="#000000"
          />
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
          console.log("Recieved data")
          showToastWithGravity();
          this.props.navigation.navigate('Homestack');
        }   
      }

    rendernavigation() {
       // console.log("Value: ", this.state.value)
        var finalvalue = this.state.value;
        
        //console.log("Final Blog Content: ",this.state.BlogContent)
        var body = {};
        body['blog_title'] = this.state.BlogTitle
        body['blog_image'] = this.state.BlogImage
        body['blog_text'] = this.state.BlogDescription
        body['category_id'] = this.state.BlogCategory.trim()
        body['language_id'] = this.state.BlogLanguage.trim()
        body['blog_content'] = convertToHtmlString(finalvalue)
        body['created_on'] = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

        actionPayload = {
            route: 'blogs',
            data: body,
            token: this.props.token,
            image: true
          }
          this.props.onRequestUpdate();
        //this.props.navigation.navigate('Homestack');
      }

    onStyleKeyPress = (toolType) => {
        
        if (toolType == 'image') {
            return;
        }
        else {
            this.editor.applyToolbar(toolType);
        }

    }

    onSelectedTagChanged = (tag) => {

        this.setState({
            selectedTag: tag
        })
    }

    onSelectedStyleChanged = (styles) => { 
        const colors = this.state.colors;  
        const highlights = this.state.highlights;  
        let sel = styles.filter(x=> colors.indexOf(x) >= 0);

        let hl = styles.filter(x=> highlights.indexOf(x) >= 0);
        this.setState({
            selectedStyles: styles,
            selectedColor : (sel.length > 0) ? sel[sel.length - 1] : 'default',
            selectedHighlight : (hl.length > 0) ? hl[hl.length - 1] : 'default',
        })
       
    }

    onValueChanged = (value) => {
        this.setState({
            value: value
        });
    }

     stringToUint8Array(str) {
        const length = str.length
        const array = new Uint8Array(new ArrayBuffer(length))
        for(let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
        return array
    }

    insertImage(url) {
        let imageUri = this.state.pickerResult ? `data:image/jpg;base64,${this.state.pickerResult.base64}` : null;
        this.editor.insertImage(imageUri);
    }

    askPermissionsAsync = async () => {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        this.setState({
        hasCameraPermission: camera.status === 'granted',
        hasCameraRollPermission: cameraRoll.status === 'granted'
        });
    };

    useLibraryHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        //aspect: [4, 4],
        base64: true,
        quality: 0.1
        });
        this.setState({
            pickerResult:result
          });
        
        this.insertImage(result.uri);
    };

    useCameraHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        //aspect: [4, 4],
        base64: true,
        quality: 0.1
        });
        //console.log(result);
        
        this.insertImage(result.uri);
    };

    onImageSelectorClicked = (value) => {
        if(value == 1) {
            this.useCameraHandler();    
        }
        else if(value == 2) {
            this.useLibraryHandler();         
        }
        
    }

    onColorSelectorClicked = (value) => {
        
        if(value === 'default') {
            this.editor.applyToolbar(this.state.selectedColor);
        }
        else {
            this.editor.applyToolbar(value);
           
        }

        this.setState({
            selectedColor: value
        });
    }

    onHighlightSelectorClicked = (value) => {
        if(value === 'default') {
            this.editor.applyToolbar(this.state.selectedHighlight);
        }
        else {
            this.editor.applyToolbar(value);
           
        }

        this.setState({
            selectedHighlight: value
        });
    }

    onRemoveImage = ({url, id}) => {        
        // do what you have to do after removing an image
        console.log(`image removed (url : ${url})`);
        
    }

    renderImageSelector() {
        return (
            <Menu renderer={SlideInMenu} onSelect={this.onImageSelectorClicked}>
            <MenuTrigger>
                <MaterialCommunityIcons name="image" size={28} color="#737373" />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption value={1}>
                    <Text style={styles.menuOptionText}>
                        Take Photo
                    </Text>
                </MenuOption>
                <View style={styles.divider}/>
                <MenuOption value={2} >
                    <Text style={styles.menuOptionText}>
                        Photo Library
                    </Text>
                </MenuOption> 
                <View style={styles.divider}/>
                <MenuOption value={3}>
                    <Text style={styles.menuOptionText}>
                        Cancel
                    </Text>
                </MenuOption>
            </MenuOptions>
            </Menu>
        );
    
    }

    renderColorMenuOptions = () => {

        let lst = [];

        if(defaultStyles[this.state.selectedColor]) {
             lst = this.state.colors.filter(x => x !== this.state.selectedColor);
             lst.push('default');
            lst.push(this.state.selectedColor);
        }
        else {
            lst = this.state.colors.filter(x=> true);
            lst.push('default');
        }

        return (
            
            lst.map( (item) => {
                let color = defaultStyles[item] ? defaultStyles[item].color : 'black';
                return (
                    <MenuOption value={item} key={item}>
                        <MaterialCommunityIcons name="format-color-text" color={color}
                        size={28} />
                    </MenuOption>
                );
            })
            
        );
    }

    renderHighlightMenuOptions = () => {
        let lst = [];

        if(defaultStyles[this.state.selectedHighlight]) {
             lst = this.state.highlights.filter(x => x !== this.state.selectedHighlight);
             lst.push('default');
            lst.push(this.state.selectedHighlight);
        }
        else {
            lst = this.state.highlights.filter(x=> true);
            lst.push('default');
        }
        
        

        return (
            
            lst.map( (item) => {
                let bgColor = defaultStyles[item] ? defaultStyles[item].backgroundColor : 'black';
                return (
                    <MenuOption value={item} key={item}>
                        <MaterialCommunityIcons name="marker" color={bgColor}
                        size={26} />
                    </MenuOption>
                );
            })
            
        );
    }

    renderColorSelector() {
       
        let selectedColor = '#737373';
        if(defaultStyles[this.state.selectedColor])
        {
            selectedColor = defaultStyles[this.state.selectedColor].color;
        }
        

        return (
            <Menu renderer={SlideInMenu} onSelect={this.onColorSelectorClicked}>
            <MenuTrigger>
                <MaterialCommunityIcons name="format-color-text" color={selectedColor}
                        size={28} style={{
                            top:2
                        }} />             
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                {this.renderColorMenuOptions()}
            </MenuOptions>
            </Menu>
        );
    }

    renderHighlight() {
        let selectedColor = '#737373';
        if(defaultStyles[this.state.selectedHighlight])
        { 
            selectedColor = defaultStyles[this.state.selectedHighlight].backgroundColor;
        }
        return (
            <Menu renderer={SlideInMenu} onSelect={this.onHighlightSelectorClicked}>
            <MenuTrigger>
                <MaterialCommunityIcons name="marker" color={selectedColor}
                        size={24} style={{                          
                        }} />             
            </MenuTrigger>
            <MenuOptions customStyles={highlightOptionsStyles}>
                {this.renderHighlightMenuOptions()}
            </MenuOptions>
            </Menu>
        );
    }

    render() {
        
               
        return (
            <KeyboardAvoidingView 
            behavior='padding' 
            enabled
            keyboardVerticalOffset={IS_IOS ? 0 : -500}
            style={styles.root}
            >
            <MenuProvider style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >             
                    <View style={styles.main}>
                        <CNRichTextEditor                   
                            ref={input => this.editor = input}
                            onSelectedTagChanged={this.onSelectedTagChanged}
                            onSelectedStyleChanged={this.onSelectedStyleChanged}
                            value={this.state.value}
                            style={styles.editor}
                            styleList={this.customStyles}
                            foreColor='dimgray' // optional (will override default fore-color)
                            onValueChanged={this.onValueChanged}
                            onRemoveImage={this.onRemoveImage}
                        />                        
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.toolbarContainer}>

                    <CNToolbar
                        style={{
                            height: 35,
                        }}
                        iconSetContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                        size={28} 
                        iconSet={[
                            {
                                type: 'tool',
                                iconArray: [{
                                    toolTypeText: 'bold',
                                    buttonTypes: 'style',
                                    iconComponent: <MaterialCommunityIcons name="format-bold" />
                                }, 
                                {
                                    toolTypeText: 'italic',
                                    buttonTypes: 'style',
                                    iconComponent: <MaterialCommunityIcons name="format-italic" />
                                },
                                {
                                    toolTypeText: 'underline',
                                    buttonTypes: 'style',
                                    iconComponent: <MaterialCommunityIcons name="format-underline" />
                                },
                                {
                                    toolTypeText: 'lineThrough',
                                    buttonTypes: 'style',
                                    iconComponent: <MaterialCommunityIcons name="format-strikethrough-variant" />
                                }
                            ]
                            },
                            {
                                type: 'seperator'
                            },
                            {
                                type: 'tool',
                                iconArray: [
                                    {
                                        toolTypeText: 'body',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                        <MaterialCommunityIcons name="format-text" />
                                    },
                                    {
                                        toolTypeText: 'title',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                        <MaterialCommunityIcons name="format-header-1" />
                                    },
                                    {
                                        toolTypeText: 'heading',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                        <MaterialCommunityIcons name="format-header-3" />
                                    },
                                    {
                                        toolTypeText: 'ul',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                        <MaterialCommunityIcons name="format-list-bulleted" />
                                    },
                                    {
                                        toolTypeText: 'ol',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                        <MaterialCommunityIcons name="format-list-numbered" />
                                    }
                                ]
                            },
                            {
                                type: 'seperator'
                            },
                            {
                                type: 'tool',
                                iconArray: [
                                {
                                    toolTypeText: 'image',
                                    iconComponent: this.renderImageSelector()
                                },
                                {
                                    toolTypeText: 'color',
                                    iconComponent: this.renderColorSelector()
                                },
                                {
                                    toolTypeText: 'highlight',
                                    iconComponent: this.renderHighlight()
                                }]
                            },
                            
                        ]}
                        selectedTag={this.state.selectedTag}
                        selectedStyles={this.state.selectedStyles}
                        onStyleKeyPress={this.onStyleKeyPress} 
                        backgroundColor="aliceblue" // optional (will override default backgroundColor)
                        color="gray" // optional (will override default color)
                        selectedColor='white' // optional (will override default selectedColor)
                        selectedBackgroundColor='deepskyblue' // optional (will override default selectedBackgroundColor)
                        /> 
                </View>
            </MenuProvider>
        </KeyboardAvoidingView>
        );
    }

}

var styles = StyleSheet.create({
    root: {
        flex: 1,
        /* paddingTop: 20, */
        backgroundColor:'gray',
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
    },
    main: {
        flex: 1,
        margin: 10,
       /*  paddingLeft: 30,
        paddingRight: 30, */
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    editor: { 
        backgroundColor : '#ffffff'
    },
    toolbarContainer: {
        minHeight: 35
    },
    menuOptionText: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    divider: {
        marginVertical: 0,
        marginHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: '#eee'
    }
});

const optionsStyles = {
    optionsContainer: {
      backgroundColor: 'yellow',
      padding: 0,   
      width: 40,
      marginLeft: width - 40 - 30,
      alignItems: 'flex-end',
    },
    optionsWrapper: {
      //width: 40,
      backgroundColor: 'white',
    },
    optionWrapper: {
       //backgroundColor: 'yellow',
      margin: 2,
    },
    optionTouchable: {
      underlayColor: 'gold',
      activeOpacity: 70,
    },
    // optionText: {
    //   color: 'brown',
    // },
  };

const highlightOptionsStyles = {
optionsContainer: {
    backgroundColor: 'transparent',
    padding: 0,   
    width: 40,
    marginLeft: width - 40,

    alignItems: 'flex-end',
},
optionsWrapper: {
    //width: 40,
    backgroundColor: 'white',
},
optionWrapper: {
    //backgroundColor: 'yellow',
    margin: 2,
},
optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
},
// optionText: {
//   color: 'brown',
// },
};

const mapStateToProps = (state, props) => {
    //console.log("State: ", state.items)
	return {
		store :state.store,
		loading: true,
        data:state.items,
        token:state.token
	}
}

const mapDispatchToProps = dispatch => {
    return {
    onRequestUpdate: () => dispatch(postRequest(actionPayload)),
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (PostEditor);
