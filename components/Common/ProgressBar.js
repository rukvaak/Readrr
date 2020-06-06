import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Animated} from 'react-native';  
  
class ProgressBar extends Component {  
    state={  
        progressStatus: 0,  
    }  
    anim = new Animated.Value(0);  
    componentDidMount(){  
        this.onAnimate();  
    }  
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value,10)});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: 0,  
        }).start();  
    }  
  render() {  
    return (  
      <View style={styles.container}>  
            <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%"},  
                ]}  
            />  
            {/* <Animated.Text style={styles.label}>  
                    {this.state.progressStatus }%  
            </Animated.Text>   */}
      </View>  
    );  
  }  
}  
const styles = StyleSheet.create({  
    container: {  
    width: "100%",  
    height: 10,   
    justifyContent: "center"
  },  
  inner:{  
    width: "100%",  
    height: 10,  
    backgroundColor:"green",
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  }  
});  

export default ProgressBar;