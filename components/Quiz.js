//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 15.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { connect } from 'react-redux';

import { coral, gray, buttonStyles } from '../utils/styles';
import { shuffle } from '../utils/helpers';

import Touchable from './Touchable';

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15
  },
  label: {
    color: coral,
    fontSize: 18,
    textAlign: 'center'
  },
  numQuestions: {
    fontSize: 64,
    marginBottom: 20,
    color: gray
  },
  slider: {
    width: '100%',
    margin: 15
  },
  numView: {
    alignItems: 'center',
    width: '100%'
  }
});

//------------------------------------------------------------------------------
// Quiz
//------------------------------------------------------------------------------
class Quiz extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    asked: 0,
    correct: 0,
    total: 0,
    questions: [],
    numQuestionsSlider: 1
  };

  //----------------------------------------------------------------------------
  // Component will receive props
  //----------------------------------------------------------------------------
  componentWillMount() {
    const numQuestions = this.props.questions.length;
    const defaultNumQuestions = numQuestions > 10 ? 10 : numQuestions;
    if(this.props.questions.length === 1)
      this.setState({
        numQuestionsSlider: defaultNumQuestions,
        total: 1,
        questions: this.props.questions
      });
    else
      this.setState({
        numQuestionsSlider: defaultNumQuestions
      });
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    //--------------------------------------------------------------------------
    // Empty deck
    //--------------------------------------------------------------------------
    if(this.props.questions.length === 0)
      return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text style={styles.label}>
            The deck is empty.
          </Text>
        </View>
      );

    //--------------------------------------------------------------------------
    // Choose the number of cards
    //--------------------------------------------------------------------------
    if(this.state.total === 0) {
      const numQuestions = this.props.questions.length;
      return (
        <View style={styles.container}>
          <Text style={styles.label}>
            Select the number of questions you'd like to be asked.
          </Text>
          <View style={styles.numView}>
            <Text style={styles.numQuestions}>
              {this.state.numQuestionsSlider}
            </Text>
              <Slider
                minimumValue={1}
                maximumValue={numQuestions}
                step={1}
                value={this.state.numQuestionsSlider}
                onValueChange={value => this.setState({numQuestionsSlider: value})}
                style={styles.slider}
              />
          </View>
          <Touchable
            style={buttonStyles.button}
            onPress={() => {
              const numQuestions = this.state.numQuestionsSlider;
              this.setState({
                total: numQuestions,
                questions: this.props.questions.slice(0, numQuestions)
              });
            }}
          >
            <Text style={buttonStyles.text}>Start the quiz</Text>
          </Touchable>
        </View>);
    }

    //--------------------------------------------------------------------------
    // Card view
    //--------------------------------------------------------------------------
    return (
      <View>
        <Text>Not empty.</Text>
      </View>
    );
  }
}

//------------------------------------------------------------------------------
// Connect redux
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  const deckId = ownProps.navigation.state.params.deckId;
  const questions = state[deckId].questions;
  return {
    questions: shuffle(Object.keys(questions).map(key => questions[key]))
  };
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
