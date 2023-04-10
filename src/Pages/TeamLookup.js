import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataTable from "../Components/DataTableObj";

const TeamLookup = () => {
  const [teamNumInput, setTeamNumInput] = useState("");
  const [robotTotals, setRobotTotals] = useState({});

  const getRobotTotals = async () => {
    const data = await window.dataFunctions.getRobotTotals(teamNumInput);
    setRobotTotals(data);
  };

  useEffect(() => {}, [robotTotals]);

  const handleTeamNumSubmit = (e) => {
    e.preventDefault();
    getRobotTotals(teamNumInput);
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
      <Row className="bg-light my-3 py-3">
        <h1 className="text-center"> Totals </h1>
        <DataTable dataFunction={getRobotTotals} data={robotTotals} />
      </Row>
      <Row className="bg-light my-3 py-3">
        <h1 className="text-center"> Averages </h1>
        <DataTable dataFunction={getRobotTotals} data={robotTotals} />
      </Row>
    </Container>
  );
};

export default TeamLookup;
