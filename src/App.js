import React from "react";
import Home from "./Pages/Home";
import Test from "./Pages/Test";
import NavMenu from "./Components/NavMenu";
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <>
    <HashRouter>
      <NavMenu />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/test" Component={Test} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
