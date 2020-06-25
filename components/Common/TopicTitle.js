import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class TopicTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        loading: true
    }

    /* componentWillReceiveProps(){
      if (this.props.recentlyviewed.length > 0) {
  
      this.setState({data: this.props.data})
      console.log('Props: ',this.props.recentlyviewed.length)
      }
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
            <View style={styles.flexwithdir}>
                <View style={styles.flex}>
                    <Text style={styles.TextBold}>{this.props.topictitle}</Text>
                </View>
                <View style={styles.flex}>
                    <TouchableOpacity
                        style={styles.ButtonStyle}
                        activeOpacity={0.5}
                        onPress={this.login}
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