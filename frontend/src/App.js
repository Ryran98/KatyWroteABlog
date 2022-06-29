import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Container } from 'reactstrap';
import { Header } from './components/header';
import { Navigation } from './components/navigation';

import routes from './config/routes';

function App() {
  return (
      <div className="App">
        <Container fluid className="p-0">
          <Navigation />
          <Header 
              title="Katy wrote a blog"
              headline="Join us on our adventure!"
          />
        </Container>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route 
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  render={route.component}
              />
            )
          })}
        </Switch>
      </div>
  );
}

export default App;
