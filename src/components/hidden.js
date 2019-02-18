import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Popover, PopoverBody } from 'reactstrap';

import axios from 'axios';
import qs from 'qs';

export class Hidden extends Component {
 
 constructor(props){
    super(props)
    this.state = {
      dataCredit:[],
	  timer:0,
	  time: 0,
	  copied: false,
	  popoverOpen: false
    }
 }	
 
getCredit=(e)=>{
	e.preventDefault();
	this.setState({timer: Date.now()});
	const data = ({ 'credit': this.props.data, 'num': this.props.number[0]});
		const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url:'/getTestCredits.php',
		};
		
		axios(options)
		  .then((response)=>{
			this.setState({dataCredit: response.data})
			})
		  .catch(function (error) {
			console.log(error);
		  });
	this.timer = setInterval(() => this.setState({
      time: 10000-(Date.now() - this.state.timer)
    }, ()=>{
		if(this.state.time<0)
		{
		this.setState({dataCredit:[], timer:0})
		clearInterval(this.timer)
		}} ), 1000);
}

 toggle=()=> {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }  
  render() {
    return (
      <div onContextMenu  ={this.getCredit}>
	  {this.state.dataCredit.length>0?
	  <div>
		  <CopyToClipboard text={this.state.dataCredit[0]}
			  onCopy={() => this.setState({copied: true})}>
		  <span  id={this.props.idd} onClick={this.toggle} data-toggle="tooltip" data-placement="bottom" title="ЛКМ, чтобы скопировать"><strong>{this.state.dataCredit[0]}</strong></span>
		  </CopyToClipboard>
		   <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.props.idd} toggle={this.toggle}>
			  <PopoverBody><small>Скопировано в буфер</small></PopoverBody>
		  </Popover>
	  </div>:
	  <span className="text-muted" data-toggle="tooltip" data-placement="bottom" title="ПКМ, чтобы отобразить">*Скрыто*</span>}
      </div>
    );
  }

}
export default Hidden;


