import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Footer } from './components/footer';
import { Navigation } from './components/navigation';

// keep App.css below bootstrap so that it can override styles etc
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import routes from './config/routes';

const parentDivStyle = {
  position: "relative",
  minHeight: "100vh"
};

const wrapStyle = {
  paddingBottom: "8rem"
};

const footerStyle = {
  position: "absolute",
  bottom: "0",
  width: "100%",
  minHeight: "5rem"
};

function App() {
  return (
    <div className="App" style={parentDivStyle}>
      <div style={wrapStyle}>
        <Navigation />
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
      <div style={footerStyle}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
