import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataTable2 from "../Components/DataTable2";

const TeamLookup = () => {
  const [teamNumInput, setTeamNumInput] = useState("");

  const handleTeamNumSubmit = (e) => {
    e.preventDefault();
    console.log(teamNumInput);
  };
  return (
    <Container fluid>
      <Row className="p-3">
        <Col>
          <h1 className="text-center">Team Lookup</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="d-flex">
            <Form.Group className="mb-3" controlId="formSheetId">
              <Form.Control
                onChange={(e) => setTeamNumInput(e.target.value)}
                value={teamNumInput}
                type="text"
                placeholder={"Team #"}
              />
            </Form.Group>
            <Button
              className="mx-3 mb-3"
              variant="primary"
              type="submit"
              onClick={handleTeamNumSubmit}
            >
              Search
            </Button>
          </Form>
        </Col>
        <Col>
          <img height={250} width={250} />
        </Col>
      </Row>
      <Row className="bg-light">
        <DataTable2 />
      </Row>
    </Container>
  );
};

export default TeamLookup;
