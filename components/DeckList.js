//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 08.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

import { white, coral, gray } from '../utils/styles';

import Touchable from './Touchable';

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 10 : 2,
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 1
  },

  title: {
    color: coral,
    fontSize: 22
  },

  cardCounter: {
    marginTop: 15,
    color: gray,
    fontSize: 14
  }
});

//------------------------------------------------------------------------------
// Render item
//------------------------------------------------------------------------------
function itemView(item, navigation) {
  return (
    <Touchable
      style={styles.item}
      onPress={() => navigation.navigate('CardList', {cardId: item.key})}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.cardCounter}>Cards: {item.numCards}</Text>
    </Touchable>
  );
}

//------------------------------------------------------------------------------
// Deck List
//------------------------------------------------------------------------------
class DeckList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.deckList}
        renderItem={({item}) => itemView(item, this.props.navigation)}
      />
    );
  }
}

//------------------------------------------------------------------------------
// Connect redux
//------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {
    deckList: Object.keys(state).map(deckId => {
      return {
        key: deckId,
        title: deckId,
        numCards: state[deckId].questions.length
      };
    })
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
