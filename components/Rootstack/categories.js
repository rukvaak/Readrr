
import React, { Component } from 'react';
import { Card, CardItem, Button } from 'native-base';
import { StyleSheet, AsyncStorage, ToastAndroid, TouchableOpacity, FlatList, ImageBackground, View, Text } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import { Col, Row, Grid } from "react-native-easy-grid";
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import * as SecureStore from 'expo-secure-store';
import { getRequest, postRequest } from '../../Services/data-service';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
let actionPayload;
const ipconfig = require('../../Services/config');;
class CategoriesPage extends React.Component {
    static navigationOptions = {
        title: 'Choose your Interest',
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        }
    };
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.rendernavigation = this.rendernavigation.bind(this);
    }
    state = {
        "categories": [],
        selectedcategories: []

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.categories) {
            this.setState({
                "categories": nextProps.data.categories
            })
        }
        else if (nextProps.data.customer) {
            this.props.navigation.navigate('Homestack');
        }


    }
    
    componentDidMount() {
        this.props.navigation.setOptions({
          headerLeft : null,
          title: "Please select the Category",
          headerTitleStyle: {alignSelf: 'center'}
        })
      }

    componentWillMount() {
        actionPayload = {
            route: 'categories',
            data: {},
            token: this.props.token //token is mandatory
        }
        this.props.onRequestUpdate();
    }

    onCheck(item, i) {
        let items = this.state.categories;
        items[i].checked = items[i].checked ? !items[i].checked : true
        this.setState({ categories: items })
        if (items[i].checked) {
            this.state.selectedcategories.push(items[i]._id)
        } else {
            this.state.selectedcategories.splice(this.state.selectedcategories.indexOf(items[i]._id), 1)
        }

    }

    rendernavigation() {
        if (this.state.selectedcategories.length > 0) {
            actionPayload = {
                route: 'updateuserinfo',
                data: { categories: this.state.selectedcategories, languages: this.props.route.params.selectedlanguage },
                token: this.props.token //token is mandatory
            }
            this.props.onPostUpdate();
            //console.log('selected categories: ', this.state.selectedcategories);
        } else {
            ToastAndroid.show('Please select atleast one category', ToastAndroid.LONG);
        }

    }

    renderItem({ item, index }) {
        let checked;
        return (
            <View style={{ borderWidth: 5, borderColor: "#ffffff", borderLeftColor: "#ffffff", overflow: 'hidden', borderRadius: 20 }}>
                <ImageBackground source={{ uri: ipconfig.ipConfig.ipaddress + ':3002?url=' + item.category_image }} style={{ height: 200, width: 175, flex: 1 }}>
                    <Text style={style.innerText}>
                        {item.category_name}
                    </Text>
                    <CheckBox
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checkedColor="white"
                        uncheckedColor="white"
                        checked={item.checked}
                        size={25}
                        color="#ffffff"
                        onPress={() => this.onCheck(item, index)}
                        containerStyle={{ position: "absolute", bottom: 0, left: 0 }}
                    />
                </ImageBackground>
            </View>

        );
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        numColumns={2}                  // set number of columns 
                        columnWrapperStyle={style.row}  // space them out evenly

                        data={this.state.categories}
                        keyExtractor={(item, index) => item._id}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={{ marginHorizontal: 50, borderRadius: 100 }}>
                    <Button style={style.button} onPress={this.rendernavigation}><Text style={{ fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}>SUBMIT</Text></Button>
                </View>
            </View>
        )

    }

}
const style = StyleSheet.create({
    row: {
        justifyContent: "space-around"
    },
    innerText: {
        color: 'white',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',

    },
    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#7b0682',
        width: "70%",
        borderRadius: 24,
        marginTop: "3%",
        margin: 20
    },
})

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
        onPostUpdate: () => dispatch(postRequest(actionPayload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesPage);