import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import GeneralTest from './generalTest';
import Auth from '../components/auth';
import {apiUrl} from '../constants/apiUrl';
const auth = new Auth();


class TestLinkConstructor extends Component {
	constructor(props){
		super(props);
		this.state=({
		questions:[],
		})
	}

	componentWillMount(){
			const fullLink='test/'+ this.props.match.params.test;
			const data=({'test': fullLink})
			const options = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(data),
			  url:apiUrl+'/selectTestNum.php',
			};
			axios(options)
			.then((response)=>{
			  	this.setState({testNum:response.data},()=>{
					const dataT = ({'no': this.state.testNum, 'value': 'time'});
					const optionsT = {
					  method: 'POST',
					  headers: { 'content-type': 'application/x-www-form-urlencoded' },
					  data: qs.stringify(dataT),
					  url:apiUrl+'/select_name_time.php',
					};
					axios(optionsT)
					.then((response)=>{
						 this.setState({time:parseInt(response.data, 10)});
					})
					.catch(function (error) {
						console.log(error);
					});
					const testNumber='test'+this.state.testNum+'_correct';
					const dataQ = ({'testNumber':testNumber});
					const optionsQ = {
						  method: 'POST',
						  headers: { 'content-type': 'application/x-www-form-urlencoded' },
						  data: qs.stringify(dataQ),
						  url:apiUrl+'/select_test_questions.php',
					};
					axios(optionsQ)
					.then((response)=>{
							this.setState({questions:response.data})
					})
					.catch(function (error) {
							console.log(error);
					});
					const dataN = ({'no': this.state.testNum , 'value': 'name'});
					const optionsN = {
						  method: 'POST',
						  headers: { 'content-type': 'application/x-www-form-urlencoded' },
						  data: qs.stringify(dataN),
						  url:apiUrl+'/select_name_time.php',
					};
					axios(optionsN)
					.then((response)=>{
							this.setState({testname: response.data})
					})
					.catch(function (error) {
							console.log(error);
					});
				});
				})
			  .catch(function (error) {
					console.log(error);
			  });
	}

  render() {
    return (
      <div>
	   		<GeneralTest testNo={this.state.testNum} questions={this.state.questions} testname={this.state.testname} time={this.state.time} auth={auth} hist={this.props.match.params.test}/>
      </div>
    );
  }
}

export default TestLinkConstructor;
