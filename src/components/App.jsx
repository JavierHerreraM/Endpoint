import React from "react";

import MainNav from './MainNav/MainNav';
import Canvas from './Canvas/Canvas';
import Home from './Home/Home';
import Documentation from './Documentation/Documentation';

import './App.scss';

function App() {
  return <>
    <MainNav />
    <Canvas>
      <Documentation />
    </Canvas>
  </>;
}

export default App;
