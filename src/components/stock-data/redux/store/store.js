import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/combineReducer";

const logger = createLogger(true);
export const store = createStore(reducer, applyMiddleware(thunk, logger));