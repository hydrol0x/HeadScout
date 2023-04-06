import React from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";

const DataTable = () => {
  const [sheetsData, setSheetsData] = useState([
    {
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
      "End Game": "",
    },
  ]);

  const handleClick = async (e) => {
    const data = await window.sheetsAPI.getSheet();
    console.log(data);
    setSheetsData(data);
  };

  //   sheetsData.map((match) => {
  //     Object.values(match).map((value) => console.log(value));
  //   });
  return (
    <div>
      <Button className="mb-2" onClick={handleClick} variant="primary">
        Reload
      </Button>

      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            {Object.keys(sheetsData[0]).map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sheetsData.map((match) => {
            return (
              <tr>
                {Object.values(match).map((value) => {
                  return <td>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
