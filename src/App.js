import "./App.css";
import LoginPage from "./modules/LoginPage";
import Signup from "./modules/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./modules/Dashboard";

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
