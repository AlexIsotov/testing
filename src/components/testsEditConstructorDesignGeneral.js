import React, { Component } from 'react';
import Pencil from './pics/pencil.png';
import axios from 'axios';
import qs from 'qs';
import ms from 'pretty-ms';

class TestsEditConstructorDesign extends Component {
constructor(props){
	super(props);
	this.state=({
		editMode: false,
		text:'',
	})
}
handleInputChange = (e)=>{
	this.setState({[e.target.name]: e.target.value})
}

startEdit=()=>{
	this.setState({editMode: !this.state.editMode, text: this.props.type!=="time"? this.props.val: this.props.val/60000});
	}  
	
edit=()=>{
	const conf = window.confirm('Внести изменения ?');
	if (conf){
	const type=this.props.type;
	let dataTest = {};
	switch (type) {
	  case "name":
	  dataTest = ({'id': this.props.no, "name": this.state.text});
		break;
	  case "time":
	  dataTest = ({'id': this.props.no, "time": this.state.text*60000});
		break;
	  default:
		dataTest = {};
	}
	const optionsTest = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(dataTest),
		  url:'/edit_test_general.php',
		};
		axios(optionsTest)
		  .then((response)=>{
			this.setState({editMode: false}, ()=>{this.props.upd(this.props.no)});
			})
		  .catch(function (error) {
			console.log(error);
		  });
	}
	else {
			this.setState({editMode: false, text: ''});

	}
}
  render() {
	  
    return (
      <div >
         
		  				<div >
							
							{this.state.editMode===false ?
							<div className="d-flex justify-content-between ">
							{this.props.type==="time" ?
							this.props.val &&
							<p className="ml-1 mr-5 mt-2" > {ms(parseInt(this.props.val,10))}</p>:
							
							<p className="ml-1 mr-5 mt-2" dangerouslySetInnerHTML={{ __html: this.props.val.replace(/\n\r?/g, '<br />')}}></p>
							
							}	
								<div className="mr-1 mt-1">
									<button className="btn btn-sm btn-outline-secondary " 
									data-toggle="tooltip" data-placement="bottom" title="Редактировать"
									onClick={this.startEdit}> 
										<img src={Pencil} alt="edit" width={14} height={14}/>
									</button>
								</div>
							</div>:
								this.props.type==="time" ?
									this.props.val &&
									<div className="input-group input-group-sm">
									<input  type="number" className="form-control" name="text" onBlur={this.edit} defaultValue={this.props.val/60000} onChange={this.handleInputChange} autoFocus={true} />
									<span className="input-group-append text-muted"> минут </span>
									</div>
									:
							<textarea className="form-control" name="text" onBlur={this.edit} defaultValue={this.props.val} onChange={this.handleInputChange} autoFocus={true} rows={2}/>
								
								}
							
														
						</div> 
		
							
      </div>
    );
  }
}

export default TestsEditConstructorDesign;
