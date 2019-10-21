import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Caro from "./containers/Caro";
import rootReducer from "./reducers";
import "./index.css";

import Login from './login/Login';
import Register from './register/Register';
import Profile from './profile/Profile';
import Doashboard from './Dashboard';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/caro">
            <GameCaro/>
          </Route>
          <Route path="/" exact component={Doashboard} />
        </Switch>
      </div>
    </Router>
  );
}

function GameCaro() {
  const store = createStore(rootReducer);
  return(
    <Provider store={store}>
         <Caro />
       </Provider>
  )
}
