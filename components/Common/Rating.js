import React from 'react';
import { StyleSheet,View, Text} from 'react-native';
import { Rating } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class RatingComponent extends React.Component{
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

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }


  render(){
        return(
                <Rating
                    ratingCount={5}
                    defaultRating={0}
                    startingValue={this.props.rating}
                    imageSize={20}
                    readonly={true}
                    fractions={1}
                    ratingBackgroundColor='#5abd8c'
                    ratingColor='#5abd8c'
                    //onFinishRating={this.ratingCompleted}
                    style={{ justifyContent: 'flex-start',   justifyContent: 'center', alignSelf: 'center' }}
                /> 
        );
    }
  }

const styles = StyleSheet.create(
    {
        screen: {
            flex:1,
            flexDirection: 'column'
        }
    }
);

export default RatingComponent;
