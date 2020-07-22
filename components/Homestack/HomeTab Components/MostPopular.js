import React from 'react';
import { Dimensions,StyleSheet,View,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { default as TopicTitle } from '../../Common/TopicTitle';
import { default as ImageComponent } from '../../Common/ImageComponent';
import { default as TitleandAuthor } from '../../Common/TitleandAuthor';
import { default as RatingComponent } from '../../Common/Rating';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class MostPopular extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
    super(props);
    this.rendernavigation = this.rendernavigation.bind(this);
  }
  
  state = {
    data: {},
    loading: true
  }

/*   componentWillReceiveProps(){
    this.setState({data: ''})
  }
 */
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  rendernavigation(){
    /* this.props.props.navigation.dispatch(resetAction); */
    /* this.props.props.navigation.navigate('Rootstack', { screen: 'Blogpage' }); */
    /* this.props.props.navigation.dispatch(goToBlogpage); */
    this.props.navigation.navigate('Blogpage');
  }

  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
        return(
            <View style={styles.screen}>
              <TopicTitle topictitle="Most Popular"/>
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={this.props.most_popular}
                renderItem={({item})=>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.rendernavigation}
                      >
                        <View style={styles.item}>
                            <ImageComponent image={item.blog_image} /> 
                            <TitleandAuthor title={item.blog_title} author={item.blog_author} />
                            <RatingComponent rating={item.blog_rating}/>
                        </View>  
                    </TouchableOpacity>     
                }
              />

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
  paddingLeft:20,
  paddingBottom: 10
},
imageContainer: {
  flex: 1,
  marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  borderRadius: 20
},
item: {
  width: (screenWidth * 45) / 100,
  height: (screenHeight * 35) / 100,
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
    textAlign: 'center'
},
subtitle: {
    fontSize: 14,
    color: 'grey',
    justifyContent: 'center',
    alignSelf: 'center'
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
},
}
);

export default MostPopular;
