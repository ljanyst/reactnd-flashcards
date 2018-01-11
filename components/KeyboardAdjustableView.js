//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 11.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, ScrollView, Keyboard, Platform } from 'react-native';

//------------------------------------------------------------------------------
// Keyboard Adjustable View
//------------------------------------------------------------------------------
class KeyboardAdjustableView extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    keyboardHeight: 0,
    height: '100%'
  };

  //----------------------------------------------------------------------------
  // Set up the listeners
  //----------------------------------------------------------------------------
  componentWillMount () {
    const kbdEvent = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardShowSub = Keyboard.addListener(`keyboard${kbdEvent}Show`,
                                                this.keyboardShow);
    this.keyboardHideSub = Keyboard.addListener(`keyboard${kbdEvent}Hide`,
                                                this.keyboardHide);
  }

  //----------------------------------------------------------------------------
  // Clean up the listeners
  //----------------------------------------------------------------------------
  componentWillUnmount() {
    this.keyboardShowSub.remove();
    this.keyboardHideSub.remove();
  }

  //----------------------------------------------------------------------------
  // Keyboard shown or will show
  //----------------------------------------------------------------------------
  keyboardShow = (event) => {
    this.setState({
      keyboardHeight: event.endCoordinates.height,
      height: '99%'
    });
  };

  //----------------------------------------------------------------------------
  // Keyboard hidden or will hide
  //----------------------------------------------------------------------------
  keyboardHide = (event) => {
    this.setState({
      keyboardHeight: 0,
      height: '100%'
    });
  };

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    return (
      <View
        style={{
          flex: 1, paddingBottom: this.state.keyboardHeight
        }}
      >
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{minHeight: this.state.height}}
        >
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

export default KeyboardAdjustableView;
