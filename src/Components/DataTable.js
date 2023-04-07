import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";

const isEmpty = (sheetsData) => {
  return sheetsData.length === 1 && Object.keys(sheetsData[0]).length === 0;
};

// TODO implement caching
// Has to work with useState but still auto-fetch data when the page initially loads
// Maybe just store to some place like external file or  however you can store stuff
// and then fallback on that if there is a failed fetch
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
      {isEmpty(sheetsData) ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
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
      )}
    </div>
  );
};

export default DataTable;
