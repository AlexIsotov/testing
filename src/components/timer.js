import React, { Component } from 'react';
import ms from 'pretty-ms';
import axios from 'axios';
import qs from 'qs';
import {apiUrl} from '../constants/apiUrl';

class Timer extends Component {

 constructor(props){
    super(props)
    this.state = {
      time: 0,
      start: 0
    }
 }

 componentDidMount() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: this.props.timer-(Date.now() - this.state.start)
    }, ()=>{
		if(this.state.time<0)
		{
  		this.props.finish(true);
  		clearInterval(this.timer)
		}} ), 1000);
  }

  componentWillUnmount(){
     clearInterval(this.timer);
	   let finalTime=ms(this.props.timer-this.state.time);
		 const dataTime = ({'time':finalTime, 'id': this.props.id});
	   const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(dataTime),
		  url:apiUrl+'/setTime.php',
		  };
		  axios(options)
		  .then((response)=>{
		  })
		  .catch(function (error) {
			     console.log(error);
		  });
  }

  render() {
    return (
      <div className="d-flex justify-content-end mr-1">
    	  {this.state.time>=0 ?
      	  <h5 className="text-muted border bg-white rounded px-2">Отавшееся время: {ms(this.state.time)}</h5>:
      	  <h5>Время вышло</h5>
        }
      </div>
    );
  }
}
export default Timer;
