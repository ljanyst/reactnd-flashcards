//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 09.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
  TouchableOpacity, TouchableNativeFeedback, View, Platform
} from 'react-native';

export default function Touchable({children, ...props}) {
  if(Platform.OS !== 'ios')
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        {...props}
      >
        <View children={children}/>
      </TouchableNativeFeedback>
    );
  else
    return (
      <TouchableOpacity {...props} children={children} />
    );
}
