import React, { Component } from 'react';
import { StyleSheet, ImageBackground, AsyncStorage, FlatList, ToastAndroid, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Item, Input, Button, ListItem, Body, AppLoading } from 'native-base';
import { getRequest } from '../../Services/data-service';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
let actionPayload;

class LanguageScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  }
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  }
  state = {
    loading: true,
    "languages": [],
    selectedlanguage: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.languages) {
      this.setState({
        "languages": nextProps.data.languages
      })
    }


  }
  componentWillMount() {
    actionPayload = {
      route: 'languages',
      body: {},
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
  
  renderCategories() {
    if (this.state.selectedlanguage.length > 0) {
      this.props.navigation.navigate('Categories', {selectedlanguage: this.state.selectedlanguage});
    } else {
      ToastAndroid.show('Please select atleast one language', ToastAndroid.LONG);
    }
  }

  onCheck(item, i) {
    let items = this.state.languages;
    items[i].checked = items[i].checked ? !items[i].checked : true
    this.setState({ languages: items })
    if (items[i].checked){
      this.state.selectedlanguage.push(items[i]._id)
    } else {
      this.state.selectedlanguage.splice(this.state.selectedlanguage.indexOf(items[i]._id), 1)
    }
  }

  renderItem({ item, index }) {
    let checked;
    return (
        <CheckBox
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor="white"
          title={item.language_name}
          uncheckedColor="white"
          checked={item.checked}
          size={25}
          color="#ffffff"
          textStyle={styles.innerText}
          onPress={() => this.onCheck(item, index)}
          containerStyle={styles.langbutton}
        />
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1 }}>
          <ImageBackground source={require('../../assets/lang.png')} style={styles.background} />
          <Text style={styles.select}>Please Choose your language</Text>
          <Grid style={{ flex: 0.4 }}>
            <Row>
            <Col >
              <FlatList
                numColumns={2}                  // set number of columns 
                columnWrapperStyle={styles.row}  // space them out evenly
                data={this.state.languages}
                keyExtractor={(item, index) => item._id}
                renderItem={this.renderItem}
              />
            </Col>
            </Row>
            <Row style={styles.submitrow}>
            <Button style={styles.button} onPress={this.renderCategories}><Text style={styles.innerText}>SUBMIT</Text></Button>
            </Row>
          </Grid>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  row: {
    justifyContent: "space-around"
  },
  submitrow: { 
    justifyContent: 'center'
  },
  innerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center', 
    alignSelf: 'center'
  },
  langbutton: {
    borderWidth: 5,
    borderColor: "#ffffff",
    overflow: 'hidden',
    borderRadius: 20,
    margin: 5,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#7b0682'
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#7b0682',
    width: "50%",
    borderRadius: 24
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 0.60,
  },
  select: {
    color: "black",
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold'
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageScreen);
