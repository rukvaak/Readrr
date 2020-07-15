import { connect } from 'react-redux';
import Axios from 'axios';

const ipconfig = require('../Services/config');

console.log('printing ip:',ipconfig)

const URL =ipconfig.ipConfig.ipaddress+":3002/";

let  token = ""
let config = {
    headers:{"Content-Type":"application/json"}
}
export const receivedPosts = json => ({
	type: 'POST_DATA_RESULT',
	value: json.data,
  });
  export function postRequest(channel) {
	return dispatch => {
		//console.log("Channel",channel);
		config.headers.authorization = "Brearer "+channel.token
	       Axios.post(URL+channel.route,channel.data,config)
		  .then((json) => {
			  //console.log(json)
			  if(json.data.match){
				  token = json.data.token
			  }
			dispatch(receivedPosts(json));
		  },
		).catch(err=>{
			console.log(err);
		})
	  };
  }
  export function getRequest(channel) {
	return dispatch => {
		//console.log('Channel: ', channel);
		config.headers.authorization = "Brearer "+channel.token
		config.params = channel.body
		Axios.get(URL+channel.route, config)
		  .then((json) => {
			 // console.log(json)
			dispatch(receivedPosts(json));
		  },
		).catch(err=>{
			console.log(err);
		})
	  };
  }
