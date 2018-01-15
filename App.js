//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 08.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { coral, navBarFgColor, navBarBgColor } from './utils/styles';
import { fetchData } from './utils/api';
import { deckSetDb } from './actions';
import reducer from './reducers';

import DeckList, { deckListNavBar } from './components/DeckList';
import DeckAdd, { deckAddNavBar } from './components/DeckAdd';
import CardList, { cardListNavBar } from './components/CardList';
import CardEdit, { cardEditNavBar } from './components/CardEdit';
import Quiz, { quizNavBar } from './components/Quiz';

//------------------------------------------------------------------------------
// Redux
//------------------------------------------------------------------------------
export const store = createStore(reducer);

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
// Main navigator
//------------------------------------------------------------------------------
const MainNavigator = StackNavigator({
  DeckList: deckListNavBar(),
  DeckAdd: deckAddNavBar(),
  CardList: cardListNavBar(),
  CardEdit: cardEditNavBar(),
  Quiz: quizNavBar()
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
