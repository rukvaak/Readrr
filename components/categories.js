
import React, { Component } from 'react';
import { Card,CardItem} from 'native-base';
import {StyleSheet,AsyncStorage,ToastAndroid,FlatList,ImageBackground,View,Text} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import { Col, Row, Grid } from "react-native-easy-grid";
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import * as SecureStore from 'expo-secure-store';
import {getRequest} from '../Services/data-service';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
let actionPayload;
 class CategoriesPage extends React.Component{
    static navigationOptions = {
        title: 'Choose your Interest',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      };
    constructor(props){
        super(props);
       this.renderItem = this.renderItem.bind(this);
    }
    state={
        "categories":[],
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data){
            this.setState({
                "categories":nextProps.data
            })
        }
        

    }
    componentWillMount(){
        actionPayload={
            route:'categories',
            token :this.props.token //token is mandatory
           }
           this.props.onRequestUpdate();
    }

    onCheck(item, i){
        let items = this.state.categories;
        items[i].checked = items[i].checked ? ! items[i].checked : true
        this.setState({categories:items})
  
      }
   
    renderItem({ item, index }) {
        let checked;
        return (
           <View style={{borderWidth: 5, borderColor: "#ffffff",borderLeftColor:"#ffffff",overflow: 'hidden',borderRadius:20}}>
 <ImageBackground source={{uri: 'http://192.168.1.149:3002?url='+item.category_image}} style={{height: 200, width: 175, flex: 1}}>
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
  onPress={()=>this.onCheck(item,index)}
  containerStyle={{position: "absolute", bottom: 0, left: 0,color:"#ffffff"}}
/>
 </ImageBackground>
           </View>    
         
        );
      }

    render(){

        return(
            <FlatList 
            numColumns={2}                  // set number of columns 
            columnWrapperStyle={style.row}  // space them out evenly
            
            data={this.state.categories}
            keyExtractor={(item, index) => item._id }
            renderItem={this.renderItem }
        />
        )

    }

}
const style = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: "space-around"
    },
    innerText:{
        color:'white',
        fontSize: 20,
         justifyContent: 'center',
         alignItems: 'center',
         textAlign:'center',
         backgroundColor:'rgba(52, 52, 52, 0.5)',
     
      },
})

const mapStateToProps = (state, props) => {
	return {
		store :state.store,
		loading: true,
        data:state.items,
        token:state.token
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
) (CategoriesPage);