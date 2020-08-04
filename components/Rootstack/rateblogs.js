import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { Text, Form, Item, Input, Label } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import * as RootNavigation from '../../RootNavigation.js';

import { postRequest } from '../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class RateBlogs extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }
    constructor(props) {
        super(props);
    }

    state = {
        data: {},
        rating: 2.5,
        review: '',
        blog_story: this.props.route.params.blog_story,
        _id: this.props.route.params._id,
        loading: true
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.RatingAndReview) {
           // console.log('checking rating and review: ', nextProps.data.RatingAndReview)
          //("Recieved data")
          this.showToastWithGravity();
          RootNavigation.navigate('Homestack');
        }   
      }
      
      showToastWithGravity(){
        ToastAndroid.showWithGravity(
          "THANK YOU FOR THE REVIEW. HOPE YOU LIKE THE OTHER BLOGS TOO!!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      };

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        this.setState({ loading: false })
    }

      rendernavigation(){
        var routename;
        if (this.state.blog_story) {
            routename = 'blogs'
        } else {
            routename = 'stories'
        }
        var body = {};
        body["event"] = "RatingAndReview"
        body["_id"] = this.state._id
        body["rating"] = this.state.rating
        body['review'] = this.state.review
        actionPayload = {
          route: routename,
          data: body,
          token: this.props.token //token is mandatory
        }
        this.props.onRequestPostUpdate();

      }

    render() {
        if (this.state.loading) {
            return (
                <View></View>
            );
        }
        const { search } = this.state;
        return (
            <View style={styles.screen}>
                <Text style={styles.textinner}>
                    Rating
                </Text>
                <Rating
                    ratingCount={5}
                    defaultRating={0}
                    //startingValue={this.props.rating}
                    imageSize={50}
                    readonly={false}
                    fractions={1}
                    ratingBackgroundColor='#5abd8c'
                    ratingColor='#5abd8c'
                    onFinishRating={(rating) => this.setState({ rating })}
                    style={{ justifyContent: 'flex-start', justifyContent: 'center', alignSelf: 'center' }}
                />

                <Text style={styles.textinner}>
                    Review
                </Text>
                <Card containerStyle={styles.card}>
                    <Form style={styles.form}>
                        <Item last rounded style={styles.user}>
                            <Input ref="review" placeholder="Give your reviews here"
                                onChangeText={(review) => this.setState({ review })}
                                value={this.state.review}
                                placeholderTextColor="#ffffff" />
                        </Item>
                        {/* {!this.state.validate && this.isFieldInError('review') && this.getErrorsInField('review').map(errorMessage => <Text style={{ textAlign: "center", flex: 1, color: "red" }}>{"Please Enter The Review"}</Text>)} */}
                    </Form>
                </Card>
                <TouchableOpacity
                    onPress={() => this.rendernavigation()}
                    style={{ borderRadius: 20, marginVertical: 20, height: 40, width: screenWidth / 2, justifyContent: 'center', backgroundColor: "#841584", alignSelf: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>RATE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => RootNavigation.navigate('Homestack')}
                    style={{ borderRadius: 20, marginVertical: 5, height: 40, width: screenWidth / 2, justifyContent: 'center', backgroundColor: "#841584", alignSelf: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>SKIP</Text>
                </TouchableOpacity>
            </View>


        );
    }
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
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
    card: {
        top: 0,
        backgroundColor: '#a9b0ac',
        borderRadius: 20
    },
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
        onRequestPostUpdate: () => dispatch(postRequest(actionPayload))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RateBlogs);
