//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 08.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

import { white, coral, buttonStyles } from '../utils/styles';
import { deckCreate } from '../actions';
import * as api from '../utils/api';

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
// Deck Add
//------------------------------------------------------------------------------
class DeckAdd extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    deckName: ''
  };

  //----------------------------------------------------------------------------
  // Add a deck
  //----------------------------------------------------------------------------
  deckAdd = () => {
    const name = this.state.deckName;
    if(name === '')
      return;

    if(this.props.deckNames.has(name)) {
      alert(`Deck "${name}" already exists`);
      return;
    }


    api.deckCreate(name).
      then(() => this.props.deckCreate(name));
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
            label='Name of the new deck'
            onChangeText={ text => this.setState({ deckName: text }) }
          />
          <Touchable style={buttonStyles.button} onPress={this.deckAdd}>
            <Text style={buttonStyles.text}>Add deck</Text>
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
  return {
    deckNames: new Set(Object.keys(state))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deckCreate: name => dispatch(deckCreate(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckAdd);
