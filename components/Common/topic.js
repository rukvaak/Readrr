import React from 'react';
import { Dimensions,StyleSheet, Text, View,FlatList,ScrollView, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Image } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const Data=[
    {
      id:"1",
      title:"Graphics",
      backgroundColor: "#1c4a7e"
    },
    {
      id:"2",
      title:"Tips and Tricks",
      backgroundColor: "#c65135"
    },
    {
      id:"3",
      title:"Something",
      backgroundColor: "#1c4a7e"
    },
    {
      id:"4",
      title:"Anything",
      backgroundColor: "#c65135"
    },
]
class Topics extends React.Component{
 
render(){
    return(
    <View style={{backgroundColor: 'transparent'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.TextBold}>Topics</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.ButtonStyle1}
            activeOpacity={0.5}
            onPress={this.login}
          >
            <Text style={styles.ButtonText1}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={Data}
        renderItem={({item})=>
            <TouchableOpacity activeOpacity={0.5} onPress={this.login}>
                <Image style={styles.image, {backgroundColor: item.backgroundColor}} containerStyle={styles.imageContainer}>
                    <Text
                        style={styles.ButtonText}>
                        {item.title}
                    </Text>
                </Image>
            </TouchableOpacity>   


           
     }/>
     </View>
    )
}

}
const styles=StyleSheet.create(
{
    TextBold:{
            fontSize:20,
            fontWeight:"bold",
            paddingLeft:20

            },
    image:{
            ...StyleSheet.absoluteFillObject,
            resizeMode: 'contain',
            borderRadius: 10
           },
    imageContainer: {
            flex: 1,
            marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
            borderRadius: 10,
            margin: 10
          },
    ButtonStyle: {
            borderWidth: 0,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 50
          },
    ButtonText:{
            fontSize:20,
            fontWeight:"bold",
            justifyContent: 'center',
            alignSelf: 'center',
            color: '#ffffff',
            padding: 30
        },
        ButtonStyle1: {
          justifyContent: 'center',
          textAlign: 'center',
          borderWidth: 0,
          alignSelf: 'flex-end',
          marginHorizontal: 10
        },
        ButtonText1:{
          fontSize:18,
          fontWeight:"bold",
          textAlign: 'center',
          color: 'blue',
          textDecorationLine: 'underline'
        },
    }
)

export default Topics;