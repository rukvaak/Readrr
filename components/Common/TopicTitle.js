import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

import * as RootNavigation from '../../RootNavigation.js';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class TopicTitle extends React.Component {
    constructor(props) {
        super(props);
        this.rendernavigation = this.rendernavigation.bind(this);
    }

    state = {
        data: [],
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

    rendernavigation(){
        // const navigation = ;
        if (this.props.topictitle === "Our Picks") {
            RootNavigation.navigate('HomePage_Viewall', {topictitle: this.props.topictitle});
        } else if (this.props.topictitle === "Most Popular") {
            RootNavigation.navigate('HomePage_Viewall', {topictitle: this.props.topictitle});
        } else if (this.props.topictitle === "Topics") {
            RootNavigation.navigate('HomePage_Viewall', {topictitle: this.props.topictitle});
        } else if (this.props.topictitle === "Recently Added") {
            RootNavigation.navigate('HomePage_Viewall', {topictitle: this.props.topictitle});
        } else if (this.props.topictitle === "Follow Authors") {
            RootNavigation.navigate('HomePage_Viewall', {topictitle: this.props.topictitle});
        } else if (this.props.topictitle === "You May Like") {
            RootNavigation.navigate('HomePage_Viewall', {topictitle: this.props.topictitle});
        }
        
    }


    render() {
        return (
            <View style={styles.flexwithdir}>
                <View style={styles.flex}>
                    <Text style={styles.TextBold}>{this.props.topictitle}</Text>
                </View>
                <View style={styles.flex}>
                    <TouchableOpacity
                        style={styles.ButtonStyle}
                        activeOpacity={0.5}
                        onPress={this.rendernavigation}
                    >
                        <Text style={styles.ButtonText}>View All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    flexwithdir: {
        flex: 1,
        flexDirection: 'row'
    },
    TextBold: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingBottom: 10
    },
    ButtonStyle: {
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 0,
        alignSelf: 'flex-end',
        marginHorizontal: 10
    },
    ButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        color: 'blue',
        textDecorationLine: 'underline'
    }
}
);

export default TopicTitle;