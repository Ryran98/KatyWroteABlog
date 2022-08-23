import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Navigation } from './components/navigation';

import routes from './config/routes';

function App() {
  return (
      <div className="App">
          <Navigation />
          <Header 
              title="Katy wrote a blog"
          />
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route 
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={props => <route.component {...props} />}
              />
            )
          })}
        </Switch>
      </div>
  );
}

export default App;
