import React from "react";
// import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Caro from "./containers/Caro";
import rootReducer from "./reducers";
import "./index.css";
// import App from './App';
// import Caro from './Caro';
// import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer);
render(
  <Provider store={store}>
    <Caro />
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<Caro />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
