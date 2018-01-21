//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 15.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { connect } from 'react-redux';

import { coral, gray, buttonStyles, cardStyles } from '../utils/styles';
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
  },
  button: {
    alignSelf: null,
    margin: 10,
    width: '80%'
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
    numQuestionsSlider: 1,
    showAnswer: false
  };

  //----------------------------------------------------------------------------
  // Flip card
  //----------------------------------------------------------------------------
  flipCard = () => {
    this.setState(state => ({ showAnswer: !state.showAnswer }));
  };

  //----------------------------------------------------------------------------
  // Restart quiz
  //----------------------------------------------------------------------------
  restartQuiz = () => {
    const numQuestions = this.props.questions.length;
    const defaultNumQuestions = numQuestions > 10 ? 10 : numQuestions;
    const defaultState = {
      asked: 0,
      correct: 0,
      total: 0,
      questions: [],
      showAnswer: false
    };

    if(this.props.questions.length === 1)
      this.setState({
        ...defaultState,
        numQuestionsSlider: defaultNumQuestions,
        total: 1,
        questions: shuffle(this.props.questions)
      });
    else
      this.setState({
        ...defaultState,
        numQuestionsSlider: defaultNumQuestions
      });
  };

  //----------------------------------------------------------------------------
  // Correct answer
  //----------------------------------------------------------------------------
  correctAnswer = () => {
    this.setState(state => ({
      showAnswer: false,
      asked: state.asked+1,
      correct: state.correct+1
    }));
  };

  //----------------------------------------------------------------------------
  // Incorrect answer
  //----------------------------------------------------------------------------
  incorrectAnswer = () => {
    this.setState(state => ({
      showAnswer: false,
      asked: state.asked+1
    }));
  };

  //----------------------------------------------------------------------------
  // Component will receive props
  //----------------------------------------------------------------------------
  componentWillMount() {
    this.restartQuiz();
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
                questions: shuffle(this.props.questions).slice(0, numQuestions)
              });
            }}
          >
            <Text style={buttonStyles.text}>Start the quiz</Text>
          </Touchable>
        </View>);
    }

    //--------------------------------------------------------------------------
    // Display a card
    //--------------------------------------------------------------------------
    if(this.state.total !== this.state.asked) {
      const label = this.state.showAnswer ? 'Answer' : 'Question';
      const card = this.state.questions[this.state.asked];
      const content = this.state.showAnswer ? card.answer : card.question;
      return (
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={cardStyles.label}>Progress:</Text>
              <Text
                style={[cardStyles.content, {fontSize: 18, marginLeft: 10}]}
              >
                {this.state.asked+1}/{this.state.total}
              </Text>
            </View>
          </View>

          <View style={[cardStyles.card, {width: '100%', padding: 50}]}>
            <Text style={cardStyles.label}>{label}</Text>
            <Text style={cardStyles.content}>{content}</Text>
          </View>

          <View style={{width: '100%', alignItems: 'center'}}>
            <Touchable
              style={[buttonStyles.button, styles.button]}
              onPress={this.flipCard}
            >
              <Text style={buttonStyles.text}>Show Answer</Text>
            </Touchable>
            <Touchable
              style={[
                buttonStyles.button,
                styles.button,
                {backgroundColor: '#3cb371'}
              ]}
              onPress={this.correctAnswer}
            >
              <Text style={buttonStyles.text}>Correct</Text>
            </Touchable>

            <Touchable
              style={[
                buttonStyles.button,
                styles.button,
                {backgroundColor: '#b22222'}
              ]}
              onPress={this.incorrectAnswer}
            >
              <Text style={buttonStyles.text}>Incorrect</Text>
            </Touchable>
          </View>
        </View>
      );
    }

    //--------------------------------------------------------------------------
    // Card view
    //--------------------------------------------------------------------------
    return (
      <View style={styles.container}>
        <Text style={[cardStyles.label, {fontSize: 64}]}>
          Your score:
        </Text>
        <Text style={[cardStyles.content, {fontSize: 96}]}>
          {this.state.correct}/{this.state.total}
        </Text>
        <Touchable
          style={[buttonStyles.button, styles.button]}
          onPress={this.restartQuiz}
        >
          <Text style={buttonStyles.text}>Restart</Text>
        </Touchable>
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
    questions: Object.keys(questions).map(key => questions[key])
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
