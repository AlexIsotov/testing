import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import LoginAdm from '../components/loginAdm';
import Hidden from '../components/hidden';
import NotHidden from '../components/notHidden';
import NavBar from '../routes/navBar';
import Copy from '../components/pics/copy.png';

class Tests extends Component {
constructor(props){
	super(props);
	this.state=({

		tests:[],
	
	})
}


componentDidMount(){
	const data = ({'testNum': 'tests_names'});
		const optionsT = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:'/select_test.php',
		};
		axios(optionsT)
		  .then((response)=>{
			this.setState({names: response.data}, ()=>{
			const options = {
			  method: 'GET',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  url:'/selectTestsDataEnc.php',
			};
			axios(options)
			  .then((response)=>{
				this.setState({tests: response.data})
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
	  const {isAuthenticated, isCaptched} = this.props.auth;
    return (
      <div>
	  {(!isAuthenticated() && !isCaptched()) ? 
	  <div>
			
		  <NavBar auth={this.props.auth}/>
		  <div className="table-responsive-sm">
		  <table className="table table-sm table-bordered table-hover" >
		  <thead className="thead-light"><tr><th>Тест</th><th>Логин</th><th>Пароль</th><th>Ссылка</th></tr></thead>
		  <tbody>
		  {this.state.tests.length>0? 
		  this.state.tests.map((test)=>{return(
		  
		  <tr key={Math.floor(Math.random()*10000)}>
			  <td>
				<NotHidden names={this.state.names[test-1][2]} test={test}  idd={'id'+Math.floor(Math.random() * 1000000)}/>
			  </td>
			  <td>
			  <Hidden data={'login'} number={test} idd={'id'+Math.floor(Math.random() * 1000000)}/>
			  </td>
			  <td>
			  <Hidden data={'pass'} number={test} idd={'id'+Math.floor(Math.random() * 1000000)}/>
			  </td>
			  <td>
			  <Hidden data={'link'} number={test} idd={'id'+Math.floor(Math.random() * 1000000)}/>
			  </td>
			  
		  </tr>
		  
		  )}):
		  <tr><td>Loading...</td></tr>}
		  </tbody>
		  </table>
		  </div>
		   <p className="text-muted ml-2"> *Для отображения скрытого содержимого - нажмите правую кнопку мыши.<br/> Для копирования нужных данных - кликните по ним левой кнопкой мыши
		   <br/>Для копирования всей информации по доступу к тесту - нажмите по кнопке <img src={Copy} alt="Copy" height={14} width={14} /></p>

	  </div>:
	  <LoginAdm auth={this.props.auth} />
	  }
	 
      </div>
    );
  }
}

export default Tests;
