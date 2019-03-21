import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {apiUrl} from '../constants/apiUrl';

export class TestsEditAddTest extends Component {
  constructor(props){
		super(props);
		this.state=({
		modal: false,
		login:'',
		pass:'',
		link:'',
		})
	}

	toggleModal = () => {
	    this.setState({
	      modal: !this.state.modal,
				login:'',
				pass:'',
				link:'',
	    });
	  }

	handleChange = e =>{
		this.setState({[e.target.name]:e.target.value})
	}

	gen_password = (val,len) =>{
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

	generate=(e)=>{
		e.preventDefault();
		this.setState({
			login:this.gen_password('login', 10),
			pass:this.gen_password('pass', 12),
			link:'test/'+this.gen_password('link', 21)
		})
	}

	addNewTest=(e)=>{
		e.preventDefault();
		const testNum=('test'+(this.props.no)+'_correct');
		const fullLink=this.state.link;
		const dataTest = ({'test': testNum, 'login': this.state.login, 'pass':this.state.pass, 'link':fullLink, 'no':this.props.no});
		const optionsTest = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataTest),
			  url:apiUrl+'/insertNewTest.php',
			};
	  axios(optionsTest)
		.then((response)=>{
			 this.setState({login:'', pass:'', link:'', modal:false}, ()=>{
				this.props.upd(this.props.no);
			});
		 })
		 .catch(function (error) {
				console.log(error);
		 });
	}

  render() {
   return (
      <div>
				<div className="d-flex justify-content-start mr-2">
	     		<button className="btn btn-info mt-2" data-toggle="tooltip" data-placement="bottom" title="Добавить новый тест" onClick={this.toggleModal} >Добавить тест</button>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggleModal} >
	        <ModalHeader toggle={this.toggleModal}>Добавление нового теста</ModalHeader>
	        <ModalBody>
					  <form onSubmit={(e)=>this.addNewTest(e)}>
					    <div className="form-group">
								<label>Логин:</label>
								<input type="text" className="form-control" name="login" value={this.state.login} onChange={this.handleChange} placeholder="Логин" required/>
							</div>
							<div className="form-group">
								<label>Пароль:</label>
								<input type="text" className="form-control" name="pass" value={this.state.pass} onChange={this.handleChange} placeholder="Пароль" required/>
							</div>
							<div className="form-group">
								<label>Ссылка<span className="text-muted"></span>:</label>
								<input type="text" className="form-control" name="link" value={this.state.link} onChange={this.handleChange} placeholder="Ссылка" required/>
							</div>
							<div className="d-flex justify-content-end">
							 <button className="btn btn-warning mr-2" data-toggle="tooltip" data-placement="bottom" title="Если не охота придумывать-сгенерируй случайные значения" onClick={this.generate}>Сгенерировать!</button>
							 <button className="btn btn-primary mr-1" data-toggle="tooltip" data-placement="bottom" title="Добавить тест">Добавить</button>
							</div>
					  </form>
   			  </ModalBody>
	        </Modal>
      </div>
    );
  }
}

export default TestsEditAddTest;
