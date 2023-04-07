import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Settings = () => {
  const [sheetID, setSheetID] = useState("");
  const [tabName, setTabName] = useState("");
  useEffect(() => {
    const getIds = async () => {
      const { sheetsID, tabID } = await window.sheetsAPI.getSheetIdentifiers();
      setSheetID(sheetsID);
      setTabName(tabID);
    };
    getIds();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.sheetsAPI.updateSheetIdentifiers(sheetID, tabName);
  };

  return (
    <Container fluid>
      <Row className="p-3">
        <Col>
          <h1 className="text-center">Settings</h1>
        </Col>
      </Row>
      <Row>
        {/* TODO: make the form a component? */}
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formSheetId">
              <Form.Label>Sheet ID</Form.Label>
              <Form.Control
                onChange={(e) => setSheetID(e.target.value)}
                value={sheetID}
                type="text"
                placeholder="Enter ID"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTabName">
              <Form.Label>Tab name</Form.Label>
              <Form.Control
                onChange={(e) => setTabName(e.target.value)}
                value={tabName}
                type="text"
                placeholder="Enter tab name"
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
