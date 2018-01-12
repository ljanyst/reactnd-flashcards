//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 12.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';

//------------------------------------------------------------------------------
// Card List
//------------------------------------------------------------------------------
class CardList extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.navigation.state.params.cardId}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
