import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "../Components/DataTable";

const DataDisplay = () => {
  const [robotTotals, setrobotTotals] = useState({});
  return (
    
    <Container fluid>
      <Row className="p-3">
        <Col>
          <h1 className="text-center">Data Display</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable />
        </Col>
      </Row>
    </Container>
  );
};

export default DataDisplay;
