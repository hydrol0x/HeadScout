import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataTable from "../Components/DataTableObj";
import DataTableArr from "../Components/DataTableObjArrCustom";

import React from "react";

const TeamComparison = () => {
  const teamNumInput = "";
  const [teamNum1, setTeamNum1] = useState();
  const [teamNum2, setTeamNum2] = useState();
  const handleTeamNumSubmit = (e) => {
    e.preventDefault();
    console.log(teamNum1);
    console.log(teamNum2);
  };
  return (
    <Container fluid>
      <Row className="p-3">
        <Col>
          <h1 className="text-center">Team Comparison</h1>
        </Col>
      </Row>
      <Row className="bg-light my-3 py-3">
        <Col>
          <Form className="d-flex">
            <Form.Group className="mb-3 mx-1" controlId="formSheetId">
              <Form.Control
                onChange={(e) => setTeamNum1(e.target.value)}
                value={teamNum1}
                type="text"
                placeholder={"Team #"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSheetId">
              <Form.Control
                onChange={(e) => setTeamNum2(e.target.value)}
                value={teamNum2}
                type="text"
                placeholder={"Team #"}
              />
            </Form.Group>
            <Button
              className="mx-1 mb-3"
              variant="primary"
              type="submit"
              onClick={handleTeamNumSubmit}
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamComparison;
