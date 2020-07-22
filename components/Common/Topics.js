import React from 'react';
import { Dimensions,StyleSheet, Text, View,FlatList,ScrollView, Button, TouchableOpacity, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

class Topics extends React.Component{
 
render(){
    return(
    <View>
     <FlatList
        data={Data}
        numColumns={2}
        renderItem={({item})=>
            <View>
              <TouchableOpacity activeOpacity={0.5} 
                                style={{  backgroundColor: item.backgroundColor, 
                                          width: screenWidth/2.1, 
                                          margin: 5, 
                                          height: screenWidth/1.5
                                      }} 
                                onPress={this.login}>
                 {/*  <Image style={styles.image, {backgroundColor: item.backgroundColor}} containerStyle={styles.imageContainer}> */}
                      <Text
                          style={styles.ButtonText}>
                          {item.Topic}
                      </Text>
                      <Image style={styles.image} containerStyle={styles.imageContainer} source={item.image}/> 
                  {/* </Image> */}
              </TouchableOpacity> 
            </View>            
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
            borderRadius: 10
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
            color: '#ffffff'
        },
    }
)

export default Topics;