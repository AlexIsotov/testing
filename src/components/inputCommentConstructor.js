import React, { Component } from 'react';

export class InputCommentConstructor extends Component {
	constructor(props){
		super(props);
		this.state={
			comment:'',
			mark:'',
		}
	}

	handleCommentChange = e =>{
		e.preventDefault();
		this.setState({[e.target.name]:e.target.value},()=>{
		this.props.getComment(this.state.comment, this.props.index)})
	}

	handleMarkChange= e =>{
		e.preventDefault();
		this.setState({[e.target.name]:e.target.value},()=>{
		this.props.getMark(this.state.mark, this.props.index)})
	}

	componentDidMount(){
		if(this.props.defComValue!==null || this.props.defMarkValue!==null){
		this.setState({comment:this.props.defComValue, mark: this.props.defMarkValue})
		}
		else{this.setState({comment:'', mark: ''})}
	}

  render() {
	  return (
      <div>
				<div className="form-group">
						<div className="container">
							<label><strong> Комментарий:</strong></label>
							<textarea  name="comment" className="form-control" onChange={this.handleCommentChange} value={this.state.comment} rows="5"/>
							<div className="d-flex justify-content-end mt-1">
								 <label className="mr-1"><strong> Оценка: </strong></label>
								 <div className="input-group w-25">
									 <input name="mark" className="form-control" type="number"  min="0" max={this.props.maxMark} onChange={this.handleMarkChange} value={this.state.mark} required/>
									 <div className="input-group-append">
									 	<span className="input-group-text">из {this.props.maxMark}</span>
								 	 </div>
							   </div>
						  </div>
						</div>
				 </div>
       </div>
    );
  }
}
export default InputCommentConstructor;
