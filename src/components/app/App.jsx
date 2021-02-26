import React from "react";
import { Switch, Route } from 'react-router-dom';
import MainNav from '../main-nav/MainNav';
import Canvas from '../canvas/Canvas';
import Home from '../home/Home';
import Dashboard from '../dashboard/Dashboard';
import UserPanel from '../user-panel/UserPanel';
import Documentation from '../documentation/Documentation';
import Interceptor from '../response-interceptor/Interceptor';
import Footer from '../footer/Footer';
import Page404 from '../page-404/Page404';
import './config.scss';

function App() {
  return <>
    <MainNav />
    <Canvas>
      <Switch>
        <Route path="/users/new" component={UserPanel} />
        <Route path="/users/:username" component={UserPanel} />
        <Route path="/users" component={Dashboard} />
        <Route path="/docs" component={Documentation} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={Page404} />
      </Switch>
    </Canvas>
    <Footer />
    <Interceptor />
  </>;
};

export default App;
