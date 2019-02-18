import React, { Component } from 'react';
import TestConstructor from '../components/testConstructor';

export class GeneralTest extends Component {

  render() {
    return (
      <div>
	  <TestConstructor questions={this.props.questions} testname={this.props.testname} testNom={this.props.testNo} timer={this.props.time} auth={this.props.auth} hist={this.props.hist}/>
      </div>
    );
  }
}

export default GeneralTest;
