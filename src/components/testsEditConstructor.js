import React, { Component } from 'react';
import TestsEditConstructorDesign from './testsEditConstructorDesign';
import TestsEditConstructorDesignInput from './testsEditConstructorDesignInput';
import DelQue from './delQue';

class TestsEditConstructor extends Component {

  render() {
	 return (
      <div>
  	  			<div  className="container rounded border mt-2 pb-1" style={{background:'gainsboro'}}>
  						<div className="d-flex justify-content-between">
    						<h3 className="text-center">
    								№ {this.props.no}
    						</h3>
    						<DelQue no={this.props.no} testNumber={this.props.testNumber} upd={this.props.upd}/>
  						</div>
  						<div className="border border-secondary rounded bg-light mt-1 px-1 py-1">
  							<h4 className=""> Вопрос: </h4>
  							<TestsEditConstructorDesign val={this.props.que} no={this.props.no} type={"question"} testNumber={this.props.testNumber} upd={this.props.upd}/>
  						</div>
              {this.props.variants &&
                <div className="border border-secondary rounded bg-light mt-1 px-1 py-1">
    							<h4 className=""> Варианты ответа: </h4>
    							<TestsEditConstructorDesign val={JSON.parse(this.props.variants)} no={this.props.no} type={"variants"} testNumber={this.props.testNumber} upd={this.props.upd}/>
    						</div>
              }
  						<div className="border border-secondary rounded bg-light mt-1 px-1 py-1">
  							<h4> Ответ: </h4>
  							<TestsEditConstructorDesign val={this.props.answ} no={this.props.no} type={"answer"}  testNumber={this.props.testNumber} upd={this.props.upd}/>
  						</div>
  						<div className="d-flex justify-content-between border border-secondary rounded bg-light mt-1 py-1 px-1">
  							<h4> Максимальный балл: </h4>
  							<TestsEditConstructorDesignInput val={this.props.mark} no={this.props.no} type={"maxmark"}  testNumber={this.props.testNumber} upd={this.props.upd}/>
  						</div>
					  </div>
      </div>
    );
  }
}

export default TestsEditConstructor;
