import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataTable from "../Components/DataTableObj";

const TeamLookup = () => {
  const [teamNumInput, setTeamNumInput] = useState("");
  const [robotTotals, setRobotTotals] = useState({});
  const [robotAverages, setRobotAverages] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const getRobotTotals = async () => {
    const data = await window.dataFunctions.getRobotTotals(teamNumInput);
    setRobotTotals(data);
  };

  const getRobotAverages = async () => {
    const data = await window.dataFunctions.getRobotAverages(teamNumInput);
    setRobotAverages(data);
  };

  const getImageUrl = async () => {
    const pitScoutData = await window.sheetsAPI.getSheet("pitScout");
    console.log(pitScoutData);
    // in the future, pit scout data should just be added to robotObj generator function
    pitScoutData.map((team) => {
      if (team["Team #"] === teamNumInput) {
        setImageUrl(team["Image"]);
      }
    });
  };

  useEffect(() => {}, [robotTotals]);

  const handleTeamNumSubmit = (e) => {
    e.preventDefault();
    getRobotTotals();
    getRobotAverages();
    getImageUrl();
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
          <img src={imageUrl} width={300} height={300} />
        </Col>
      </Row>
      <Row className="bg-light my-3 py-3">
        <h1 className="text-center"> Totals </h1>
        <DataTable data={robotTotals} />
      </Row>
      <Row className="bg-light my-3 py-3">
        <h1 className="text-center"> Averages </h1>
        <DataTable data={robotAverages} />
      </Row>
    </Container>
  );
};

export default TeamLookup;
