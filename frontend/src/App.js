import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Container, Row } from 'reactstrap';
import './App.css';
import { Footer } from './components/footer';
import { Brands } from './components/footer/brands';
import { Header } from './components/header';
import { Navigation } from './components/navigation';

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
