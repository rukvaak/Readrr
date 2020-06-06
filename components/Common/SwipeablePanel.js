import React, {Component}  from 'react';
import { StyleSheet, Text, View } from "react-native";
 
import SwipeablePanel from "rn-swipeable-panel";
 
export default class SwipeablePanel1 extends React.Component {
    constructor(props){
        super(props)
      }
    
      state = {
        font:'',
        css:``
      }
render(){
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
 
  const openPanel = () => {
    setIsPanelActive(true);
  };
 
  const closePanel = () => {
    setIsPanelActive(false);
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <PanelContent /> {/* Your Content Here */}
      </SwipeablePanel>
    </View>
  );
}
};