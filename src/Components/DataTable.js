import React from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";

const DataTable = () => {
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
    "End Game": "",
  });

  const handleClick = async (e) => {
    const data = await window.sheetsAPI.getSheet();
    console.log(data[0]);
    setSheetsData(data[0]);
  };

  return (
    <div>
      <Button onClick={handleClick} variant="primary">
        Restart
      </Button>

      <p>{sheetsData["Auto Charging Station"]}</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
