import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavMenu from "../Components/NavMenu";
import DataTable from "../Components/DataTable";

const Home = () => {
  return (
    <Container fluid className="p-5">
      <Row>
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

export default Home;
