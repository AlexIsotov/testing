import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Popover, PopoverBody } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import Copy from './pics/copy.png';

export class NotHidden extends Component {
 
 constructor(props){
    super(props)
    this.state = {
      dataCredit:[],
	  copied: false,
	  popoverOpen: false,
	 }
 }	
 
componentDidMount(){
		const data = ({'no': this.props.test[0]});
		const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:'/getAllTestCredits.php',
		};
		
		axios(options)
		  .then((response)=>{
			this.setState({dataCredit: response.data})
			})
		  .catch(function (error) {
			console.log(error);
		  });
}
 toggle=()=> {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }  
  render() {
    return (

	
	  <div>
	  {this.props.test.length>0}
		  <CopyToClipboard text={'Название теста: '+this.props.names +'\r\n'+'Ссылка: '+this.state.dataCredit[4]+'\r\n'+'Логин: '+this.state.dataCredit[2]+'\r\n'+'Пароль: '+this.state.dataCredit[3]}
			  onCopy={() => this.setState({copied: true})}>
		  <div className="d-flex justify-content-between">
			  <strong  className="mx-1">{this.props.test}</strong>
			  <strong className="mx-1" id={this.props.idd}>{this.props.names && this.props.names}</strong>
			
			  <div>
				<button className="btn btn-sm btn-outline-secondary" data-toggle="tooltip" data-placement="bottom" title="Копировать в буфер доступы" onClick={this.toggle}><img src={Copy} alt="copy" height={14} width={14} /></button>  
			  </div>				  
		  </div>
		   </CopyToClipboard>
		   <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.props.idd} toggle={this.toggle}>
			  <PopoverBody><small>Данные скопированы в буфер</small></PopoverBody>
		  </Popover>
	  </div>
    );
  }

}
export default NotHidden;


