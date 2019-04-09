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
			answers: [],
			selectedAnswer:'',
		})
	}

	handleChange = e =>{
		this.setState({[e.target.name]:e.target.value})
	}

	cancel = () =>{
		if(this.state.question!=='' || this.state.answer!=='' || this.state.answers.length>0)
		{
			let conf=window.confirm('Вы уверены, что хотите закрыть редактирование? Все данные о вопросе будут утеряны!');
			if(conf){
				this.setState({question:'', answer:'', mark:0, answers:[], selectedAnswer:'', id:1});
				this.props.cancel();
				answers=[];
			}
		}
		else {
			this.props.cancel();
		}
	}

	addAnswer = e =>{
		e.preventDefault();
		let variant={};
		variant.id=this.state.id;
		variant.answer=this.state.answer;
		answers.push(variant);
		this.setState({answers: answers, answer:'', id: this.state.id+1});
	}

	selectAnswer = e =>{
		this.setState({selectedAnswer: e.target.value});
	}
	addQuestion = e =>{
		e.preventDefault();
		const testNum=('test'+parseInt(this.props.test, 10)+'_correct');
		const dataTest = ({'test': testNum, 'que': this.state.question, 'answ':this.state.selectedAnswer, 'mark':this.state.mark, 'no':this.props.no, 'variants': this.state.answers});
		const optionsTest = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataTest),
			  url:apiUrl+'/insertRadioQuestion.php',
		};
		axios(optionsTest)
		.then((response)=>{
				console.log(response);
				this.setState({question:'', answer:'', mark:0, answers:[], selectedAnswer:''}, ()=>{
					this.props.cancel();
					this.props.upd(this.props.test);
					answers=[];
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
						return (
							<div key={el.id} className="btn-group-toggle py-2">
								 <label key={el.id} className={this.state.selectedAnswer===el.answer? "btn btn-block btn-lg btn-outline-success active" :'btn  btn-block btn-lg btn-outline-dark'}>
									 <input type='radio' name='variant' value={el.answer} autoComplete="off" checked={this.state.selectedAnswer===el.answer} onChange={this.selectAnswer}/> {el.id+'. '+el.answer} <br/>
								 </label>
							</div>
						)
					})}
				  <textarea className="form-control" name="answer" value={this.state.answer} onChange={this.handleChange} rows="5" />
					<div className="d-flex justify-content-end">
						<button className="btn btn-warning btn-sm mt-1" onClick={this.addAnswer}>Добавить вариант</button>
					</div>
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
