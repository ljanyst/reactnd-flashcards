//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 14.14.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, Alert, Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { white, coral, buttonStyles, navBarStyles } from '../utils/styles';
import { cardUpdate, cardRemove } from '../actions';
import * as api from '../utils/api';
import { makeId } from '../utils/helpers';
import { store } from '../App';

import Touchable from './Touchable';
import KeyboardAdjustableView from './KeyboardAdjustableView';

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 15
  }
});

//------------------------------------------------------------------------------
// Add card control buttons
//------------------------------------------------------------------------------
function cardControl(navigation) {
  //----------------------------------------------------------------------------
  // Check if we should render the button
  //----------------------------------------------------------------------------
  const cardId = navigation.state.params.cardId;
  if(!cardId)
    return null;

  //----------------------------------------------------------------------------
  // Delete button
  //----------------------------------------------------------------------------
  const deleteButton = (
    <View style={navBarStyles.btnContainer}>
      <Touchable
        onPress={() => {
          Alert.alert('Warning',
                      'Are you sure you want to delete the card?',
                      [
                        {
                          text: 'Cancel'
                        }, {
                          text: 'OK',
                          onPress: () => {
                            const deckId = navigation.state.params.deckId;

                            api.cardRemove(deckId, cardId)
                              .then(() => {
                                store.dispatch(cardRemove(deckId, cardId));
                              })
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
  // Complete component
  //----------------------------------------------------------------------------
  return deleteButton;
}

//------------------------------------------------------------------------------
// Card Edit
//------------------------------------------------------------------------------
class CardEdit extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    question: '',
    answer: ''
  };

  //----------------------------------------------------------------------------
  // Update a card
  //----------------------------------------------------------------------------
  cardUpdate = () => {
    const { question, answer } = this.state;
    let id = makeId(10);
    if(this.props.card)
      id = this.props.card.id;

    const deckId = this.props.navigation.state.params.deckId;
    const card = {id, question, answer};

    if(question === '' || answer === '')
      return;

    api.cardUpdate(deckId, card)
      .then(() => this.props.cardUpdate(deckId, card));

    const refreshParent = this.props.navigation.state.params.refreshParent;
    this.props.navigation.goBack();
  }

  //----------------------------------------------------------------------------
  // Component mounted
  //----------------------------------------------------------------------------
  componentDidMount() {
    if(this.props.card) {
      this.setState({
        question: this.props.card.question,
        answer: this.props.card.answer
      });
    }
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    return (
      <KeyboardAdjustableView>
        <View style={styles.container}>
          <TextField
            tintColor={coral}
            baseColor={coral}
            label='Question'
            multiline
            value={this.state.question}
            onChangeText={ text => this.setState({ question: text }) }
          />
          <TextField
            tintColor={coral}
            baseColor={coral}
            label='Answer'
            multiline
            value={this.state.answer}
            onChangeText={ text => this.setState({ answer: text }) }
          />

          <Touchable style={buttonStyles.button} onPress={this.cardUpdate}>
            <Text style={buttonStyles.text}>
              {this.props.card ? 'Update' : 'Add'} card
            </Text>
          </Touchable>
        </View>
      </KeyboardAdjustableView>
    );
  }
}

//------------------------------------------------------------------------------
// Connect redux
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  const deckId = ownProps.navigation.state.params.deckId;
  const cardId = ownProps.navigation.state.params.cardId;
  if(!cardId)
    return {};

  const card = state[deckId].questions[cardId];
  return { card };
}

function mapDispatchToProps(dispatch) {
  return {
    cardUpdate: (deckId, card) => dispatch(cardUpdate(deckId, card))
  };
}

const _CardEdit = connect(mapStateToProps, mapDispatchToProps)(CardEdit);
export default _CardEdit;

//------------------------------------------------------------------------------
// Navbar
//------------------------------------------------------------------------------
export function cardEditNavBar() {
  return  {
    screen: _CardEdit,
    navigationOptions: ({navigation}) => {
      const cardId = navigation.state.params.cardId;
      return {
        title: cardId ? 'Edit card' : 'Create a card',
        headerRight: cardControl(navigation)
      };
    }
  };
}
