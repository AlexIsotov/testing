import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export class QaConstructor extends Component {
constructor(props){
	super(props);
	this.state={
		answer:'',
		question:'',
		
	}
}

handleAnswerChange(e){
		e.preventDefault();
		let val=e.target.value;
		if(val.length<5000){
		this.setState({
			[e.target.name]:val,
			});}
		else {alert('Извините, но стоит ограничение на 5000 символов. Вам стоит это учитывать.')}
		
	}
handleAnswerSubmit(e){
		e.preventDefault();
		
		this.props.counter(1);
		const data = ({'answer':this.state.answer, 'id':this.props.id});
		const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:'/insertAnswer.php',
		};
		axios(options)
		  .then(function (response) {
			})
		  .catch(function (error) {
			console.log(error);
		  });
		   if (this.props.end===true){
			 const dataMail = ({'id':this.props.id, 'name':this.props.name[0]});
				const optionsMail = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataMail),
			  url:'/sendMail.php',
			};
			axios(optionsMail)
			  .then(function (response) {
				})
			  .catch(function (error) {
				console.log(error);
			  }); 
		  }
		this.setState({
			answer:'',
			
		})
		
	}
	componentDidMount(){
		if(this.props.question){
			this.setState({question: this.props.question[0]})
		}
	}
  render() {
	  const {end} = this.props;
    return (
      <div>
	  <div className="container">
      <h4 className="text-center" dangerouslySetInnerHTML={{ __html: this.state.question.replace(/\n\r?/g, '<br />')}}></h4>
	  
      <form onSubmit={(e)=>this.handleAnswerSubmit(e)} >
		<div className="container">
		<div className="form-group">
			<textarea className="form-control" type="text" 
			placeholder="Ответ" name="answer"
			onChange={(e)=>this.handleAnswerChange(e)}  value={this.state.answer} 
			rows={6} autoFocus={true} required/>
		</div>
		</div>
		{end!==true ? (
			<div className="d-flex justify-content-center">
				<button className="btn btn-outline-dark btn-lg mr-1" data-toggle="tooltip" data-placement="bottom" title="Перейти к следующему вопросу">Следующий вопрос</button>				
			</div>):
		(<div className="d-flex justify-content-center">
				<button className="btn btn-outline-dark btn-lg mr-1" data-toggle="tooltip" data-placement="bottom" title="Завершить тест">Завершить тест</button>				
		</div>)}
	 </form>
	 </div>
      </div>
    );
  }
}

export default QaConstructor;
