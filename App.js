//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 08.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
  View, StatusBar, Platform, StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { coral, white } from './utils/styles';

import DeckList from './components/DeckList';
import DeckAdd from './components/DeckAdd';
import Touchable from './components/Touchable';

//------------------------------------------------------------------------------
// Stylesheet
//------------------------------------------------------------------------------
const navBarFgColor = Platform.OS === 'ios' ? coral : white;
const navBarBgColor = Platform.OS === 'ios' ? white : coral;
const styles = StyleSheet.create({
  navBarBtn: {
    color: navBarFgColor
  },
  navBarBtnContainer: {
    marginRight: 12
  }
});

//------------------------------------------------------------------------------
// Status Bar
//------------------------------------------------------------------------------
function FlashCardsStatusBar( {backgroundColor, ...props} ) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

//------------------------------------------------------------------------------
// Add deck button
//------------------------------------------------------------------------------
function addDeckBtn(navigation) {
  return (
    <View style={styles.navBarBtnContainer}>
      <Touchable onPress={() => navigation.navigate('DeckAdd')}>
        {
          Platform.OS === 'ios'
            ? <Ionicons name='ios-add' size={32} style={styles.navBarBtn}/>
            : <MaterialIcons name='add' size={32} style={styles.navBarBtn}/>
        }
      </Touchable>
    </View>
  );
}

//------------------------------------------------------------------------------
// Main navigator
//------------------------------------------------------------------------------
const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({navigation}) => ({
      title: 'Your decks',
      headerRight: addDeckBtn(navigation)
    })
  },
  DeckAdd: {
    screen: DeckAdd,
    navigationOptions: ({navigation}) => ({
      title: 'Create a deck'
    })
  }
}, {
  navigationOptions: ({navigation}) => ({
    headerTintColor: navBarFgColor,
    headerStyle: {
      backgroundColor: navBarBgColor
    }
  })
});

//------------------------------------------------------------------------------
// The main component
//------------------------------------------------------------------------------
export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <FlashCardsStatusBar
          backgroundColor={coral}
          barStyle='light-content'/>
        <MainNavigator/>
      </View>
    );
  }
}
