import React from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import { Slider } from 'react-native-elements';
import ReadabilityWebView from "react-native-webview-readability";
import SwipeablePanel from "rn-swipeable-panel";
import { Dropdown } from "react-native-material-dropdown";

const ipconfig = require('../../Services/config');;

export default class Webview extends React.Component {
  constructor(props){
    super(props)
    this.chfont = this.chfont.bind(this)
  }

  state = {
    swipeablePanelActive: false,
    font: 'Times New Roman, serif',
    fontsize: 2
  }
 
  chfont(fontfamily, fontsize){
      //console.log(fontfamily," fontsize: ", fontsize);
    this.setState({ font :  fontfamily, fontsize: fontsize})
    this.setState({css:`
    body {
      color: #2a2a2a;
      font-family: `+this.state.font+`;
      font-size: `+this.state.fontsize/2+`em;
    }
    h1 {
      border-bottom-width: 1px;
      border-color: #ccc;
      padding-bottom: 3px;
      border-bottom-style:solid;
      font-size: `+this.state.fontsize*2+`em;
      font-weight: bold;
      letter-spacing: .05em;
    }
    p {
      letter-spacing: .03em;
      font-size: `+this.state.fontsize+`em;
    }
    span {
      letter-spacing: .03em;
      font-size: `+this.state.fontsize+`em;
    }
  `})
  }
  
    componentDidMount = () => {
        this.closePanel();
    };

    openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };

    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };

render(){
    let fontvalue = [
                        {
                            title: 'Roboto',
                            value: 'Brush Script MT, Brush Script Std, cursive'
                        },
                        {
                            title: 'Arial',
                            value: 'Arial, Helvetica, sans-serif'
                        },
                        {
                            title: 'Impact',
                            value: 'Impact, fantasy'
                        },
                        {
                            title: 'Impact',
                            value: 'Courier New, monospace'
                        },
                        {
                            title: 'Impact',
                            value: 'Apple Chancery, cursive'
                        },
                        {
                            title: 'Impact',
                            value: 'Luminari, fantasy'
                        },
                    ];
   return (
     [
      <ReadabilityWebView
   htmlCss={this.state.css}
   url={ipconfig.ipConfig.ipaddress + ":3002/?html=F:/misc/sandeep/RukVaaK/Readrr Server/ReadrrServer/Server/uploads/1592851019.html"}
   title="The Earth is Flat"
 />,<View>
     <Button onPress={()=>this.setState({ swipeablePanelActive: true })} title="CHANGE FONT"></Button>
       <SwipeablePanel  
            closeOnTouchOutside={true} 
            showCloseButton 
            isActive={this.state.swipeablePanelActive} 
            onClose={() => this.closePanel()} 
            onPressCloseButton={this.closePanel}
        >
            <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20}}>Typography</Text>
            <View style={styles.Dropdown}>
                <Dropdown 
                    label="Select Font" 
                    labelFontSize= {17}
                    baseColor="#413E4F"
                    data={fontvalue} 
                    value={this.state.font}
                    inputContainerStyle={{ borderBottomWidth: 0.8,  paddingLeft: 20 }}
                    onChangeText={value => this.chfont(value, this.state.fontsize)}
                />
            </View>
            <View style={styles.Dropdown}>
                <Slider
                    value={this.state.fontsize}
                    maximumValue={2}
                    minimumValue={1}
                    step={0.1}
                    thumbStyle={{borderWidth: 1, borderColor: 'gray'}}
                    thumbTintColor='#ffffff'
                    value={this.state.fontsize}
                    onValueChange={value => this.chfont(this.state.font, value)}
                />
                <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>A-</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 20}}>A+</Text>
                </View>
              </View>
                
            </View>
          </View>
      </SwipeablePanel>
</View>
     ]
      
 
   );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Dropdown: {
    marginHorizontal: 20,
  },
});
