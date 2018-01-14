//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 12.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
  View, Text, Platform, Alert, FlatList, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
  MaterialIcons, Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';

import { navBarStyles } from '../utils/styles';
import { store } from '../App';
import { deckRemove } from '../actions';
import * as api from '../utils/api';
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

  label: {
    color: coral,
    fontSize: 18
  },

  content: {
    color: gray,
    fontSize: 16,
    textAlign: 'center'
  }

});

//------------------------------------------------------------------------------
// Add deck control buttons
//------------------------------------------------------------------------------
function deckControl(navigation) {
  //----------------------------------------------------------------------------
  // Quiz button
  //----------------------------------------------------------------------------
  const quizButton = (
    <View style={navBarStyles.btnContainer}>
      <Touchable onPress={() => {}}>
        {
          Platform.OS === 'ios'
            ? <Ionicons
                name='ios-school-outline'
                size={28}
                  style={[navBarStyles.button]}
              />
            : <MaterialIcons
                name='school'
                size={28}
                style={navBarStyles.button}
              />
        }
      </Touchable>
    </View>
  );

  //----------------------------------------------------------------------------
  // Delete button
  //----------------------------------------------------------------------------
  const deleteButton = (
    <View style={navBarStyles.btnContainer}>
      <Touchable
        onPress={() => {
          Alert.alert('Warning',
                      'Are you sure you want to delete the deck?',
                      [
                        {
                          text: 'Cancel'
                        }, {
                          text: 'OK',
                          onPress: () => {
                            const deckId = navigation.state.params.deckId;
                            api.deckRemove(deckId)
                              .then(() => store.dispatch(deckRemove(deckId)))
                              .then(() => navigation.goBack());
                          }
                        }
                      ]);
        }}
      >
        {
          Platform.OS === 'ios'
            ? <Ionicons
                name='ios-trash-outline'
                size={28}
                style={navBarStyles.button}
              />
            : <MaterialIcons
                name='delete'
                size={28}
                style={navBarStyles.button}
              />
        }
      </Touchable>
    </View>);

  //----------------------------------------------------------------------------
  // Add button
  //----------------------------------------------------------------------------
  const addButton = (
    <View style={navBarStyles.btnContainer}>
      <Touchable
        onPress={() => {
          navigation.navigate('CardEdit',
                              {deckId: navigation.state.params.deckId});
        }}>
        {
          Platform.OS === 'ios'
            ? <Ionicons
                name='ios-add'
                size={28}
                style={navBarStyles.button}
              />
            : <MaterialIcons
                name='add'
                size={28}
                style={navBarStyles.button}
              />
        }
      </Touchable>
    </View>
  );

  //----------------------------------------------------------------------------
  // Complete component
  //----------------------------------------------------------------------------
  return (
    <View style={navBarStyles.btnsContainer}>
      {quizButton}
      {deleteButton}
      {addButton}
    </View>
  );
}

//------------------------------------------------------------------------------
// Render item
//------------------------------------------------------------------------------
function itemView(item, navigation) {
  return (
    <Touchable style={styles.item}>
      <Text style={styles.label}>Question</Text>
      <Text style={styles.content}>{item.question}</Text>
      <View style={{margin: 5}}/>
      <Text style={styles.label}>Answer</Text>
      <Text style={styles.content}>{item.answer}</Text>
    </Touchable>
  );
}

//------------------------------------------------------------------------------
// Card List
//------------------------------------------------------------------------------
class CardList extends Component {
  render() {
    const deckId = this.props.navigation.state.params.deckId;
    if(!(deckId in this.props.decks))
      return <View/>;

    const cardList = this.props.decks[deckId].questions.map(item => {
      return { ...item, key: item.id };
    });
    const numCards = this.props.decks[deckId].questions.length;
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Number of cards:</Text>
            <Text
              style={[styles.content, {fontSize: 18, marginLeft: 10}]}
            >
              {numCards}
            </Text>
          </View>
        </View>
        <FlatList
          data={cardList}
          renderItem={({item}) => itemView(item, this.props.navigation)}
        />
      </View>
    );
  }
}

//------------------------------------------------------------------------------
// Connect redux
//------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {
    decks: state
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const _CardList = connect(mapStateToProps, mapDispatchToProps)(CardList);
export default _CardList;;

//------------------------------------------------------------------------------
// Navbar
//------------------------------------------------------------------------------
export function cardListNavBar() {
  return {
    screen: _CardList,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.deckId,
      headerRight: deckControl(navigation)
    })
  };
}
