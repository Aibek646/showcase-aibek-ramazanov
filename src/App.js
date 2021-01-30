import "./App.css";
import HomeScreen from "./containers/HomeScreen";
import { Route, Switch } from "react-router-dom";
import MainScreen from "./containers/HomeScreen";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/mainscreen" component={MainScreen} />
        <Route exact path="/" component={HomeScreen} />
        <Route />
      </Switch>
    </div>
  );
}

export default App;
