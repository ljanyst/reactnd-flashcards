//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 15.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { coral } from '../utils/styles';

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  label: {
    color: coral,
    fontSize: 18,
    textAlign: 'center'
  }
});

//------------------------------------------------------------------------------
// Quiz
//------------------------------------------------------------------------------
class Quiz extends Component {
  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.label}>The deck is empty.</Text>
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

const _Quiz = connect(mapStateToProps, mapDispatchToProps)(Quiz);
export default _Quiz;

//------------------------------------------------------------------------------
// Navbar
//------------------------------------------------------------------------------
export function quizNavBar() {
  return  {
    screen: _Quiz,
    navigationOptions: ({navigation}) => ({
      title: 'Quiz'
    })
  };
}
