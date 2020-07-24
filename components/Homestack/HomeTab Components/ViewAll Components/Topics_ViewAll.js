import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, Text } from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { default as TitleandAuthor } from '../../../Common/TitleandAuthor';
import { default as ImageComponent } from '../../../Common/ImageComponent';
import { default as RatingComponent } from '../../../Common/Rating';

import * as RootNavigation from '../../../../RootNavigation.js';

import { getRequest } from '../../../../Services/data-service';
import { connect } from 'react-redux';
const ipconfig = require('../../../../Services/config');;
let actionPayload;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class Topics_Viewall extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    state = {
        loading: true,
        data: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.TopicBlogsData) {
            //console.log('TopicBlogsDataAAAAAAAAAAAAAAAAAAAAAAAA', nextProps.data.TopicBlogsData)
            this.setState({
                data: nextProps.data.TopicBlogsData
            })
        }

    }

    componentWillMount() {
        var body = {};
        var routename;
        if (this.props.route.params.topictitle === "TopicBlogs") {
            body["event"] = "TopicBlogs";
            body["topic_id"] = this.props.route.params.topic_id;
            routename = 'blogs';
        } 
        actionPayload = {
            route: routename,
            body: body,
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
    }

    renderItem({ item, index }) {
        if (this.props.route.params.topictitle === "TopicBlogs") {
                return (
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => RootNavigation.navigate('Blogpage', { blog_id: item._id })}>
                        <View style={styles.item}>
                            <ImageComponent image={item.blog_image} />
                            <TitleandAuthor title={item.blog_title} author={item.blog_author} />
                        </View>
                    </TouchableOpacity>
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
        onRequestUpdate: () => dispatch(getRequest(actionPayload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topics_Viewall);