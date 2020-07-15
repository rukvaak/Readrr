import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { Card, Image, Avatar, ListItem, Icon, Divider } from 'react-native-elements';
import * as Font from 'expo-font';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Text } from 'native-base';
import ViewMoreText from 'react-native-view-more-text';
import ActionButton from 'react-native-action-button';

import RatingComponent from '../Common/Rating';
import AvatarVertical from '../Common/AvatarVertical';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Create = [
    {
        id: "1",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Post"
    },
    {
        id: "2",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Quote"
    },
    {
        id: "2",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Stories"
    }
]

const Edit = [
    {
        id: "1",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Post",
        page: "1 Page"
    },
    {
        id: "2",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Quote",
        page: "1 Page"
    },
    {
        id: "3",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Post",
        page: "1 Page"
    },
    {
        id: "4",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Quote",
        page: "1 Page"
    },
    {
        id: "5",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Post",
        page: "1 Page"
    },
    {
        id: "6",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Quote",
        page: "1 Page"
    },
    {
        id: "7",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Post",
        page: "1 Page"
    },
    {
        id: "8",
        postdate: "19 March, 2019",
        image: require('../../assets/LilyAllen.jpg'),
        title: "Create Quote",
        page: "1 Page"
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
        this.renderEdit = this.renderEdit.bind(this);
    }

    state = {
        create: Create,
        edit: Edit,
        loading: true
    }

    componentWillReceiveProps() {
        this.setState({ data: this.props.data })
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
            this.props.navigation.navigate('Webview');
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

    renderEdit({ item, index }) {
        let checked;
        return (
            <View style={styles.edit}>
                <Text style={styles.postdate}>
                    {item.postdate}
                </Text>
                <Text style={styles.posttitle}>
                    {item.title}
                </Text>
                <Text style={styles.postdate}>
                    {item.page}
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
                    <FlatList
                        numColumns={2}                  // set number of columns 
                        columnWrapperStyle={styles.row}  // space them out evenly

                        data={this.state.edit}
                        keyExtractor={(item, index) => item._id}
                        renderItem={this.renderEdit}
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

export default CreatePostQuotePage;
