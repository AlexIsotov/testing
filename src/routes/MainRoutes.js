import React, { Component } from 'react';
import MainPage from '../tests/mainPage';
import SummaryConstructor from '../components/summaryConstructor';
import Tests from '../tests/tests';
import TestLinkConstructor from '../tests/testLinkConstructor';
import TestsEdit from '../tests/testsEdit';
import AuthAdm from '../components/authAdm';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import history from './history';

const auth = new AuthAdm();
export class MainRoutes extends Component {
	
  render(){
  return (
    <Router history={history}>
      <Switch>
        <Route path="/summary/:user/:num" component={SummaryConstructor} />
		<Route path="/test/:test" component={TestLinkConstructor} />
		<Route exact path="/tests_edit" render={()=> <TestsEdit auth={auth}/>} />
		<Route exact path="/tests" render={()=> <Tests auth={auth}/>} />
		<Route exact path="/" render={()=> <MainPage auth={auth}/>} />

		<Route  path="*" render={() => <Redirect to="/" />} />
      
	  </Switch>
    </Router>
  );
}}

export default MainRoutes;