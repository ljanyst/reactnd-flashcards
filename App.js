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
import {
  MaterialIcons, Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { coral, white } from './utils/styles';
import { fetchData } from './utils/api';
import { deckSetDb } from './actions';
import reducer from './reducers';

import DeckList from './components/DeckList';
import DeckAdd from './components/DeckAdd';
import CardList from './components/CardList';
import Touchable from './components/Touchable';

//------------------------------------------------------------------------------
// Redux
//------------------------------------------------------------------------------
const store = createStore(reducer);

//------------------------------------------------------------------------------
// Stylesheet
//------------------------------------------------------------------------------
const navBarFgColor = Platform.OS === 'ios' ? coral : white;
const navBarBgColor = Platform.OS === 'ios' ? white : coral;
const styles = StyleSheet.create({
  navBarBtnsContainer: {
    flexDirection: 'row'
  },
  navBarBtn: {
    color: navBarFgColor
  },
  navBarBtnContainer: {
    marginRight: 18
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
            ? <Ionicons name='ios-add' size={28} style={styles.navBarBtn}/>
            : <MaterialIcons name='add' size={28} style={styles.navBarBtn}/>
        }
      </Touchable>
    </View>
  );
}

//------------------------------------------------------------------------------
// Add deck control buttons
//------------------------------------------------------------------------------
function deckControl(navigation) {
  return (
    <View style={styles.navBarBtnsContainer}>
    <View style={styles.navBarBtnContainer}>
      <Touchable onPress={() => {}}>
        {
          Platform.OS === 'ios'
            ? <Ionicons
                name='ios-school-outline'
                size={28}
                style={styles.navBarBtn}
              />
            : <MaterialIcons name='school' size={28} style={styles.navBarBtn}/>
        }
      </Touchable>
    </View>
    <View style={styles.navBarBtnContainer}>
      <Touchable onPress={() => {}}>
        {
          Platform.OS === 'ios'
            ? <Ionicons
                name='ios-trash-outline'
                size={28}
                style={styles.navBarBtn}
              />
            : <MaterialIcons name='delete' size={28} style={styles.navBarBtn}/>
        }
      </Touchable>
    </View>
    <View style={styles.navBarBtnContainer}>
      <Touchable onPress={() => {}}>
        {
          Platform.OS === 'ios'
            ? <Ionicons name='ios-add' size={28} style={styles.navBarBtn}/>
            : <MaterialIcons name='add' size={28} style={styles.navBarBtn}/>
        }
      </Touchable>
    </View>
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
  },
  CardList: {
    screen: CardList,
    navigationOptions: ({navigation}) => ({
      title: `Deck: ${navigation.state.params.cardId}`,
      headerRight: deckControl(navigation)
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
  //----------------------------------------------------------------------------
  // Component mounted
  //----------------------------------------------------------------------------
  componentDidMount() {
    fetchData().then(data => store.dispatch(deckSetDb(data)));
  }

  //----------------------------------------------------------------------------
  // Renderer
  //----------------------------------------------------------------------------
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar
            backgroundColor={coral}
            barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
