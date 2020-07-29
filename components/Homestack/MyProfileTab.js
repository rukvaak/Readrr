import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Icon, Card, ListItem } from 'react-native-elements';
import * as Font from 'expo-font';
import ViewMoreText from 'react-native-view-more-text';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { default as MostPopular } from '../Homestack/HomeTab Components/MostPopular';
import { default as ImageComponent } from '../Common/ImageComponent';
import { default as RatingComponent } from '../Common/Rating';

import * as RootNavigation from '../../RootNavigation.js';

import { getRequest } from '../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        myprofile: [],
        reviews: [],
        following: [],
        followers: [],
        mywritings: [],
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.myProfileData) {
            // console.log('blogggggggggggggggggggggg:', nextProps.data.myProfileData[0].following.length)
            this.setState({
                myprofile: nextProps.data.myProfileData,
                reviews: nextProps.data.myProfileData[0].reviews,
                following: nextProps.data.myProfileData[0].following,
                followers: nextProps.data.myProfileData[0].followers,
                loading: false
            })
        } else if (nextProps.data.myProfileBlogData) {
            console.log('blogggggggggggggggggggggg:', nextProps.data.myProfileBlogData.length)
            this.setState({
                mywritings: nextProps.data.myProfileBlogData,
                loading: false
            })
        }
    }

    componentWillMount() {
        var body = {};
        body["event"] = "myProfileData"
        actionPayload = {
            route: 'updateuserinfo',
            body: body,
            token: this.props.token //token is mandatory
        }
        this.props.onRequestUpdate();

        body = {};
        body["event"] = "myProfileBlogData"
        actionPayload = {
            route: 'blogs',
            body: body,
            token: this.props.token //token is mandatory
        }
        this.props.onRequestBlogDataUpdate();
    }

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

    render() {
        if (this.state.loading) {
            return (
                <View></View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    {
                        this.state.myprofile.map((l, i) => (
                            <ListItem
                                key={i}
                                rightAvatar={{ source: { uri: l.profile_pic }, size: 'xlarge', showAccessory: false }}
                                title={l.name}
                                titleStyle={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
                                subtitle={l.bio}
                                subtitleStyle={{ textAlign: 'center' }}
                                bottomDivider={true}
                            />
                        ))
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View>
                            <Text style={styles.text}>
                                21
                    </Text>
                            <Text style={styles.text}>
                                Books
                    </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                {this.state.reviews.length}
                            </Text>
                            <Text style={styles.text}>
                                Reviews
                    </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                21
                    </Text>
                            <Text style={styles.text}>
                                Total Views
                    </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                {this.state.following.length}
                            </Text>
                            <Text style={styles.text}>
                                Following
                    </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                {this.state.followers.length}
                            </Text>
                            <Text style={styles.text}>
                                Followers
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.textinner}>
                        My Writings
                    </Text>

                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.mywritings}
                        renderItem={({ item }) =>
                            <TouchableOpacity activeOpacity={0.5}
                                onPress={() => RootNavigation.navigate('Blogpage', { blog_id: item._id })}>
                                <View style={styles.item}>
                                    <ImageComponent image={item.blog_image} />
                                    <Text style={styles.blogtitle}>
                                        {item.blog_title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />

                    <Text style={styles.textinner}>
                        Reviews
                    </Text>

                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.reviews}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Card containerStyle={styles.viewreview}>
                                <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'bold', textAlign: 'justify' }}>
                                    {item.Reviewer}
                                </Text>
                                <ViewMoreText
                                    numberOfLines={5}
                                    renderViewMore={this.renderViewMore}
                                    renderViewLess={this.renderViewLess}
                                    textStyle={{ textAlign: 'justify' }}
                                >
                                    <Text style={{ color: 'gray', fontSize: 18, textAlign: 'justify' }}>
                                        {item.review}
                                    </Text>
                                </ViewMoreText>
                                <RatingComponent rating={item.rating} />
                            </Card>
                        }
                    />
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
    blogtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    text: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    heading: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold',
        marginVertical: 10
    },
    item: {
        width: (screenWidth * 45) / 100,
        height: (screenHeight * 35) / 100,
    },
    textinner: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'auto',
        paddingTop: 10,
        paddingLeft: 15
    },
    viewreview: {
        top: 0,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        flexWrap: 'wrap',
        width: screenWidth * 0.8
    },
    viewmore: {
        color: '#0066ff',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        textAlign: 'right'
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
        onRequestUpdate: () => dispatch(getRequest(actionPayload)),
        onRequestBlogDataUpdate: () => dispatch(getRequest(actionPayload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfile);