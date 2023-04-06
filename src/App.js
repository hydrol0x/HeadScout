import React from "react";
import DataTable from "./Components/DataTable.js";
import Test from "./Components/Test.js";
import { Container, Row, Col } from "react-bootstrap"

const App = () => (
  <div>
    <Container fluid className="p-5">
      <Row >
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
  </div>
);

export default App;
