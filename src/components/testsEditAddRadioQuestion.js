import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import {apiUrl} from '../constants/apiUrl';
let answers=[];

export class TestsEditAddRadioQuestion extends Component {
	constructor(props){
		super(props);
		this.state=({
			question:'',
			answer:'',
			mark:0,
			id: 1,
			answers: []
		})
	}

	handleChange = e =>{
		this.setState({[e.target.name]:e.target.value})
	}

	cancel = () =>{
		this.props.cancel();
	}

	addAnswer = e =>{
		e.preventDefault();
		let variant={};
		variant.id=this.state.id;
		variant.answer=this.state.answer;
		answers.push(variant);
		this.setState({answers: answers, answer:'', id: this.state.id+1});
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
				  <p>Варианты ответа:</p>
					{this.state.answers!==[] && this.state.answers.map((el)=>{
						return <div key={el.id}>
										<input type='radio' name='variant'/> {el.id+'. '+el.answer} <br/>
									 </div>
					})}
				  <textarea className="form-control" name="answer" value={this.state.answer} onChange={this.handleChange} rows="5" required/>
					<button onClick={this.addAnswer}>Добавить вариант</button>
					<p>Максимальный балл:</p>
				  <input type="number" className="form-control" name="mark" onChange={this.handleChange} required/>
				  <button className="btn btn-info btn-lg btn-block ml-1 mt-2" data-toggle="tooltip" data-placement="bottom" title="Добавить к списку вопросов">Добавить</button>
				</form>
			  <button className="btn btn-danger btn-lg btn-block ml-1 mt-2" data-toggle="tooltip" data-placement="bottom" title="Отмена" onClick={this.cancel}>Отмена</button>
      </div>
    );
  }
}

export default TestsEditAddRadioQuestion;
