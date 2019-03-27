import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import {apiUrl} from '../constants/apiUrl';

export class TestsEditAddQuestion extends Component {
	constructor(props){
		super(props);
		this.state=({
			question:'',
			answer:'',
			mark:0,
		})
	}

	handleChange = e =>{
		this.setState({[e.target.name]:e.target.value})
	}

	cancel = () =>{
		this.props.cancel();
	}

	addQuestion = e =>{
		e.preventDefault();
		const testNum=('test'+parseInt(this.props.test, 10)+'_correct');
		const dataTest = ({'test': testNum, 'que': this.state.question, 'answ':this.state.answer, 'mark':this.state.mark, 'no':this.props.no});
		const optionsTest = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataTest),
			  url:apiUrl+'/insertQuestion.php',
		};
		axios(optionsTest)
		.then((response)=>{
				console.log(response);
				this.setState({question:'', answer:'', mark:''}, ()=>{
					this.props.cancel();
					this.props.upd(this.props.test);
				});
		})
		.catch(function (error) {
				console.log(error);
		});
	}

  render() {
   return (
      <div>
        <form onSubmit={(e)=>this.addQuestion(e)}>
				  <p>Вопрос:</p>
				  <textarea className="form-control" name="question" value={this.state.question} onChange={this.handleChange} rows="5" required/>
				  <p>Правильный ответ:</p>
				  <textarea className="form-control" name="answer" value={this.state.answer} onChange={this.handleChange} rows="5" required/>
				  <p>Максимальный балл:</p>
				  <input type="number" className="form-control" name="mark" onChange={this.handleChange} required/>
				  <button className="btn btn-info btn-lg btn-block ml-1 mt-2" data-toggle="tooltip" data-placement="bottom" title="Добавить к списку вопросов">Добавить</button>
				</form>
			  <button className="btn btn-danger btn-lg btn-block ml-1 mt-2" data-toggle="tooltip" data-placement="bottom" title="Отмена" onClick={this.cancel}>Отмена</button>
      </div>
    );
  }
}

export default TestsEditAddQuestion;
