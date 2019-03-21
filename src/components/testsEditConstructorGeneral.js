import React, { Component } from 'react';
import TestsEditConstructorDesignGeneral from './testsEditConstructorDesignGeneral';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import {apiUrl} from '../constants/apiUrl';

class TestsEditConstructorGeneral extends Component {
	constructor(props){
		super(props);
		this.state=({
			credit:[],
			modal:false,
			type: 'password',
			login:'',
			pass:'',
			link:'',
		})
	}

	handleChange = e =>{
		this.setState({[e.target.name]:e.target.value})
	}

	toggleModal = () => {
	    this.setState({
	      modal: !this.state.modal
	 		});
	 }

	 gen_password= (val,len) =>{
	  let password = "";
		let symbols="";
		switch (val) {
		  case "login":
			 symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			break;
		  case "pass":
		   symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			break;
		  case "link":
			symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			break;
		  default:
			symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		}
	    for (var i = 0; i < len; i++){
	        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
	    }
	    return password;
	}

	generate = e =>{
		e.preventDefault();
		this.setState({
			login:this.gen_password('login', 10),
			pass:this.gen_password('pass', 12),
			link:'test/'+this.gen_password('link', 21)
		})
	}

	show = () =>{
		this.setState({type: this.state.type==='password'? 'text' : 'password'});
	}

	cancel = e =>{
		e.preventDefault();
		this.setState({modal:false});
	}

	editCredit = () =>{
		const dataTest = ({'no':this.props.testNumber});
		const optionsTest = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataTest),
			  url:apiUrl+'/getAllTestCredits.php',
			};
			axios(optionsTest)
		  .then((response)=>{
				this.setState({login:response.data[2], pass:response.data[3], link:response.data[4]});
			})
		  .catch(function (error) {
				console.log(error);
		  });
		  this.toggleModal();
	}

	submitEdition = e =>{
		e.preventDefault();
		const dataTest = ({'login': this.state.login, 'pass':this.state.pass, 'link':this.state.link, 'no':parseInt(this.props.testNumber,10)});
		const optionsTest = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataTest),
			  url:apiUrl+'/edit_test_credits.php',
			};
			axios(optionsTest)
		  .then((response)=>{
				this.setState({login:'', pass:'', link:'', modal:false}, ()=>{
					this.props.upd(this.props.testNumber);
				});
			})
		  .catch(function (error) {
				console.log(error);
		  });
	}

  render() {
    return (
      <div className="rounded ">
							<table  className="table table-sm table-bordered table-hover" >
								<tbody>
									<tr><th >Название теста:</th><td><TestsEditConstructorDesignGeneral no={this.props.testNumber} val={this.props.name} type={"name"} upd={this.props.upd}/></td></tr>
									<tr><th >Время на выполнение:</th><td><TestsEditConstructorDesignGeneral no={this.props.testNumber} val={this.props.time} type={"time"} upd={this.props.upd}/></td></tr>
								</tbody>
							</table>
						  <button className="btn btn-success btn-sm btn-block" onClick={this.editCredit} data-toggle="tooltip" data-placement="bottom" title="Редатировать данные для доступа к тесту">Доступы</button>
							<Modal isOpen={this.state.modal} toggle={this.toggleModal} size={"lg"} className={this.props.className}>
			  				<ModalHeader className="container" style={{background:'lightgrey'}} toggle={this.toggleModal}>
								 <div className="container" >
									 <div className="d-flex justify-content-center">
									  	<h3 className="ml-2"> Изменение данных для доступа</h3>
									 </div>
			 				 	 </div>
			  			 	</ModalHeader>
							  <ModalBody>
							    <form onSubmit={(e)=>this.submitEdition(e)}>
								    <div className="form-group">
										 	<label>Логин:</label>
											<input type={this.state.type} className="form-control" name="login" value={this.state.login} onChange={this.handleChange} placeholder="Логин" autoComplete="false" required/>
										</div>
										<div className="form-group">
											<label>Пароль:</label>
											<input type={this.state.type} className="form-control" name="pass" value={this.state.pass} onChange={this.handleChange} placeholder="Пароль" autoComplete="false" required/>
										</div>
										<div className="ml-3 d-flex justify-content-start">
											 <input className="form-check" type="checkbox" onChange={this.show} />
											 <small className="text-muted">Отобразить скрытые данные</small>
										</div>
										<div className="form-group">
											<label >Ссылка:</label>
											<input type="text" className="form-control" name="link" value={this.state.link} onChange={this.handleChange} placeholder="Ссылка" required/>
										</div>
										<div className="d-flex justify-content-end">
										 <button className="btn btn-warning mr-3" data-toggle="tooltip" data-placement="bottom" title="Заполнить поля случайными уникальными значениями" onClick={this.generate}>Сгенерировать!</button>
										 <button className="btn btn-primary mr-1 mr-1" data-toggle="tooltip" data-placement="bottom" title="Сохранить изменения">Сохранить</button>
										 <button className="btn btn-primary mr-1 ml-1" data-toggle="tooltip" data-placement="bottom" title="Закрыть окно редактирования" onClick={this.cancel}>Отмена</button>
										</div>
								  </form>
							  </ModalBody>
							</Modal>
      </div>
    );
  }
}

export default TestsEditConstructorGeneral;
