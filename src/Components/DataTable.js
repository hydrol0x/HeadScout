import React from "react";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const DataTable = () => {
  const [sheetsData, setSheetsData] = useState([{}]);

  const handleSheetsData = async (e) => {
    const data = await window.sheetsAPI.getSheet();
    setSheetsData(data);
  };

  // get data on DOM load
  useEffect(() => {
    handleSheetsData();
  }, []);

  return (
    <div>
      <Button className="mb-2" onClick={handleSheetsData} variant="primary">
        Reload
      </Button>

      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            {Object.keys(sheetsData[0]).map((key) => (
              <th key={key}>{key}</th>
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
