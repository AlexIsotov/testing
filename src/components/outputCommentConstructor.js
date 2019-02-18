import React, { Component } from 'react';


export class OutputCommentConstructor extends Component {
constructor(props){
	super(props);
	this.state={
		comment:'',
		mark:'',
	}

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
				{this.state.comment!==' ' && (
					<div>
					<label><strong> Комментарий:</strong></label>
					<p dangerouslySetInnerHTML={{ __html: this.state.comment.replace(/\n\r?/g, '<br />')}}></p>
					</div>)}
					 <div className="d-flex justify-content-end mt-1">
						 <label className="mr-1"><strong> Оценка: </strong></label>
						 <div className="input-group w-25">
							 <input className="form-control " defaultValue={this.state.mark} disabled/>
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

export default OutputCommentConstructor;
