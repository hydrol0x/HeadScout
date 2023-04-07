import React from "react";
import DataDisplay from "./Pages/DataDisplay";
import Settings from "./Pages/Settings";
import NavMenu from "./Components/NavMenu";
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <>
    <HashRouter>
      <NavMenu />
      <Routes>
        {/* might have a root page later when you initially load app */}
        <Route path="/" Component={DataDisplay} />
        <Route path="/data_display" Component={DataDisplay} />
        <Route path="/settings" Component={Settings} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
