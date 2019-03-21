import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Trash from './pics/Trash.png';
import {apiUrl} from '../constants/apiUrl';

export class DelQue extends Component {

	del = no =>{
	let conf=window.confirm('Вы уверены, что хотите удалить вопрос?');
	if(conf){
		const testNum=('test'+parseInt(this.props.testNumber, 10)+'_correct');
		const dataTest = ({'test': testNum, 'no':no});
		const optionsTest = {
			  method: 'POST',
			  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			  data: qs.stringify(dataTest),
			  url:apiUrl+'/delQuestion.php',
			};
			axios(optionsTest)
		  .then((response)=>{
			this.props.upd(this.props.testNumber);
			})
		  .catch(function (error) {
			console.log(error);
		  });
	 }
	}

  render() {
	 return (
    <div className="mt-1">
			<button className="btn btn-danger btn-sm"
			data-toggle="tooltip" data-placement="bottom" title="Удалить"
			onClick={()=>this.del(this.props.no)}>
				<img src={Trash} alt="trash" height={20} width={20} />
			</button>
    </div>
    );
  }
}
export default DelQue;
