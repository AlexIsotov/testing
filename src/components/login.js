import React, { Component } from 'react';
import history from '../routes/history';
import axios from 'axios';
import qs from 'qs';
import ReCAPTCHA from "react-google-recaptcha";
import {apiUrl} from '../constants/apiUrl';

class Login extends Component {
 constructor(props){
    super(props)
    this.state = {
      login: '',
      password:'' ,
  	  recaptcha: null,
  	  finalCaptcha:'',
  	  auth: false,
  	  errMsg: '',
  	  errMsgLP:'',
    }
 }

 handleLoginChange = e =>{
	 this.setState({[e.target.name]:e.target.value, errMsgLP: ''});
 }

 handlePasswordChange= e =>{
	 this.setState({[e.target.name]:e.target.value, errMsgLP: ''});
 }

 handleSubmit(e){
	e.preventDefault();
	const data=({'login':this.state.login, 'password':this.state.password, 'num':this.props.num, 'time':7200000});
	const dataCaptcha=({'g-recaptcha-response': this.state.recaptcha});
	const optionsLogIn= {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:apiUrl+'/login.php',
	};
  const optionsCaptcha= {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(dataCaptcha),
		  url:apiUrl+'/recaptcha.php',
	};
	axios(optionsLogIn)
  .then((response)=>{
  	if (response.data==='Проверьте логин!' || response.data==='Проверьте пароль!' || response.data==='Проверьте логин!Проверьте пароль!'){
     	this.setState({errMsgLP:response.data});
  	}
  	else {
  	  this.setState({auth:true}, ()=>{
    		localStorage.setItem('access_token_'+this.props.num, response.data);
    		let expiresAt=Date.now()+7200000;
    		localStorage.setItem(this.props.num+'_expiresAt', expiresAt);
      })
      axios(optionsCaptcha)
      .then((response)=>{
  	     if(response.data==='Не забыли капчу?\r\n' || response.data==='Проверьте капчу!' ) {
  	        this.setState({errMsg:response.data})
  	     }
  	     else {this.setState({finalCaptcha:response.data}, ()=> {
        		localStorage.setItem('captcha_token_'+this.props.num, response.data);
        		let expiresAt=Date.now()+7200000;
        		localStorage.setItem(this.props.num+'_CaptchaexpiresAt', expiresAt);
        		history.replace('/test/'+this.props.hist);
  	     })}
  	  })
      .catch(function (error) {
    	  console.log(error);
      });
	   }
	  })
    .catch(function (error) {
  	  console.log(error);
    });
 }

 captchaChange = value =>{
	 this.setState({recaptcha: value , errMsg: ''});
 }

  render() {
    return (
      <div className="container py-3 mt-5">
			  <form className="form-signin border" onSubmit={(e)=>this.handleSubmit(e)}>
			    {this.state.errMsg!=='' ? <p className="alert alert-warning text-center">{this.state.errMsg}</p>:''}
  			  <h4 className="text-muted text-center">Введите данные для входа</h4>
  			  <div className="form-group">
  			 	   <input className="form-control form-control-lg" type="text"  placeholder="Логин" name="login" value={this.state.login} onChange={this.handleLoginChange} autoComplete="off" required/>
  			  </div>
  			  <div className="form-group">
  				    <input className="form-control form-control-lg" type="password" placeholder="Пароль" name="password" value={this.state.password} onChange={this.handlePasswordChange} autoComplete="off" required/>
  			  </div>
  			  {this.state.errMsgLP!=='' ? <p className="alert alert-danger text-center">{this.state.errMsgLP}</p>:''}
  			  <div className="d-flex justify-content-center">
  				    <button className="btn btn-secondary btn-lg">Войти</button>
  			  </div>
  			  <div className="d-flex justify-content-center mt-2">
    			    <ReCAPTCHA
    					sitekey="6LclpnMUAAAAALj5asAMYOcKbA-9EhheleyvyJ6z"
    					onChange={this.captchaChange}
    					size="normal"
    				   />
  			  </div>
		    </form>
      </div>
    );
  }
}
export default Login;
