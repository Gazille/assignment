import "./App.css";
import LoginPage from "./modules/LoginPage";
import Signup from "./modules/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import { Redirect } from "react-router";
import { PrivateRoute } from "./components";

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
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
