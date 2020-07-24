import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { Card, Image, Avatar, ListItem, Icon, Divider } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Text } from 'native-base';

import { getRequest } from '../../Services/data-service';
import { connect } from 'react-redux';
const ipconfig = require('../../Services/config');;
let actionPayload;

const moment = require('moment');

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Create = [
    {
        id: "1",
        title: "Create Blogs"
    },
    {
        id: "2",
        title: "Create Quote"
    },
    {
        id: "2",
        title: "Create Stories"
    }
]

class CreatePostQuotePage extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }
    constructor(props) {
        super(props);
        this.rendernavigation = this.rendernavigation.bind(this);
        this.renderCreate = this.renderCreate.bind(this);
        this.renderBlogsEdit = this.renderBlogsEdit.bind(this);
    }

    state = {
        create: Create,
        editblogs: {},
        editquotes: {},
        loading: true
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.MyBlogsData) {
            console.log('MyBlogsDataAAAAAAAAAAAAAAAAAAAAAAAA', nextProps.data.MyBlogsData)
            this.setState({
                editblogs: nextProps.data.MyBlogsData
            })
        } else if (nextProps.data.MyQuotesData) {
            console.log('MyBlogsDataAAAAAAAAAAAAAAAAAAAAAAAA', nextProps.data.MyQuotesData)
            this.setState({
                editquotes: nextProps.data.MyQuotesData
            })
        }

    }

    componentWillMount() {
        var body = {};
        var routename;
            body["event"] = "MyBlogs";
            routename = 'blogs';
        actionPayload = {
            route: routename,
            body: body,
            token: this.props.token //token is mandatory
        }
        this.props.onRequestUpdate();

        body = {};
        body["event"] = "MyQuotes";
            routename = 'quotes';
        actionPayload = {
            route: routename,
            body: body,
            token: this.props.token //token is mandatory
        }
        this.props.onRequestQuotesUpdate();
    }


    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        this.setState({ loading: false })
    }

    rendernavigation(item, index) {
        if (index === 0){
            this.props.navigation.navigate('BlogAddpage');
        }
        else if (index === 1){
            this.props.navigation.navigate('QuoteAddpage');
        } 
        else if (index === 2){
            this.props.navigation.navigate('QuoteAddpage');
        }       
    }

    renderCreate({ item, index }) {
        let checked;
        return (
            <TouchableOpacity onPress={()=>this.rendernavigation(item,index)}>
            <View style={styles.create}>
                <MaterialIcons name="add" color='#ffffff' size={60}></MaterialIcons>
                <Text style={styles.innerText}>
                    {item.title}
                </Text>
            </View>
            </TouchableOpacity>
        );
    }

    renderBlogsEdit({ item, index }) {
        let checked;
        return (
            <TouchableOpacity activeOpacity={0.5}
                        onPress={() => this.props.navigation.navigate('Blogpage', { blog_id: item._id })}>
            <View style={styles.edit}>
                <Text style={styles.postdate}>
                    {moment(item.created_on).format("DD MMMM,YYYY")}
                </Text>
                <Text style={styles.posttitle}>
                    {item.blog_title}
                </Text>
                <Text style={styles.postdate}>
                    {}
                </Text>
            </View>
            </TouchableOpacity>

        );
    }

    renderQuotesEdit({ item, index }) {
        let checked;
        return (
            <View style={styles.edit}>
                <Text style={styles.postdate}>
                    {moment(item.created_on).format("DD MMMM,YYYY")}
                </Text>
                <Text style={styles.posttitle}>
                    {item.quote_title}
                </Text>
                <Text style={styles.postdate}>
                    {}
                </Text>
            </View>

        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View></View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <FlatList
                        numColumns={3}                  // set number of columns 
                        columnWrapperStyle={styles.row}  // space them out evenly

                        data={this.state.create}
                        keyExtractor={(item, index) => item._id}
                        renderItem={this.renderCreate}
                    />
                    <Text style={styles.sectionheading}>
                        My Blogs
                    </Text>
                    <FlatList
                        numColumns={2}                  // set number of columns 
                        columnWrapperStyle={styles.row}  // space them out evenly

                        data={this.state.editblogs}
                        keyExtractor={(item, index) => item._id}
                        renderItem={this.renderBlogsEdit}
                    />
                    <Text style={styles.sectionheading}>
                        My Quotes
                    </Text>
                    <FlatList
                        numColumns={2}                  // set number of columns 
                        columnWrapperStyle={styles.row}  // space them out evenly

                        data={this.state.editquotes}
                        keyExtractor={(item, index) => item._id}
                        renderItem={this.renderQuotesEdit}
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
    row: {
        justifyContent: "space-around",
        paddingTop: 10
    },
    innerText: {
        color: 'white',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold'

    },
    sectionheading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: "space-around",
        textAlign: 'center',
        marginTop: 10

    },
    posttitle: {
        color: 'black',
        fontSize: 22,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    postdate: {
        color: 'gray',
        fontSize: 16,
        textAlignVertical: 'bottom',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    create: {
        backgroundColor: '#424141',
        overflow: 'hidden',
        borderRadius: 20,
        width: screenWidth / 3.5,
        height: screenHeight / 8,
        justifyContent: 'center',
        alignItems: 'center'

    },
    edit: {
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        overflow: 'hidden',
        borderRadius: 20,
        width: screenWidth / 2.5,
        height: screenHeight / 6,
        justifyContent: 'space-between'
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
        onRequestQuotesUpdate: () => dispatch(getRequest(actionPayload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePostQuotePage);
