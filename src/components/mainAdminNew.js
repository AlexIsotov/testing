import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import {Link} from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import UsersTableConstructor from './usersTableConstructor';
import InputCommentConstructor from './inputCommentConstructor';
import {apiUrl} from '../constants/apiUrl';

let arrCom=[];
let arrMark=[];

export class MainAdminNew extends Component {
	constructor(props){
		super(props);
		this.state={
			dataUsers:[],
			userValue:'',
			userAnswers:[],
			comments:[],
			userId:'',
			check:'',
			userName:'',
			modal: false,
			names:[]
		}

	}

	toggleModal = () => {
	    this.setState({
	      modal: !this.state.modal
	    });
	 }

	getUserAnswers = (value, id, check) =>{
		arrCom=[];
		arrMark=[];
	  this.setState({ userAnswers: value, userId: id, check: check, modal: true })
	}

	getComment = (value , index) =>{
		arrCom[index] = value;
	}

	getMark = (value , index) =>{
		arrMark[index] = value;
	}

	handleSubmit = e =>{
		e.preventDefault();
		let comObj={};
		let markObj={};
		let arrComObj=[];
		let arrMarkObj=[];
		let markSum=0;
		let maxMarkSum=0;
		let percentage=0;
		let arrUserMarks=[];
		for(let i=0;i<arrCom.length;i++){
			comObj={index:i+1, comment: arrCom[i]};
			if(comObj.comment) {
			arrComObj.push(comObj);}
		}
		if(arrMark.length!==0){
			for(let i=0;i<this.state.userAnswers.length;i++){
				arrUserMarks[i]=this.state.userAnswers[i][6];
			}

			for(let i=0;i<arrMark.length;i++){
				if(arrMark[i]){
					arrUserMarks[i]=arrMark[i];
					markObj={index:i+1, mark: arrMark[i]};
					arrMarkObj.push(markObj);
				}
			}
			for(let i=0;i<arrUserMarks.length;i++){
				if(arrUserMarks[i]){
					markSum=markSum+parseInt(arrUserMarks[i], 10)
				}
			}
		 }
		 else {
				for(let i=0;i<this.state.userAnswers.length;i++){
					if(this.state.userAnswers[i][6]){
						markSum=markSum+parseInt(this.state.userAnswers[i][6], 10)
					}
				}
		 }
	 	 for(let i=0; i<this.state.userAnswers.length; i++){
			maxMarkSum=maxMarkSum+parseInt(this.state.userAnswers[i][3], 10);
		 }
		 percentage=Math.round(100*(markSum/maxMarkSum));
		 const data = ({'comment':arrComObj,'id': this.state.userId, 'mark':arrMarkObj});
		 const options = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(data),
			  url:apiUrl+'/insertComment.php',
		 };
		 axios(options)
		 .then((response)=>{
		   const dataCheck = ({'id':this.state.userId, 'percentage': percentage});
		   const optionsCheck = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataCheck),
			  url:apiUrl+'/insertChecked.php',
			 };
			 axios(optionsCheck)
			 .then((response)=>{
			 })
			 .catch((error)=> {
				console.log(error);
			 });
			 this.setState({userValue: 'checked'}, ()=>{
					for(let i=0; i<this.state.dataUsers.length; i++){
						if (this.state.dataUsers[i][3]===this.state.userId){this.setState({userName:this.state.dataUsers[i][1]+' '+this.state.dataUsers[i][2]}, ()=>{alert("Оценкa  "+this.state.userId+" "+this.state.userName+" поставлена");})}
					}
					this.setState({userAnswers:''})/*закрытие области оценивания*/
			 });
	   })
	   .catch((error)=> {
			console.log(error);
	   });
  }

	componentDidUpdate(prevState){
		 if(this.state.userValue === 'checked'){
			 const options = {
			  method: 'GET',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  url:apiUrl+'/selectUsers.php',
			 };
			 axios(options)
			 .then((response)=>{
				this.setState({dataUsers:response.data, userValue:''})
			 })
			 .catch(function (error) {
				console.log(error);
			 });
		 }
	 }

	componentDidMount(){
			const data = ({'testNum': 'tests_names'});
			const optionsT = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(data),
			  url:apiUrl+'/select_test.php',
			};
			axios(optionsT)
			.then((response)=>{
				this.setState({names: response.data},()=>{
				const options = {
					  method: 'GET',
					  headers: { 'content-type': 'application/x-www-form-urlencoded' },
					  url:apiUrl+'/selectUsers.php',
				 };
				 axios(options)
				 .then((response)=>{
						this.setState({dataUsers:response.data})
					})
					.catch(function (error) {
						console.log(error);
					});
				})
				})
			 .catch(function (error) {
				console.log(error);
			 });
	}

  render() {
    return (
      <div>
				<UsersTableConstructor dataUsers={this.state.dataUsers} userAnswers={this.getUserAnswers} names={this.state.names}/>
				{this.state.userAnswers.length>0 && (
				<Modal isOpen={this.state.modal} toggle={this.toggleModal} size={"lg"} className={this.props.className}>
				  <ModalHeader className="container" style={{background:'lightgrey'}} toggle={this.toggleModal}>
					 <div className="container" >
					 <div className="d-flex justify-content-center">
					  	<h3 className="ml-2"> Оценивание тестируемого  </h3>
					 </div>
					 </div>
				  </ModalHeader>
		      <form onSubmit={this.handleSubmit}>
				 		<ModalBody>
						  <div className="d-flex justify-content-center">
							{(this.state.dataUsers.map((user)=>{
							return(  this.state.userId===user[3] &&(
							<div className="d-flex justify-content-between" key={user[3]}>
								<h4 className="mr-2"> <em>{user[1] +' '+user[2]+ ' | ' +user[3] }</em></h4>
								<Link to={"/summary/"+user[3]+"/"+user[4]} target="_blank"><small>Предпросмотр результата</small></Link>
							</div>))
						  }))}
						  </div>
							{this.state.userAnswers.map((table)=>{
							 return(
									<div  className="container border mt-2 pb-2" style={{background:'gainsboro'}} key={Math.floor(Math.random() * 88855500)} >
										<h3 className="text-center ">№ {table[0]}</h3>
										<div className="border bg-light" >
											<div className="mt-1 ml-1">
												<p><strong>Вопрос:</strong></p>
												<p className="border-bottom" dangerouslySetInnerHTML={{ __html: table[1].replace(/\n\r?/g, '<br />')}} ></p>
												<p><strong>Ответ:</strong></p>
												<p className="border-bottom" dangerouslySetInnerHTML={{ __html: table[4].replace(/\n\r?/g, '<br />')}} ></p>
												<p><strong>Правильный ответ:</strong></p>
												<p dangerouslySetInnerHTML={{ __html: table[2].replace(/\n\r?/g, '<br />') }}></p>
											</div>
										</div>
										{table[4]==='No_answer' ? <div key={Math.floor(Math.random() * 9000)} className="table-warning mt-1 text-center"><strong>Нечего оценивать!</strong></div> :
										<div className="mt-1" >
										 <InputCommentConstructor index={table[0]-1} getComment={this.getComment} getMark={this.getMark} defComValue={table[5]} defMarkValue={table[6]} maxMark={table[3]}/>
										</div>}
									</div>
							) })}
		          </ModalBody>
							{this.state.check!=='true' ?
							<div className="d-flex justify-content-center mt-1 pb-4">
							<div className="w-75">
								<button className="btn btn-lg btn-block btn-info"> Оценить! </button>
							</div>
							</div>:
							<div className="d-flex justify-content-center pb-2">
								<div className="w-75">
									<button className="btn btn-lg btn-block btn-info"> Оценить повторно! </button>
									<p className="alert alert-warning text-center">Тест уже оценен! Хотите оценить повторно?</p>
								</div>
							</div>
							}
						</form>
		       </Modal>
			     )}
      </div>
    );
  }
}
export default MainAdminNew;
