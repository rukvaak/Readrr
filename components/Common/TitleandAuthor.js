import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

import { default as ImageComponent } from './ImageComponent';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


class TitleandAuthor extends React.Component {
    constructor(props) {
        super(props);
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

    render() {
        return (
            <View style={styles.item}>
                <ImageComponent image={this.props.image} />
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <Text style={styles.subtitle}>
                    {"By " + this.props.author}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: (screenWidth * 45) / 100,
        height: (screenHeight * 35) / 100,
        alignSelf: 'center',
        borderRadius: 20
    },
    title: {
        fontSize: 20,
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
    }
}
);

export default TitleandAuthor;