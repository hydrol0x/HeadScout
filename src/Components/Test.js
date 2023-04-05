import React from "react";
import { useState } from "react";


const Test = () => {
  const [sheetsData, setSheetsData] = useState({
    "Match Number": "0",
    "Team Number": "0",
    "Left Community in Auto?": "",
    "Scored Game Pieces in Auto? [Cone Top]": "0",
    "Scored Game Pieces in Auto? [Cube Top]": "0",
    "Scored Game Pieces in Auto? [Cone Middle]": "0",
    "Scored Game Pieces in Auto? [Cube Middle]": "0",
    "Scored Game Pieces in Auto? [Cone Bottom]": "0",
    "Scored Game Pieces in Auto? [Cube Bottom]": "0",
    "Auto Charging Station": "No data about auto charge station yet!",
    "Teleop Cones Scored Top": "0",
    "Teleop Cones Scored Mid": "0",
    "Teleop Cones Scored Bottom": "0",
    "Teleop Cubes Scored Top": "0",
    "Teleop Cubes Scored Mid": "0",
    "Teleop Cubes Scored Bottom": "0",
    "Teleop Cones Dropped": "0",
    "Teleop Cubes Dropped": "0",
    "End Game": ""
});

  const handleClick =async (e) => {
    const data = await window.sheetsAPI.getSheet();
    console.log("Raw data")
    console.log(data[0]);
    setSheetsData(data[0]);
  }

  console.log("Sheet data");
  console.log(sheetsData);
  return (
    <div>
      <button id='btn' type="button" onClick={handleClick}>Refresh</button> 
      <p>{sheetsData["Auto Charging Station"]}</p>
    </div>  
  );
};

export default Test;
