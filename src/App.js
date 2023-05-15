import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import Product from "./layout/Product";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/">
              <Product />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
