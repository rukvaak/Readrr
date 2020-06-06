import React from 'react';
import { Dimensions, StyleSheet, Text, View,FlatList,ScrollView, Button, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Carousel, { Pagination, ParallaxImage  } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const Data=[
    {
      id:"1",
      image:require('../../assets/EmileZola.jpg'),
      title: "The Disappearance of Emile Zola",
      Author: "Michael Rosen"
    },
    {
      id:"2",
      image:require('../../assets/Fatherhood.jpg'),
      title: "FatherHood: The Truth",
      Author: "Marcus Berkmann"
    },
    {
      id:"3",
      image:require('../../assets/Time-Travellers.jpg'),
      title: "How to be the Best in Time and Space",
      Author: "Lottie Stride"
    }
]
class ImageCarousel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      animating: false
    };
  }

  renderItem({item,index}, parallaxProps){
    return (
      <View style={styles.item} >
        <ParallaxImage 
          style={styles.image} 
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        /> 
        <Text style={styles.title}>
          {item.title } 
                      {/* {this.state.data.title} */}
        </Text>
        <Text style={styles.subtitle}>
          {"By "+item.Author } 
          {/* {this.state.data.title} */}
        </Text>
      </View>

    )
}

get pagination () {
  const { activeIndex } = this.state;
  return (
      <Pagination
        dotsLength={Data.length}
        activeDotIndex={activeIndex}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            backgroundColor: 'grey'
        }}
        inactiveDotStyle={{
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
  );
}
 
render(){
    return(
    <View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.TextBold}>Our Picks</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.ButtonStyle}
            activeOpacity={0.5}
            onPress={this.login}
          >
            <Text style={styles.ButtonText}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Carousel
                    layout={"default"}
                    enableMomentum={true}
                    ref={ref => this.carousel = ref}
                    data={Data}
                    loop={true}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 180}
                    renderItem={this.renderItem}
                    hasParallaxImages={true}
                    onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    {/* { this.pagination } */}
        
      </View>
     </View>
    )
}

}
const styles=StyleSheet.create(
{
    TextBold:{
            fontSize:20,
            fontWeight:"bold",
            paddingLeft:20,
            paddingBottom: 10

            },
            item: {
              width: screenWidth - 180,
              height: screenWidth - 80,
            },
            image:{
              ...StyleSheet.absoluteFillObject,
              resizeMode: 'contain',
              borderRadius: 10
             },
           title: {
            fontSize: 20, 
            fontWeight: 'bold',
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            paddingTop: 30
        },
        subtitle: {
            fontSize: 14,
            color: 'grey',
            justifyContent: 'center',
            alignSelf: 'center'
        },
        imageContainer: {
          flex: 1,
          marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
          backgroundColor: 'white',
          borderRadius: 8,
        },
        ButtonStyle: {
          justifyContent: 'center',
          textAlign: 'center',
          borderWidth: 0,
          alignSelf: 'flex-end',
          marginHorizontal: 10
        },
        ButtonText:{
          fontSize:18,
          fontWeight:"bold",
          textAlign: 'center',
          color: 'blue',
          textDecorationLine: 'underline'
        }
    }
)

export default ImageCarousel;