import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, Spinner, Container, Row, Col } from "react-bootstrap";

const isEmpty = (sheetsData) => {
  // return sheetsData.length === 1 && Object.keys(sheetsData[0]).length === 0;
  return Object.entries(sheetsData).length === 0;
};

// TODO implement caching
// Has to work with useState but still auto-fetch data when the page initially loads
// Maybe just store to some place like external file or  however you can store stuff
// and then fallback on that if there is a failed fetch
const DataTable = ({ dataFunction, data }) => {
  const [tableData, setTableData] = useState({});

  const handleTableData = async (e) => {
    // dataFunction is passed in, function will be from main process by IPC
    // e.g if you had it pass in `getSheets` it will display sheets data.
    // if you pass in `generateRobotTotals` it will display robot totals
    // const data = await dataFunction();
    setTableData(data);
  };

  // get data on DOM load
  useEffect(() => {
    console.log(Object.entries(data));
    handleTableData();
  }, [data]);

  return (
    <div>
      {isEmpty(tableData) ? (
        <Row className="m-3 justify-content-md-center">
          <Spinner className="center" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <div>
          {/* TODO: add a "key" prop each list value */}
          <Row>
            {/* todo :figure out how to make the button work */}
            {/* currently doesn't reset data b/c data is passed in */}
            {/* maybe will require a diff type of react hook */}
            <Col className="px-5">
              <Button
                onClick={handleTableData}
                className="my-2"
                variant="primary"
              >
                Reload
              </Button>
              <Table responsive striped bordered hover size="sm">
                <thead>
                  <tr>
                    {Object.keys(tableData).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.entries(tableData).map((entry) => {
                      // [key, value]
                      const data = entry[1].toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }); // makes decimal formatted better
                      return <td>{data}</td>;
                    })}
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default DataTable;
