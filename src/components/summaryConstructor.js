import React, { Component } from 'react';
import OutputCommentConstructor from './outputCommentConstructor';

import RadialChart from './radialChart';
import axios from 'axios';
import qs from 'qs';



class SummaryConstructor extends Component {
	constructor(props){
		super(props);
		this.state={
			userAnswers:[],
			correctAnswers:[],
			userAnswer:[],
			userName:[],
			max:0,
			current:0,
			names:[],
			
		}
	}
componentDidMount(){
	  const testNum='test'+this.props.match.params.num+'_correct';
	  const data = ({'id':this.props.match.params.user});
	  const dataa = ({'testNum':testNum});
		const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:'/selectUserAnswers.php',
		};
		const optionsTest = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(dataa),
		  url:'/select_test.php',
		};
		const optionsUser = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:'/selectUserNames.php',
		};
		const dataT = ({'testNum': 'tests_names'});
		const optionsT = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(dataT),
		  url:'/select_test.php',
		};
				
		axios(optionsUser)
		.then((response)=>{
		this.setState({userName:response.data},()=>{
		  if(this.state.userName[0][3]===this.props.match.params.num && this.state.userName[0][4]!=='false')
		  { 
			  axios(options)
			  .then((response)=> {
				this.setState({userAnswer: response.data},()=>{
					axios(optionsTest)
					  .then((response)=> {
						this.setState({correctAnswers: response.data},()=>{
							let array = this.state.correctAnswers;
							let arrayUser=[];
							arrayUser= this.state.userAnswer;
							for (let i=0;i<array.length; i++){
								if (arrayUser[i]==null){arrayUser[i]=[i,'No_answer']; array[i].push(arrayUser[i][1]);}
								else{for(let j=0;j<arrayUser[i].length;j++){array[i].push(arrayUser[i][j+1]);}}
							}
							this.setState({userAnswers:array}, ()=>{
								let markSum=0;
								let markUser=0;
								for(let i=0;i<this.state.userAnswers.length;i++){
									markSum=markSum+parseInt(this.state.userAnswers[i][3], 10);
									if(this.state.userAnswers[i][6]){
										markUser=markUser+parseInt(this.state.userAnswers[i][6], 10);
									}
								}
								this.setState({max:markSum, current:markUser}, ()=>{
									axios(optionsT)
									  .then((response)=>{
										  console.log(response.data);
									  this.setState({names: response.data[this.state.userName[0][3]-1][2]})})
									  .catch(function (error) {
										console.log(error);
									  });	
								});
								
							}
							);
								});
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
		  else {this.setState({userName:'failed'})}
		  
		})
		})
		.catch(function (error) {
			console.log(error);
		  });
		  
	
}

  render() {
	  
    return (
      <div>
	  {this.state.userName!=='failed' ? 
	  <div className="bg-light container">
	  <h2 className="text-center border-bottom bg-light py-1" style={{fontFamily:"Avantgarde"}}>Результаты теста</h2>
	 {this.state.userName.map(name=>{return (
	  <div className="d-flex justify-content-md-center pt-2" key={name[1]}>
			<div className="mt-4">
				<h6 style={{fontFamily:"Helvetica"}}>{name[0]+' '+name[1]}</h6>
				<div className="d-flex justify-content-start">
					<p style={{fontFamily:"Helvetica"}}>Тест №{name[3]}</p>
					<p className="ml-1"style={{fontFamily:"Helvetica"}}><strong>"{this.state.names}"</strong></p>
				</div>
				<p  style={{fontFamily:"Helvetica"}}><strong>{this.state.current}</strong> из <strong>{this.state.max}</strong> баллов</p>
			</div>
			<div>
				{name[2]!=='NaN' ? 
				name[2]>=70 && name[2] <=100?
				 <RadialChart
					progress={parseInt(name[2], 10)}
					color="#32CD32"
				  /> :
				name[2]>=60 && name[2]<=70?
				<RadialChart
					progress={parseInt(name[2], 10)}
					color="#FFA500"
				  />:
				<RadialChart
					progress={parseInt(name[2], 10)}
					color="#B22222"
				  />:
		<p className="alert alert-danger rounded p-1">Тест не завершен</p>}
		</div>
	  </div>
	  )})
	  }
	  </div>:
	  <p className="alert alert-warning text-center">Ошибка! Не удалось загрузить данные о тестируемом</p>}
	  	{this.state.userAnswer.length>0 ? this.state.userAnswers.slice().map((table)=>{
			 return(
									<div  className="container border mt-2" style={{background:'gainsboro'}} key={Math.floor(Math.random() * 88855500)} >
										
										<h3 className="text-center ">№ {table[0]}</h3>
										<div className="border bg-light" >
											<div className="mt-1 ml-1">
											<p><strong>Вопрос:</strong></p>
											<p className="border-bottom" dangerouslySetInnerHTML={{ __html: table[1].replace(/\n\r?/g, '<br />')}}></p>
											<p><strong>Ответ:</strong></p>
											<p className="border-bottom" dangerouslySetInnerHTML={{ __html: table[4].replace(/\n\r?/g, '<br />')}}></p>
											<p><strong>Правильный ответ:</strong></p>
											<p dangerouslySetInnerHTML={{ __html: table[2].replace(/\n\r?/g, '<br />')}}></p>
											</div>
										</div>
									
										{table[4]==='No_answer' ? <div key={Math.floor(Math.random() * 9000)} className="table-warning text-center"><strong>Ответ отсутствует!</strong></div> :
										<div className="mt-1" >
										 <OutputCommentConstructor maxMark={table[3]} defComValue={table[5]} defMarkValue={table[6]} />
										</div>}
									</div>
									
									
			) }): <p className="alert alert-danger text-center">Wrong Result Data!</p>}
      </div>
    );
  }
}

export default SummaryConstructor;
