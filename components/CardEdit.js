//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 14.14.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

import { white, coral, buttonStyles } from '../utils/styles';
import { cardCreate } from '../actions';
import * as api from '../utils/api';
import { makeId } from '../utils/helpers';

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
  // Add a card
  //----------------------------------------------------------------------------
  cardAdd = () => {
    const { question, answer } = this.state;
    const id = makeId(10);
    const deckId = this.props.navigation.state.params.deckId;
    const card = {id, question, answer};

    if(question === '' || answer === '')
      return;

    api.cardCreate(deckId, card)
      .then(() => this.props.cardCreate(deckId, card));
    this.props.navigation.goBack();
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
            onChangeText={ text => this.setState({ question: text }) }
          />
          <TextField
            tintColor={coral}
            baseColor={coral}
            label='Answer'
            multiline
            onChangeText={ text => this.setState({ answer: text }) }
          />

          <Touchable style={buttonStyles.button} onPress={this.cardAdd}>
            <Text style={buttonStyles.text}>Add card</Text>
          </Touchable>
        </View>
      </KeyboardAdjustableView>
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
  return {
    cardCreate: (deckId, card) => dispatch(cardCreate(deckId, card))
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
    navigationOptions: ({navigation}) => ({
      title: 'Create a card'
    })
  };
}
