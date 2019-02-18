import React, { Component } from 'react';
import NameEnterConstructor from './nameEnterConstructor';
import QaConstructor from './qaConstructor';
import Timer from './timer';
import Login from './login';

class TestConstructor extends Component {
	constructor(props){
		super(props);
		this.state={
			count:1,
			id:'',
			questions:[],
			time: false,
			isAuthentificated: false,
			isCaptched: false,
			testname:'',
		}
	}
	count=(value)=> {
    this.setState({ count: this.state.count+value })
  }
  	getId=(value)=> {
    this.setState({ id: value })
  }
  finish=(value)=>{
	  if(value===true) {
	  this.setState({count: this.props.questions.length+2, time: true})
	  }
  }
  
  render() {
	  const {testNom, timer}=this.props;
	  const {isAuthenticated, isCaptched}=this.props.auth;
    return (
	<div>
	{isAuthenticated(testNom) || isCaptched(testNom) ? 
	<Login num={testNom} hist={this.props.hist}/>:
	  <div>
	   {this.state.count===1 && ( <NameEnterConstructor counter={this.count} getId={this.getId} testNo={testNom} testName={this.props.testname}/>)}
      {this.props.questions ?
		  this.state.count>=2 && this.state.count!==this.props.questions.length+2 ? 
			<div className="py-4 mt-4 container" style={{'background':'gainsboro'}}>
				<div>
					<Timer timer={timer} finish={this.finish} id={this.state.id}/>
				</div>
				{(this.state.count<this.props.questions.length+1) ?
				this.props.questions.slice(this.state.count-2, this.state.count-1).map((question)=>
				{return(
				<div key={Math.floor(Math.random() * 100)}>
				<QaConstructor  question={question} counter={this.count} id={this.state.id} key={Math.floor(Math.random() * 100)}/>
				<p className="text-center"><strong>{(this.state.count-1) + ' из ' + this.props.questions.length}</strong></p>
				</div>
				)}): 
				this.props.questions.slice(this.state.count-2, this.state.count-1).map((question)=>
				{return(
				<div key={Math.floor(Math.random() * 100)}>
				<QaConstructor question={question} counter={this.count} id={this.state.id} key={Math.floor(Math.random() * 100)} end={true} name={this.props.testname}/>
				<p className="text-center"><strong>{(this.state.count-1) + ' из ' + this.props.questions.length}</strong></p>
				</div>
				)})} 
			</div>
	 :'':
	 ''}
				
	  
      {this.state.count===this.props.questions.length+2 ?
		  this.state.time===false ?
		  <div className="container">
			<p className="text-center alert alert-success"><strong>Тест окончен</strong></p>
		  </div>:
		  <div className="container">
			<p className="text-center alert alert-warning"><strong>Тест окончен. Время на выполнение вышло.</strong></p>
		  </div>:
		  ''}
      </div>
	}
	</div>
    );
  }
}

export default TestConstructor;
