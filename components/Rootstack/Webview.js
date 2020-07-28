import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ScrollView, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import ReadabilityWebView from "react-native-webview-readability";
import HTMLView from 'react-native-htmlview';
import SwipeablePanel from "rn-swipeable-panel";
import { Dropdown } from "react-native-material-dropdown";
import { block } from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class Webview extends React.Component {
  constructor(props) {
    super(props)
    this.chfont = this.chfont.bind(this)
  }

  state = {
    swipeablePanelActive: false,
    content: this.props.route.params.content,
    font: 'Roboto',
    fontsize: 20
  }

  chfont(fontfamily, fontsize) {
    //console.log(fontfamily, " fontsize: ", fontsize);
    this.setState({ font: fontfamily, fontsize: fontsize })
    this.setState({
      css: `
    body {
      color: #2a2a2a;
      font-family: `+ this.state.font + `;
      font-size: `+ this.state.fontsize / 2 + `em;
    }
    h1 {
      border-bottom-width: 1px;
      border-color: #ccc;
      padding-bottom: 3px;
      border-bottom-style:solid;
      font-size: `+ this.state.fontsize * 2 + `em;
      font-weight: bold;
      letter-spacing: .05em;
    }
    p {
      letter-spacing: .03em;
      font-size: `+ this.state.fontsize + `em;
    }
    span {
      letter-spacing: .03em;
      font-size: `+ this.state.fontsize + `em;
    }
  `})
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })

    this.props.navigation.setOptions({
      title: this.state.titleinput,
      /* headerRight: () => <Button
      onPress={() => this.rendernavigation()}
      title="SAVE"
      color="#000000"
    /> */
    })
    this.closePanel();
  }

  /* componentDidMount = () => {
      this.closePanel();
  };
*/
  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  render() {
    let fontvalue = [
      {
        title: 'notoserif',
        value: 'notoserif'
      },
      {
        title: 'sans-serif',
        value: 'sans-serif'
      },
      {
        title: 'sans-serif-light',
        value: 'sans-serif-light'
      },
      {
        title: 'sans-serif-thin',
        value: 'sans-serif-thin'
      },
      {
        title: 'sans-serif-condensed',
        value: 'sans-serif-condensed'
      },
      {
        title: 'sans-serif-medium',
        value: 'sans-serif-medium'
      },
      {
        title: 'serif',
        value: 'serif'
      },
      {
        title: 'Roboto',
        value: 'Roboto'
      },
      {
        title: 'monospace',
        value: 'monospace'
      },
      {
        title: 'normal',
        value: 'normal'
      }
    ];
    return (
      [
        <ScrollView>
          <HTMLView
            value={this.state.content}
            stylesheet={{
              a: {
                fontWeight: 'bold',
                color: '#FF3366', // make links coloured pink
              },
              h1: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              h2: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              em: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              head: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              div: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              p: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center',
                margin : '0px !important'
              },
              span: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center',
                margin : '0px !important'
              },
              img: {
                width: 100,
                height: 100
              }
            }}
          /></ScrollView>,
        <View>
          <Button onPress={() => this.setState({ swipeablePanelActive: true })} title="CHANGE FONT"></Button>
          <SwipeablePanel
            closeOnTouchOutside={true}
            showCloseButton
            isActive={this.state.swipeablePanelActive}
            onClose={() => this.closePanel()}
            onPressCloseButton={this.closePanel}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20 }}>Typography</Text>
              <View style={styles.Dropdown}>
                <Dropdown
                  label="Select Font"
                  labelFontSize={17}
                  baseColor="#413E4F"
                  data={fontvalue}
                  value={this.state.font}
                  inputContainerStyle={{ borderBottomWidth: 0.8, paddingLeft: 20 }}
                  onChangeText={value => this.chfont(value, this.state.fontsize)}
                />
              </View>
              <View style={styles.Dropdown}>
                <Slider
                  value={this.state.fontsize}
                  maximumValue={20}
                  minimumValue={10}
                  step={1}
                  thumbStyle={{ borderWidth: 1, borderColor: 'gray' }}
                  thumbTintColor='#ffffff'
                  value={this.state.fontsize}
                  onValueChange={value => this.chfont(this.state.font, value)}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>A-</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 20 }}>A+</Text>
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
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  h1: {
    //fontsize: this.state.fontsize,
    fontWeight: 'bold'
  },
  h2: {
    fontWeight: 'bold'
  },
  em: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
