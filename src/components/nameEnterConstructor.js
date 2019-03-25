import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import {apiUrl} from '../constants/apiUrl';

export class NameEnterConstructor extends Component {
	constructor(props){
		super(props);
		this.state={
			firstName:'',
			lastName:'',
		}
	}

	handleFirstnameChange(e){
			e.preventDefault();
			let val=e.target.value;
			if(val.length<25){
				this.setState({
					[e.target.name]:val,
				});
			}
			else {alert('Chill!')}
	}

	handleLastnameChange(e){
			e.preventDefault();
			let val=e.target.value;
			if(val.length<25){
				this.setState({
					[e.target.name]:val,
				});
			}
			else {alert('Chill!')}
	}

	handleNameSubmit(e){
			e.preventDefault();
			let id='id' + Math.floor(Math.random() * 100000000);
			let date = new Date().toLocaleString();
			const data = ({'firstName':this.state.firstName, 'lastName':this.state.lastName, 'id':id, 'testNo':this.props.testNo, 'date':date, 'checked': 'false'});
			const options = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(data),
			  url:apiUrl+'/insertUser.php',
			};
			axios(options)
			.then( (response)=> {
			})
			.catch(function (error) {
				console.log(error);
		  });
			this.props.counter(1);
			this.props.getId(id);
			this.setState({
				firstName:'',
				lastName:'',
			})
 }
  render() {
    return (
			<div className="form-name">
		      <div className="container border rounded mt-3 py-5 bg-light">
			  		<h2 className="text-center ">{this.props.testName}</h2>
		       	<h4 className="text-center text-muted pb-2">Пожалуйста, введите ваши Имя и Фамилию </h4>
		      	<form onSubmit={(e)=>this.handleNameSubmit(e)} >
								<div className="form-group">
									<div className="d-flex justify-content-center">
										<input className="form-control" id="firstName" type="text"
										placeholder="Имя" name="firstName"
										onChange={(e)=>this.handleFirstnameChange(e)}  value={this.state.firstName}
										required autoComplete="off"/>
									</div>
								</div>
								<div className="form-group">
									<div className="d-flex justify-content-center">
										<input className="form-control" id="lastName" type="text"
										placeholder="Фамилия" name="lastName"
										onChange={(e)=>this.handleLastnameChange(e)}  value={this.state.lastName}
										required autoComplete="off"/>
									</div>
								</div>
								<div className="d-flex justify-content-center mt-2">
									<button className="btn btn-dark btn-lg mr-1" data-toggle="tooltip" data-placement="bottom" title="Запустить тестирование">Начать тест!</button>
								</div>
			 		</form>
		    </div>
		 </div>
    );
  }
}
export default NameEnterConstructor;
