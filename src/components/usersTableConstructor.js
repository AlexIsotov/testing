import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import {Link} from 'react-router-dom';
import {apiUrl} from '../constants/apiUrl';

export class UsersTableConstructor extends Component {
constructor(props){
	super(props);
	this.state={
		dataUser:[],
		userAnswers:[],
		userAnswer:[],
		correctAnswers:[],
		loadMore: 0,
		loadMoreDisable:false,
		loadLessDisable: true,
		page:1,
		search:'',
		filterByTest:'',
		filterByCheck:'',
		showPage: 5,
	}
}

next = () =>{
	this.setState({loadMore:this.state.loadMore+this.state.showPage, page:this.state.page+1, loadLessDisable: this.state.loadLessDisable===true && false},
	()=>{this.setState({loadMoreDisable: this.state.loadMore+this.state.showPage>=this.state.dataUser.length ? true: false})})
}

prev = () =>{
	this.setState({loadMore: this.state.loadMore-this.state.showPage, page: this.state.page-1, loadMoreDisable: this.state.loadMoreDisable===true && false},
	()=>{this.setState({loadLessDisable: this.state.loadMore-this.state.showPage<0 && true})})
}

showAnswers = (id , num, check) => {
	  const testNum='test'+num+'_correct';
	  const data = ({'id':id});
	  const dataa = ({'testNum':testNum});
		const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:apiUrl+'/selectUserAnswers.php',
		};
		const optionsTest = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(dataa),
		  url:apiUrl+'/select_test.php',
		};
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
						this.setState({userAnswers:array},()=>{
							this.props.userAnswers(this.state.userAnswers, id, check);
						});
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

showPage = e =>{
	this.setState({[e.target.name]: parseInt(e.target.value, 10)},()=>{this.setState({loadMoreDisable: this.state.page===Math.ceil(this.state.dataUser.length/this.state.showPage)? true : false})})
}

showAll = () =>{
	this.setState({loadMore: 0, showPage:this.props.dataUsers.length, loadMoreDisable: true, page: 1, loadLessDisable:true})
}

search = e =>{
	this.setState({[e.target.name]: e.target.value},()=>{
		let arraySearchUser = [];
		if(!this.state.filterByTest && !this.state.filterByCheck)
			{for(let i=0;i<this.props.dataUsers.length;i++){
				if(~this.props.dataUsers[i][2].toLowerCase().indexOf(this.state.search))
				{
					arraySearchUser.push(this.props.dataUsers[i])}
				}
			 this.setState({dataUser: arraySearchUser});
			}
		else
			{for(let i=0;i<this.props.dataUsers.length;i++){
				if(~this.props.dataUsers[i][2].toLowerCase().indexOf(this.state.search) && (~this.props.dataUsers[i][6].indexOf(this.state.filterByCheck) && ~this.props.dataUsers[i][4].indexOf(this.state.filterByTest)))
				{
					arraySearchUser.push(this.props.dataUsers[i])}
				}
			 this.setState({dataUser: arraySearchUser});
			}
		})
}

clear = () =>{
	if(this.state.search) {
	this.setState({search: '', dataUser: this.props.dataUsers})
	}
}

filterByTest= e =>{
	this.setState({[e.target.name]: e.target.value, page: 1, loadLessDisable:true, loadMore: 0},()=>{
		let arraySearchTest = [];
		if(!this.state.filterByCheck && !this.state.search){
		for(let i=0;i<this.props.dataUsers.length;i++){
			if(~this.props.dataUsers[i][4].indexOf(this.state.filterByTest))
			{
				arraySearchTest.push(this.props.dataUsers[i])}
		  }
		this.setState({dataUser: arraySearchTest});
		}
		else
		{
			for(let i=0;i<this.props.dataUsers.length;i++){
				if(~this.props.dataUsers[i][4].indexOf(this.state.filterByTest) && (~this.props.dataUsers[i][6].indexOf(this.state.filterByCheck) && ~this.props.dataUsers[i][2].indexOf(this.state.search)))
				{
					arraySearchTest.push(this.props.dataUsers[i])}
				}
			this.setState({dataUser: arraySearchTest});
		}
	})
}

filterByCheck = e =>{
	this.setState({[e.target.name]: e.target.value, page: 1, loadLessDisable:true, loadMore: 0},()=>{
		let arraySearchCheck = [];
		if(!this.state.filterByTest && !this.state.search){
		for(let i=0;i<this.props.dataUsers.length;i++){
			if(~this.props.dataUsers[i][6].indexOf(this.state.filterByCheck))
			{
				arraySearchCheck.push(this.props.dataUsers[i])}
		  }
		this.setState({dataUser: arraySearchCheck});
		}
		else
		{
			for(let i=0;i<this.props.dataUsers.length;i++){
				if(~this.props.dataUsers[i][6].indexOf(this.state.filterByCheck) && (~this.props.dataUsers[i][4].indexOf(this.state.filterByTest) && ~this.props.dataUsers[i][2].indexOf(this.state.search)))
				{
					arraySearchCheck.push(this.props.dataUsers[i])}
				}
			this.setState({dataUser: arraySearchCheck});
		}
	})
}

