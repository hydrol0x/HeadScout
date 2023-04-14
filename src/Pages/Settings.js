import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Settings = () => {
  // This would work better as an array or object
  const [matchSheetID, setMatchSheetID] = useState("");
  const [matchTabName, setMatchTabName] = useState("");

  const [pitScoutSheetID, setPitScoutSheetID] = useState("");
  const [pitScoutTabName, setPitScoutTabName] = useState("");

  useEffect(() => {
    const getIds = async () => {
      const { sheetsID: matchSheetsID, tabID: matchTabID } =
        await window.sheetsAPI.getSheetIds("match");
      setMatchSheetID(matchSheetsID);
      setMatchTabName(matchTabID);

      const { sheetsID: pitScoutSheetsID, tabID: pitScoutTabID } =
        await window.sheetsAPI.getSheetIds("pitScout");
      setPitScoutSheetID(pitScoutSheetsID);
      setPitScoutTabName(pitScoutTabID);
    };
    getIds();
  }, []);

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    window.sheetsAPI.updateSheetIds(matchSheetID, matchTabName, "match");
  };

  const handlePitScoutSubmit = (e) => {
    e.preventDefault();
    window.sheetsAPI.updateSheetIds(
      pitScoutSheetID,
      pitScoutTabName,
      "pitScout"
    );
  };

  return (
    <Container fluid>
      <Row className="p-3">
        <Col>
          <h1 className="text-center">Settings</h1>
        </Col>
      </Row>
      <Row className="my-3">
        {/* TODO: make the form a component? */}
        <Col>
          <Form>
            <h1>Match Data</h1>
            <Form.Group className="mb-3" controlId="formSheetId">
              <Form.Label>Sheet ID</Form.Label>
              <Form.Control
                onChange={(e) => setMatchSheetID(e.target.value)}
                value={matchSheetID}
                type="text"
                placeholder="Enter ID"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTabName">
              <Form.Label>Tab name</Form.Label>
              <Form.Control
                onChange={(e) => setMatchTabName(e.target.value)}
                value={matchTabName}
                type="text"
                placeholder="Enter tab name"
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleMatchSubmit}>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Form>
            <h1>PitScout Data</h1>
            <Form.Group className="mb-3" controlId="formSheetId">
              <Form.Label>Sheet ID</Form.Label>
              <Form.Control
                onChange={(e) => setPitScoutSheetID(e.target.value)}
                value={pitScoutSheetID}
                type="text"
                placeholder="Enter ID"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTabName">
              <Form.Label>Tab name</Form.Label>
              <Form.Control
                onChange={(e) => setPitScoutTabName(e.target.value)}
                value={pitScoutTabName}
                type="text"
                placeholder="Enter tab name"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={handlePitScoutSubmit}
            >
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
