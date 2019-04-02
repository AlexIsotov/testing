import React, { Component } from 'react';
import Pencil from './pics/pencil.png';
import axios from 'axios';
import qs from 'qs';
import {apiUrl} from '../constants/apiUrl';

class TestsEditConstructorDesign extends Component {
	constructor(props){
		super(props);
		this.state=({
			editMode: false,
			text:'',
			id:null
		})
	}

	handleInputChange = (e)=>{
		this.setState({[e.target.name]: e.target.value})
	}

	startEdit = (answ, id) =>{
		this.setState({editMode: !this.state.editMode, text:this.props.type!=="variants" ? this.props.val: answ, id: id});
	}

	edit=()=>{
		if (this.state.text!==this.props.val){
			const conf = window.confirm('Внести изменения ?');
			if (conf){
				const type=this.props.type;
				const testNum=('test'+parseInt(this.props.testNumber, 10)+'_correct');
				let dataTest = {};
				switch (type) {
				  case "question":
				  dataTest = ({'testNum': testNum, 'id': this.props.no, "question": this.state.text});
					break;
				  case "answer":
				  dataTest = ({'testNum': testNum, 'id': this.props.no, "answer": this.state.text});
					break;
				  case "maxmark":
				  dataTest = ({'testNum': testNum, 'id': this.props.no, "maxmark": this.state.text});
					break;
					case "variants":
					let arr = this.props.val;
					let obj = {id: this.state.id, answer: this.state.text};
					arr[this.state.id-1]=obj;
					dataTest = ({'testNum': testNum, 'id': this.props.no, "variants": arr});
					break;
				  default:
					dataTest = {};
				}
				const optionsTest = {
					  method: 'POST',
					  headers: { 'content-type': 'application/x-www-form-urlencoded' },
					  data: qs.stringify(dataTest),
					  url:apiUrl+'/edit_test.php',
					};
					axios(optionsTest)
					.then((response)=>{
						this.setState({editMode: false}, ()=>{this.props.upd(this.props.testNumber)});
					})
					.catch(function (error) {
						console.log(error);
					});
			}
			else {
					this.setState({editMode: false, text: ''});
			}
		}
		else{
			this.setState({editMode: false, text: ''});
		}

	}

  render() {
		const editButton = <div className="mr-1 mt-1">
												<button className="btn btn-sm btn-outline-secondary "
												data-toggle="tooltip" data-placement="bottom" title="Редактировать"
												onClick={this.startEdit}>
													<img src={Pencil} alt="edit" width={14} height={14}/>
												</button>
											 </div>
    return (
      <div>
	  				<div >
							{this.state.editMode===false ?
								<div>
									{this.props.type==="variants"?
										  this.props.val!==null?
											this.props.val.map((el)=> {return(
												<div  className="d-flex justify-content-between " key={el.id}>
													<p>
														{el.answer}
													</p>
													<div className="mr-1 mt-1">
														<button className="btn btn-sm btn-outline-secondary "
														data-toggle="tooltip" data-placement="bottom" title="Редактировать"
														onClick={(answ, id)=>this.startEdit(el.answer, el.id)}>
															<img src={Pencil} alt="edit" width={14} height={14}/>
														</button>
													</div>
												</div>
											)}
											)
											:
											null
									:
									<div  className="d-flex justify-content-between ">
										<p className="ml-1" dangerouslySetInnerHTML={{ __html: this.props.val.replace(/\n\r?/g, '<br />')}}>
										</p>
										{editButton}
									</div>
								  }
								</div>:
									<textarea className="form-control" name="text" onBlur={this.edit} defaultValue={this.state.text} onChange={this.handleInputChange} autoFocus={true} rows={5}/>
							 }
						 </div>
       </div>
    );
  }
}

export default TestsEditConstructorDesign;
