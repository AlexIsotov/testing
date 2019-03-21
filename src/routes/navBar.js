import React, { Component } from 'react';
import {Nav, NavLink, Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import LoginAdm from '../components/loginAdm';
import axios from 'axios';
import {apiUrl} from '../constants/apiUrl';

export class NavBar extends Component {
constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
	  testLinks:[],
    };
  }
 toggle=()=> {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  componentDidMount(){
	  	const options = {
		  method: 'GET',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  url:apiUrl+'/selectLinks.php',
		};
		axios(options)
		  .then((response)=>{
			  this.setState({testLinks:response.data})
		  })
		  .catch((err)=>{console.log(err)
		  })
	  }
  render() {
    return (
	<div >
		<Nav tabs className= "d-flex bg-light">

			<NavLink href="/" active={window.location.pathname==='/'} > Оценивание</NavLink>
			<NavLink href="/tests" active={window.location.pathname==='/tests'} >Доступы</NavLink>
			<NavLink href="/tests_edit" active={window.location.pathname==='/tests_edit'}>Редактировать</NavLink>

		<div className="ml-auto">
		<LoginAdm auth={this.props.auth} />
		</div>
		</Nav>

	</div>
		);
  }
}
export default NavBar;
