import React from "react";
// import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import "./index.css";
import Doashboard from "./Dashboard";
import Login from "./login/Login";
import Register from "./register/Register";
import Profile from "./profile/Profile";
import Caro from "./containers/Caro";
import ChangePassword from "./changePassword/ChangePassword";
import ChangeAvatar from "./changePassword/ChangeAvatar";

import store from "./reducers/store";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/changepassword" exact component={ChangePassword} />
          <Route path="/changeavatar" exact component={ChangeAvatar} />
          <Route path="/caro">
            <GameCaro />
          </Route>
          <Route path="/" exact component={Doashboard} />
        </Switch>
      </div>
    </Router>
  );
}

function GameCaro() {
  // const store = createStore(rootReducer,applyMiddleware(thunk));
  const user = localStorage.getItem("fullname");
  if (user) {
    return (
      <Provider store={store}>
        <Caro />
      </Provider>
    );
  }
  return <Redirect to="/" />;
}
