import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gameReducer from "./index";

const store = createStore(gameReducer, applyMiddleware(thunk));

export default store;
