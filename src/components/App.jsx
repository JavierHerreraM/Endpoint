import React from "react";
import { Switch, Route } from 'react-router-dom';
import MainNav from './MainNav/MainNav';
import Canvas from './Canvas/Canvas';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import UserPanel from './userPanel/UserPanel';
import Documentation from './Documentation/Documentation';
import Interceptor from './response-interceptor/Interceptor';

import './config.scss';

function App() {
  return <>
    <MainNav />
    <Canvas>
      <Switch>
        <Route path="/users/new" component={UserPanel} />
        <Route path="/docs" component={Documentation} />
        <Route path="/users/:username" component={UserPanel} />
        <Route path="/users" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </Canvas>
    <Interceptor />
  </>;
}

export default App;
