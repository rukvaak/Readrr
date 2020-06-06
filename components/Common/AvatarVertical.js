import React from 'react';
import { Dimensions,StyleSheet,View,ScrollView,TouchableOpacity} from 'react-native';
import { Card, Image, Avatar, ListItem, FlatList } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Text} from 'native-base';

const { width: screenWidth } = Dimensions.get('window');

const Data=[
  {
    id:"1",
    image:require('../../assets/MichaelRosen.jpg'),
    Author: "Michael Rosen"
  },
  {
    id:"2",
    image:require('../../assets/MarcusBerkmann.jpg'),
    Author: "Marcus Berkmann"
  },
  {
    id:"3",
    image:require('../../assets/DeliaOwens.jpg'),
    Author: "Delia Owens"
  },
  {
    id:"4",
    image:require('../../assets/StassiSchroeder.jpg'),
    Author: "Stassi Schroeder"
  },
  {
    id:"1",
    image:require('../../assets/MichaelRosen.jpg'),
    Author: "Michael Rosen"
  },
  {
    id:"2",
    image:require('../../assets/MarcusBerkmann.jpg'),
    Author: "Marcus Berkmann"
  },
  {
    id:"3",
    image:require('../../assets/DeliaOwens.jpg'),
    Author: "Delia Owens"
  },
  {
    id:"4",
    image:require('../../assets/StassiSchroeder.jpg'),
    Author: "Stassi Schroeder"
  }
]

class AvatarVertical  extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
    super(props);
  }
  
  state = {
    data: {},
    loading: true
  }

  componentWillReceiveProps(){
    this.setState({data: this.props.data})
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
              <Text style={styles.TextBold}>Top Authors</Text>
              <View>
                {
                  Data.map((l, i) => (
                    <ListItem
                      key={i}
                      leftAvatar={{ source: l.image }}
                      title={l.Author}
                      bottomDivider
                      rightElement={
                        <TouchableOpacity
                              style={styles.ButtonStyle}
                              activeOpacity={0.5}
                              onPress={this.login}
                              >
                              <Text style={styles.ButtonText}>
                                Follow
                              </Text>
                            </TouchableOpacity>
                      }
                    />
                  ))
                }
              </View>

            </View>

         
        );
    }
  }



const styles = StyleSheet.create({
screen: {
    flex:1,
    flexDirection: 'column',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
},
TextBold:{
  fontSize:20,
  fontWeight:"bold",
  paddingLeft:20
},
title: {
    paddingTop: 10, 
    fontSize: 16, 
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
},
ButtonStyle: {
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#5abd8c',
  borderWidth: 0,
  alignSelf: 'center',
  borderRadius: 20,
  width: 100,
  height: 30
},
ButtonText:{
  fontSize:18,
  fontWeight:"bold",
  textAlign: 'center',
  color: '#ffffff'
},
}
);

export default AvatarVertical;
