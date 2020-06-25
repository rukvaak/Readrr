import React from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class ImageComponent extends React.Component {
    constructor(props) {
        super(props);
        //console.log('Props image:' , props)
    }

    state = {
        data: {},
        loading: true
    }

    /* componentWillReceiveProps() {
        this.setState({ data: this.props.data })
    } */

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
            //<View style={styles.item}>
            <Image style={styles.image}
                containerStyle={styles.imageContainer}
                source={{ uri: this.props.image }}
                PlaceholderContent={<ActivityIndicator />}
            />
            //</View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        borderRadius: 20
    },
    item: {
        width: (screenWidth * 45) / 100,
        height: (screenHeight * 35) / 100,
        alignSelf: 'center',
        borderRadius: 20
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: 20,
        alignSelf: 'center',
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: '#ffffff'
    }
}
);

export default ImageComponent;
