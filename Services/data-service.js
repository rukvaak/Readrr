import { connect } from 'react-redux';
import Axios from 'axios';

const URL ="http://192.168.1.149:3002/";
let  token = ""
let config = {
    headers:{
		"Content-Type":"application/json",
        
    }
}
export const receivedPosts = json => ({
	type: 'POST_DATA_RESULT',
	value: json.data,
  });
  export function postRequest(channel) {
	return dispatch => {
		console.log(channel);
	       Axios.post(URL+channel.route,channel.data,config)
		  .then((json) => {
			  console.log(json)
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
		console.log(channel);
		config.headers.authorization = "Brearer "+channel.token
	       Axios.get(URL+channel.route,config)
		  .then((json) => {
			  console.log(json)
			dispatch(receivedPosts(json));
		  },
		).catch(err=>{
			console.log(err);
		})
	  };
  }
