import React from "react";
import { Switch, Route } from 'react-router-dom';
import MainNav from './MainNav/MainNav';
import Canvas from './Canvas/Canvas';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import User from './User/User';
import Documentation from './Documentation/Documentation';

import './config.scss';

function App() {
  return <>
    <MainNav />
    <Canvas>
      <Switch>
        <Route path="/docs" component={Documentation} />
        <Route path="/users/:username" component={User} />
        <Route path="/users" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </Canvas>
  </>;
}

export default App;
