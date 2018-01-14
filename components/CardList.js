//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 12.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  MaterialIcons, Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';

import { navBarStyles } from '../utils/styles';
import { store } from '../App';
import { deckRemove } from '../actions';
import * as api from '../utils/api';

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
          navigation.navigate('CardAdd',
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
// Card List
//------------------------------------------------------------------------------
class CardList extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.navigation.state.params.deckId}</Text>
      </View>
    );
  }
}

//------------------------------------------------------------------------------
// Connect redux
//------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {};
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
