import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, Text, ImageBackground } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Container, Content, Header, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';

import { default as TitleandAuthor } from '../../../Common/TitleandAuthor';
import { default as ImageComponent } from '../../../Common/ImageComponent';
import { default as RatingComponent } from '../../../Common/Rating';

import * as RootNavigation from '../../../../RootNavigation.js';

import { getRequest, postRequest } from '../../../../Services/data-service';
import { connect } from 'react-redux';
const ipconfig = require('../../../../Services/config');;
let actionPayload;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class HomePage_Viewall extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.postfollow = this.postfollow.bind(this);
    }

    state = {
        loading: true,
        data: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.OurPicksViewall) {
            this.setState({
                data: nextProps.data.OurPicksViewall[0].our_picks
            })
        } else if (nextProps.data.mostPopularViewall) {
            this.setState({
                data: nextProps.data.mostPopularViewall[0].most_popular
            })
        } else if (nextProps.data.topicData) {
            this.setState({
                data: nextProps.data.topicData
            })
        } else if (nextProps.data.recentlyAddedViewall) {
            this.setState({
                data: nextProps.data.recentlyAddedViewall[0].recently_added
            })
        } else if (nextProps.data.authorData) {
            this.setState({
                data: nextProps.data.authorData
            })
        } else if (nextProps.data.YouMayLikeViewAll) {
            this.setState({
                data: nextProps.data.YouMayLikeViewAll[0].you_may_like
            })
        } else if (nextProps.data.FollowUnfollowData) {
            console.log('enter once followauthors')
          var body = {};
          body["event"] = "authorList"
          actionPayload = {
            route: 'updateuserinfo',
            body: body,
            token: this.props.token //token is mandatory
          }
          this.props.onRequestUpdate();
    
        }

    }

    componentWillMount() {
        var body = {};
        var routename;
        if (this.props.route.params.topictitle === "Our Picks") {
            body["event"] = "OurPicksViewAll";
            routename = 'blogs';
        } else if (this.props.route.params.topictitle === "Most Popular") {
            body["event"] = "mostPopularViewAll";
            routename = 'blogs';
        } else if (this.props.route.params.topictitle === "Topics") {
            body["event"] = "categoryList";
            body["limit"] = 0
            routename = 'categories';
        } else if (this.props.route.params.topictitle === "Recently Added") {
            body["event"] = "recentlyAddedViewAll";
            routename = 'blogs';
        } else if (this.props.route.params.topictitle === "Follow Authors") {
            body["event"] = "authorList"
            // body["limit"] = 0
            routename = 'updateuserinfo';
        } else if (this.props.route.params.topictitle === "You May Like") {
            body["event"] = "YouMayLikeViewAll";
            routename = 'blogs';
        }
        actionPayload = {
            route: routename,
            body: body,
            token: this.props.token //token is mandatory
        }
        this.props.onRequestUpdate();
    }

    postfollow(item) {
        var body = {};
        if (item.user_followed) {
          item.user_followed = false
          body["follow_unfollow"] = false
          // console.log('inside true if', this.state.user_present)
        } else {
          item.user_followed = true
          body["follow_unfollow"] = true
          // console.log('inside false if', this.state.user_present)
        }
    
        body["event"] = "FollowUnfollowData"
        body["author_id"] = item._id
        actionPayload = {
          route: 'updateuserinfo',
          data: body,
          token: this.props.token //token is mandatory
        }
        // console.log('outside if', actionPayload.data.follow_unfollow)
        this.props.onRequestPostUpdate();
      }


    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        this.setState({ loading: false })
    }

    renderItem({ item, index }) {
        if (this.props.route.params.topictitle === "Our Picks" ||
            this.props.route.params.topictitle === "Recently Added" ||
            this.props.route.params.topictitle === "You May Like") {
            return (
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => RootNavigation.navigate('Blogpage', { blog_id: item._id })}>
                    <View style={styles.item}>
                        <ImageComponent image={item.blog_image} />
                        <TitleandAuthor title={item.blog_title} author={item.blog_author} />
                    </View>
                </TouchableOpacity>
            )
        } else if (this.props.route.params.topictitle === "Most Popular") {
            return (
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => RootNavigation.navigate('Blogpage', { blog_id: item._id })}>
                    <View style={styles.item}>
                        <ImageComponent image={item.blog_image} />
                        <TitleandAuthor title={item.blog_title} author={item.blog_author} />
                        <RatingComponent rating={item.blog_rating} />
                    </View>
                </TouchableOpacity>
            )
        } else if (this.props.route.params.topictitle === "Topics") {
            return (
                <TouchableOpacity activeOpacity={0.5} 
                    onPress={() => RootNavigation.navigate('Topics_ViewAll', {topictitle: 'TopicBlogs', topic_id: item._id})}>
                    <View style={{ borderWidth: 5, borderColor: "#ffffff", borderLeftColor: "#ffffff", overflow: 'hidden', borderRadius: 20 }}>
                        <ImageBackground source={{ uri: ipconfig.ipConfig.ipaddress + ':3002?url=' + item.category_image }} style={{ height: 200, width: 175, flex: 1 }}>
                            <Text style={styles.innerText}>
                                {item.category_name}
                            </Text>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            )
        } else if (this.props.route.params.topictitle === "Follow Authors") {
            return (
                <Card style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: screenWidth / 3 }}>
                        <Avatar rounded size='large' source={{ uri: item.profile_pic }} />
                        <View style={{ paddingTop: 10 }}>
                            <TouchableOpacity
                                style={styles.ButtonStyle}
                                activeOpacity={0.5}
                                onPress={() => this.postfollow(item)}
                            >
                                <Text style={styles.ButtonText1}>
                                    {item.user_followed ? 'Following' : 'Follow'}
                              </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title1}>
                            {item.name}
                        </Text>
                    </View>
                </Card>
            )
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <View></View>
            );
        }
        return (
            <View style={styles.screen}>
                <FlatList
                    pagingEnabled={true}
                    numColumns={2}                  // set number of columns 
                    columnWrapperStyle={styles.row}  // space them out evenly
                    data={this.state.data}
                    renderItem={this.renderItem}
                />

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
    row: {
        justifyContent: "space-around"
    },
    TextBold: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingBottom: 10
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
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'stretch',
        borderRadius: 10,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    title1: {
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: 'grey',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    ButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#ffffff',
        padding: 30
    },
    ButtonText1: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#ffffff'
    },
    innerText: {
        color: 'white',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',

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
        onRequestUpdate: () => dispatch(getRequest(actionPayload)),
        onRequestPostUpdate: () => dispatch(postRequest(actionPayload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage_Viewall);