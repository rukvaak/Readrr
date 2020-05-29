import React from 'react';
import { StyleSheet,View,ImageBackground,Platform} from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Button,Text,Container} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
export default class  LoginScreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
    super(props);
  }
  
  state = {
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
  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
        return(
         
      
            <View style={styles.screen}> 
 <LinearGradient
          colors={['#0037A5', '#720B98', '#192f6a']}
          style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
              <ImageBackground source={require('../assets/sign-page.png')} style={styles.background} imageStyle={{
      resizeMode: 'contain' // works only here!
    }}>
                <View style={{flex:0.85}}>

                </View>
              <View style ={styles.buttons}>
        <Button style ={ styles.signbuttons} onPress={()=>this.props.navigation.navigate('Signin') }>
          <Text>
            Sign in
          </Text >
        </Button>
        <Button style ={styles.signbutton}onPress={()=>this.props.navigation.navigate('Signup') }>
          <Text>
            Sign up
          </Text>
        </Button>
      </View>
      <View style={{flex:0.1}}>
      </View>
                   </ImageBackground>
                  </LinearGradient>
            </View>
         
        );
    }
  }



const styles = StyleSheet.create({
    screen: {
    flex:1,

    },
background:{
    
  width: '100%', // applied to Image
  height: '100%' ,
  paddingTop: Platform.OS === 'ios' ? 60 : 0,
},
buttons:{
    flex:.2,
    justifyContent:'space-around',
    flexDirection:'column',
    alignItems:'center',
    

},
        signbuttons:{
            backgroundColor:'rgb(217,0,210)',
          justifyContent:'center',
            width:"70%",
            borderRadius:18,
          
        },
        signbutton:{
        backgroundColor:'rgb(116,0,217)',
        justifyContent:'center',
        width:"70%",
        borderRadius:18,
       
        }

});