// import * as types from "../actions/actionTypes";
// import { API_RESPONSE_FAILURE,API_RESPONSE_RECEIVED_NO_DATA, API_RESPONSE_RECEIVED_WITH_DATA  } from "../constants/actionTypes";
import * as types from "../constants/actionTypes";

export const fetchAPIDataAction = (url) => {
    //thunk will be involved internally
    //to handle asynchronous/promises 
    //here we return a function which will be used by thunk to dispatch actions based on success/failure
    return (dispatch) => {
        console.log("Sending API Request");
        return fetch(url).then(res => res.json())
        .then( result =>
         {
            if(result.data.length > 0){
            //   this.setState({apiResponse : result.data[0]});
            //   this.setState({apiResponseStatus : true});  
            console.log("API Response Received with Data");
              dispatch(apiResponseSuccessWithData(result.data[0]));
            //   dispatch({type : "API_RESPONSE_RECEIVED_WITH_DATA",payload : result.data[0]})
            }else{
            //   this.setState({apiResponseStatus : false});
            console.log("API Response Received NO Data")
              dispatch(apiResponseSuccessNoData())
            }
        }).catch(err => {
            // dispatch("failure");
            dispatch(apiResponseFailure(err))
        })       
    }
};

const apiResponseSuccessWithData = (data)=>{
    return{
        type : types.API_RESPONSE_RECEIVED_WITH_DATA,
        payload : data,
        status : true
    }
}

const apiResponseSuccessNoData = () => {
    return{
        type : types.API_RESPONSE_RECEIVED_NO_DATA,
        status: false,
        message: "No Result found"
    }
} 
const apiResponseFailure = (err) => {
    return{
        type : types.API_RESPONSE_FAILURE,
        message : err
    }
}