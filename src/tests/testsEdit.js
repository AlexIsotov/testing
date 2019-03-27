import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import ms from 'pretty-ms';
import LoginAdm from '../components/loginAdm';
import NavBar from '../routes/navBar';
import TestsEditConstructor from '../components/testsEditConstructor';
import TestsEditConstructorGeneral from '../components/testsEditConstructorGeneral';
import TestsEditAddQuestion from '../components/testsEditAddQuestion';
import TestsEditAddRadioQuestion from '../components/testsEditAddRadioQuestion';
import TestsEditAddTest from '../components/testsEditAddtest';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {apiUrl} from '../constants/apiUrl';

class TestsEdit extends Component {
  constructor(props){
  	super(props);
  	this.state=({
  		testnumber:null,
  		tests:[],
  		testsEdit:[],
  		modal: false,
  		nestedModal:false,
      type: 'qa'
  	})
  }

  updTest = no =>{
  	  const data = ({'testNum': 'tests_names'});
  		const options = {
  		  method: 'POST',
  		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  		  data: qs.stringify(data),
  		  url:apiUrl+'/select_test.php',
  		};
  		axios(options)
  		.then((response)=>{
  			this.setState({tests: response.data}, ()=>{this.editTest(no)})
  		})
  		.catch(function (error) {
  			console.log(error);
  		});
  }

  componentDidMount(){
  	  const data = ({'testNum': 'tests_names'});
  		const options = {
  		  method: 'POST',
  		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  		  data: qs.stringify(data),
  		  url:apiUrl+'/select_test.php',
  		};
  		axios(options)
  		.then((response)=>{
  			this.setState({tests: response.data})
  		})
  		.catch(function (error) {
  			console.log(error);
  		});
  }

  editTest = testNumber =>{
  	const testNum=('test'+parseInt(testNumber, 10)+'_correct');
  	const dataTest = ({'testNum': testNum});
  	const optionsTest = {
  		  method: 'POST',
  		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  		  data: qs.stringify(dataTest),
  		  url:apiUrl+'/select_test.php',
  		};
  		axios(optionsTest)
  		.then((response)=>{
  			this.setState({testsEdit: response.data},()=>{this.setState({modal:true , testnumber: testNumber})})
  		})
  		.catch(function (error) {
  			console.log(error);
  		});
  }

  toggleModal = () => {
      this.setState({
        modal: !this.state.modal
      });
  }

   toggleNested = () => {
      this.setState({
        nestedModal: !this.state.nestedModal,
       });
    }

    selectType = e =>{
      this.setState({[e.target.name]: e.target.value})
    }
  render() {
	  const {isAuthenticated, isCaptched} = this.props.auth;
    return (
      <div>
	  	  {!isAuthenticated() && !isCaptched() ?
	      <div>
	       <div>
			      <NavBar auth={this.props.auth}/>
		        <div className="d-flex justify-content-between">
        		  <h3 className="text-center ml-2 py-1">Редактирование тестов</h3>
        		  <TestsEditAddTest upd={this.updTest} no={this.state.tests.length+1}/>
		        </div>
      		  <table className="table table-sm table-bordered table-hover" >
      		    <thead className="thead-light"><tr><th>№ Теста</th><th>Название теста</th><th>Время выполнения</th></tr></thead>
      		    <tbody>
          		  {this.state.tests.length>0?
          		  this.state.tests.map((test)=>{return(
          		  <tr key={Math.floor(Math.random()*10000)}
          		  data-toggle="tooltip" data-placement="bottom" title="Нажмите для редактирования"
          		  onClick={()=>this.editTest(test[1])}>
          			  <td>
          			  <strong>{test[1]}</strong>
          			  </td>
          			  <td>
          			  <strong>{test[2]}</strong>
          			  </td>
          			  <td>
          			  <strong>{ms(parseInt(test[3],10))}</strong>
          			  </td>
          		  </tr>
          		  )}):
          		  null}
        		  </tbody>
      		  </table>
	        </div>
	      {this.state.testsEdit.length>=0 ? (
		    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size={"lg"} className={this.props.className}>
		    <ModalHeader className="container" style={{background:'lightgrey'}} toggle={this.toggleModal}>
		    <div className="container">
		     <div className="d-flex justify-content-center">
		  	  <h3 className="ml-2"> Редактирование  </h3>
    		 </div>
    		</div>
		    </ModalHeader>
		    <ModalBody>
    			{this.state.testnumber &&
    		 	<TestsEditConstructorGeneral testNumber={this.state.testnumber} time={this.state.tests[this.state.testnumber-1][3]} name={this.state.tests[this.state.testnumber-1][2]} upd={this.updTest}/>
    			}

    		  	{this.state.testsEdit.map((table)=>{
    			       return(
    				<TestsEditConstructor no={table[0]} que={table[1]} answ={table[2]} key={table[0]} mark={table[3]} testNumber={this.state.testnumber} upd={this.editTest}/>
    			   ) })}
      			<Modal isOpen={this.state.nestedModal}  backdrop='static'>
              <ModalHeader >Добавить вопрос</ModalHeader>
              <ModalBody>
                   <select className="form-control form-control-sm mb-1" name="type"
                   data-toggle="tooltip" data-placement="bottom" title="Выбор типа ответа"
                   onChange={this.selectType}  value={this.state.type}>
                     <option value='qa' >Текстовый ответ</option>
                     <option value='radio'>Радиокнопка</option>
                     <option value='check'>Чекбокс</option>
                   </select>
                   {this.state.type=='qa' && <TestsEditAddQuestion test={this.state.testnumber} no={this.state.testsEdit.length+1} cancel={this.toggleNested} upd={this.editTest} />}
                   {this.state.type=='radio' && <TestsEditAddRadioQuestion test={this.state.testnumber} no={this.state.testsEdit.length+1} cancel={this.toggleNested} upd={this.editTest} />}

      			  </ModalBody>
            </Modal>
      			<button className="btn btn-primary btn-sm ml-1 mt-2" data-toggle="tooltip" data-placement="bottom" title="Добавить новый вопрос" onClick={this.toggleNested}>Добавить вопрос</button>
          </ModalBody>
    		</Modal>
    		):
      		null}
    	  </div>:
    	  <LoginAdm auth={this.props.auth} />
    	  }
     </div>
    );
  }
}

export default TestsEdit;
