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
import './config.scss';

function App() {
  return <>
    <MainNav />
    <Canvas>
      <Switch>
        {/* Falta hacer la pagina del 404 */}
        <Route path="/users/new" component={UserPanel} />
        <Route path="/docs" component={Documentation} />
        <Route path="/users/:username" component={UserPanel} />
        <Route path="/users" component={Dashboard} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Canvas>
    <Footer />
    <Interceptor />
  </>;
}

export default App;
