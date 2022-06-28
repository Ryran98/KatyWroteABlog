import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./containers/home";
import { Travel } from "./containers/travel";
import { Recipies } from "./containers/recipies";
import { VanLife } from "./containers/vanlife";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/travel">
            <Travel />
          </Route>
          <Route exact path="/recipies">
            <Recipies />
          </Route>
          <Route exact path="/vanlife">
            <VanLife />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
