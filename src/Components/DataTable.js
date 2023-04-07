import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, Spinner, Container, Row, Col } from "react-bootstrap";

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
        <Row className="m-3 justify-content-md-center">
          <Spinner className="center" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Container className="p-0 pt-2">
          <Row className="p-3 ">
            <Col>
              <Button onClick={handleSheetsData} variant="primary">
                Reload
              </Button>
            </Col>
          </Row>

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
        </Container>
      )}
    </div>
  );
};

export default DataTable;
