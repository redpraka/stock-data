import * as types from "../constants/actionTypes";

const initalState = {
    apiResponse:null,
    apiResponseStatus:null,
    noDataMessage :null,
    errorMessage:null
    
};

export default (state=initalState, action) => {
    console.log("Reducer is going to update the store");
    console.log(action);
    switch(action.type){
        case types.API_RESPONSE_RECEIVED_WITH_DATA:
            return {
                ...state,
                apiResponse : action.payload,
                apiResponseStatus : action.status
            }
        case types.API_RESPONSE_RECEIVED_NO_DATA:
            return{
                ...state,
                apiResponseStatus:action.status,
               // apiResponse:action.message
               noDataMessage:"No Results Found"
            }
        case types.API_RESPONSE_FAILURE:
            return{
                ...state,
                apiResponseStatus:action.type,
                errorMessage:action.message
            }
        default:
            return state;
    }
}