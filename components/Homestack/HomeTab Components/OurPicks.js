import React from 'react';
import { Dimensions, StyleSheet, Text, View,FlatList,ScrollView, Button, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Carousel, { Pagination, ParallaxImage  } from 'react-native-snap-carousel';

import { default as TopicTitle } from '../../Common/TopicTitle';
import { default as TitleandAuthor } from '../../Common/TitleandAuthor';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


class OurPicks extends React.Component{
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
          source={{uri: item.blog_image}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        /> 
        <TitleandAuthor title={item.blog_title} author={item.blog_author} />
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
      <TopicTitle topictitle="Our Picks" />
      <View style={{backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Carousel
                    layout={"default"}
                    enableMomentum={true}
                    ref={ref => this.carousel = ref}
                    data={this.props.our_picks}
                    loop={true}
                    sliderWidth={screenWidth }
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
            paddingLeft:10,
            paddingBottom: 5

            },
            item: {
              width: (screenWidth * 45) / 100,
        height: (screenHeight * 35) / 100,
              justifyContent: 'center'
            },
            image:{
              ...StyleSheet.absoluteFillObject,
              resizeMode: 'contain',
              borderRadius: 10,
        borderColor: '#ffffff'
             },
           title: {
            fontSize: 20, 
            fontWeight: 'bold',
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            paddingTop: 5
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
          backgroundColor: 'transparent',
          borderRadius: 10,
          borderColor: '#ffffff'
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

export default OurPicks;