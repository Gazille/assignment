import "./App.css";
import LoginPage from "./modules/LoginPage";
import Signup from "./modules/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import { Redirect } from "react-router";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