componentDidUpdate(prevProps){
	 if(this.props.dataUsers!==prevProps.dataUsers){this.setState({dataUser: this.props.dataUsers});}
}

  render() {
    return (
      <div>
	  		<div className="d-flex justify-content-between">
			   	<div className="d-flex ml-1">
						<input className="form-conrol form-control-sm" placeholder="Поиск по фамилии" name="search"
						data-toggle="tooltip" data-placement="bottom" title="Поиск тестируемого по фамилии"
						value={this.state.search} onChange={this.search}/>
						<button type="button" className="close" aria-label="Close" onClick={this.clear}>
						  <span aria-hidden="true">&times;</span>
						</button>
			   	</div>
			   <div className="d-flex mr-1">
				   <span className="border-left bg-light mr-1">Фильтры:</span>
				   <div>
					 		<select className="form-control form-control-sm" name="filterByTest"
							data-toggle="tooltip" data-placement="bottom" title="Фильтровать по номеру теста"
							onChange={this.filterByTest} defaultValue="№ теста">
								<option  disabled > Выберите тест</option>
								<option value="" > Отобразить все</option>
								{this.props.names.length>0 &&
								this.props.names.map((name)=>{return(
								<option value={name[1]} key={name[0]}>{name[2]}</option>
								)})
								}
							</select>
		   		 </div>
		   		 <div>
							<select className="form-control form-control-sm" name="filterByCheck"
							data-toggle="tooltip" data-placement="bottom" title="Фильтровать по проверке"
							onChange={this.filterByCheck} defaultValue="Проверка">
								<option  disabled > Проверка</option>
								<option value="" > Все тесты</option>
								<option value="true">Только проверенные</option>
								<option value="false">Только непроверенные</option>
							</select>
		    	  </div>
		   		</div>
	  		</div>
	  		<div className="table-responsive">
	 				<table className="table table-sm table-bordered table-striped table-hover" >
	  				<thead className="thead-light"><tr><th>№</th><th>Имя</th><th>Фамилия</th><th>Id</th><th>Тест</th><th>Дата</th><th>Проверка</th><th>Результат</th><th>Время</th></tr></thead>
					  <tbody>
				      { this.state.dataUser.length>0 &&(
															this.state.dataUser.slice().reverse().slice(this.state.loadMore, this.state.loadMore+this.state.showPage).map((table)=>{
																return(
																<tr key={Math.floor(Math.random() * 1000000)}
																data-toggle="tooltip" data-placement="bottom" title="Нажмите для просмотра результата"
																onClick={()=>this.showAnswers(table[3], table[4], table[6])} >
																	{table.slice(0, 3).map((roww)=>{
																		return(
																	<td key={Math.floor(Math.random() * 1000000)}>
																		{roww}
																	</td>)})}
																	<td>
																		{table[table.length-3]==='false' ?
																		table[3] /*id*/ :
																		<Link target="_blank" to={"/summary/"+table[3]+"/"+table[4]}>{table[3]}</Link>
																		}
																	</td>
																	<td>
																		{this.props.names[table[4]-1][2] /*test*/}
																	</td>
																	<td>
																		{table[5] /*date*/}
																	</td>
																	<td>
																		{table[table.length-3]!=='false' ?
																		<input type="checkbox" checked={true} disabled/>:
																		<input type="checkbox" checked={false} disabled/>}
																	</td>
																	{table[table.length-2] ?
																		table[table.length-2]=== 'NaN' ?
																			<td  className="alert alert-danger">Не завершен</td>:
																			table[table.length-3]!=='false' ?
																				<td className="alert alert-success">{table[table.length-2]+'%'}</td> :
																				<td  className="alert alert-warning">Не проверен</td>:
																				<td  className="alert alert-warning">Не проверен</td>
																	}
																	<td>
																	{table[table.length-1] /*time*/}
																	</td>
																</tr>
					  ) }))}
					  </tbody>
      		</table>
	  		</div>
				<div>
			 		<div className="d-flex justify-content-between">
			   		<div className="ml-1">
							<button className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="bottom" title="Отобразить всех тестируемых" onClick={this.showAll}>Отобразить все</button>
			   		</div>
				    <div className="mr-1 form-inline">
							<span className="mr-1">Отобразить по:</span>
							<select className="form-control form-control-sm" name="showPage"
							data-toggle="tooltip" data-placement="bottom" title="Сколько элементов таблицы отображать на странице"
							onChange={this.showPage}  value={this.state.showPage}>
								<option value={5} >5</option>
								<option value={20}>20</option>
								<option value={50}>50</option>
								<option value={this.props.dataUsers.length}>Все</option>
							</select>
					  </div>
				  </div>
			 		<div className="d-flex justify-content-center">
				   <p>
						Стр. {this.state.page+' из '+ Math.ceil(this.state.dataUser.length/this.state.showPage)}
				   </p>
					</div>
					<div className="d-flex justify-content-center ">
						  <button className="btn btn-primary " onClick={this.prev} disabled={this.state.loadLessDisable} data-toggle="tooltip" data-placement="bottom" title="Предыдущая страница"> ← </button>
						  <button className="btn btn-primary " onClick={this.next} disabled={this.state.loadMoreDisable} data-toggle="tooltip" data-placement="bottom" title="Следующая страница"> → </button>
					</div>
				</div>
      </div>
    );
  }
}

export default UsersTableConstructor;
