import React, { Component } from 'react';
import MainAdminNew from '../components/mainAdminNew';
import NavBar from '../routes/navBar';
import LoginAdm from '../components/loginAdm';

class MainPage extends Component {
  render() {
	  const {isAuthenticated, isCaptched}=this.props.auth;
    return (
      <div>
	  {(!isAuthenticated() && !isCaptched()) ? 
	  <div>
		  
		  <NavBar auth={this.props.auth}/>
		  <MainAdminNew />
	  </div>:
	   <LoginAdm auth={this.props.auth} />
	  }
     
      </div>
    );
  }
}

export default MainPage;
