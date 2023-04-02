import React from "react";
const electron = window.require("electron");
const remote = electron.remote;
// const { BrowserWindow, dialog, Menu } = remote;

const Test = () => {
  return (
    <div>
      <h1>This is a test component</h1>
    </div>
  );
};

export default Test;
