import React from "react";
import Display from "./Components/Display.js";
import Test from "./Components/Test.js";

const App = () => (
  <div>
    <h1>Hello React</h1>
    <Test />

    <Display data={"t"} />
  </div>
);

export default App;
