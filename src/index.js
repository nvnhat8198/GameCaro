import React from "react";
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.css";
// import App from './App';
// import Caro from './Caro';
// import * as serviceWorker from './serviceWorker';

import App from "./App";

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
};

const Home = () => (
  <Provider template={AlertTemplate} {...options}>
    <App />
  </Provider>
);

ReactDOM.render(<Home />, document.getElementById("root"));
// const store = createStore(rootReducer);
// render(
//   <Provider store={store}>
//     <Caro />
//   </Provider>,
//   document.getElementById("root")
// );

// ReactDOM.render(<Caro />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
