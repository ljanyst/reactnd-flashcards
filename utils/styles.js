//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 08.01.2018
//------------------------------------------------------------------------------

import { StyleSheet, Platform } from 'react-native';

//------------------------------------------------------------------------------
// Colors
//------------------------------------------------------------------------------
export const coral='#ff7f50';
export const white = '#fff';
export const gray = '#777';

//------------------------------------------------------------------------------
// Navbar
//------------------------------------------------------------------------------
export const navBarFgColor = Platform.OS === 'ios' ? coral : white;
export const navBarBgColor = Platform.OS === 'ios' ? white : coral;

export const navBarStyles = StyleSheet.create({
  btnsContainer: {
    flexDirection: 'row'
  },
  button: {
    color: navBarFgColor
  },
  btnContainer: {
    marginRight: 18
  }
});

//------------------------------------------------------------------------------
// Button Styles
//------------------------------------------------------------------------------
const iosButton = {
  backgroundColor: coral,
  padding: 10,
  borderRadius: 7,
  height: 45,
  marginLeft: 40,
  marginRight: 40
};

const androidButton = {
  backgroundColor: coral,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  height: 45,
  borderRadius: 2,
  alignSelf: 'flex-end',
  justifyContent: 'center',
  alignItems: 'center'
};

export const buttonStyles = StyleSheet.create({
  button: Platform.OS === 'ios' ? iosButton : androidButton,
  text: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});
