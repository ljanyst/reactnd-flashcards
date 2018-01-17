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

import { navBarStyles, cardStyles } from '../utils/styles';
import { store } from '../App';
import { deckRemove } from '../actions';
import * as api from '../utils/api';
import { white, coral, gray } from '../utils/styles';

import Touchable from './Touchable';

//------------------------------------------------------------------------------
// Add deck control buttons
//------------------------------------------------------------------------------
function deckControl(navigation) {
  //----------------------------------------------------------------------------
  // Quiz button
  //----------------------------------------------------------------------------
  const quizButton = (
    <View style={navBarStyles.btnContainer}>
      <Touchable
        onPress={() => {
          navigation.navigate('Quiz',
                              {deckId: navigation.state.params.deckId});
        }}
      >
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
    <Touchable
      style={cardStyles.card}
      onPress={() => {
        navigation.navigate('CardEdit',
                            {
                              deckId: navigation.state.params.deckId,
                              cardId: item.id
                            });

      }}
    >
      <Text style={cardStyles.label}>Question</Text>
      <Text style={cardStyles.content}>{item.question}</Text>
      <View style={{margin: 5}}/>
      <Text style={cardStyles.label}>Answer</Text>
      <Text style={cardStyles.content}>{item.answer}</Text>
    </Touchable>
  );
}

//------------------------------------------------------------------------------
// Card List
//------------------------------------------------------------------------------
class CardList extends Component {
  render() {
    if(!this.props.deckId)
      return <View/>;

    const cardList = Object.keys(this.props.questions).map(key => {
      const item = this.props.questions[key];
      return { ...item, key };
    });

    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={cardStyles.label}>Number of cards:</Text>
            <Text
              style={[cardStyles.content, {fontSize: 18, marginLeft: 10}]}
            >
              {this.props.numCards}
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
function mapStateToProps(state, ownProps) {
  const deckId = ownProps.navigation.state.params.deckId;
  if(!(deckId in state))
    return {};

  return {
    random: Math.random(),
    ...state[deckId],
    deckId,
    numCards: Object.keys(state[deckId].questions).length
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
