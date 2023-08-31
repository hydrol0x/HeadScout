import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataTable from "../Components/DataTableObj";
import DataTableArr from "../Components/DataTableObjArrCustom";

import React from "react";

const TeamComparison = () => {
  const teamNumInput = "";
  const [teamNum1, setTeamNum1] = useState();
  const [robot1Totals, setRobot1Totals] = useState();
  const [image1Url, setImage1Url] = useState("");

  const [teamNum2, setTeamNum2] = useState();
  const [robot2Totals, setRobot2Totals] = useState();
  const [image2Url, setImage2Url] = useState("");

  const handleTeamNumSubmit = (e) => {
    e.preventDefault();
    getImgUrls();
  };

  const getImgUrls = async () => {
    const data = await window.sheetsAPI.getSheet("pitScout");
    data.map((team) => {
      if (team["Team #"] === teamNum1) {
        setImage1Url(team["Image"]);
      }
      if (team["Team #"] === teamNum2) {
        setImage2Url(team["Image"]);
      }
    });
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
      <Row>
        <Col>
          <div>
            <img
              className="mx-2"
              style={{ verticalAlign: "top" }}
              src={image1Url}
              width={150}
              height={150}
            />
            <p style={{ display: "inline" }}>lorem ipsum doler sit amet</p>
          </div>
        </Col>
        <Col>
          <div>
            <img
              className="mx-2"
              style={{ verticalAlign: "top" }}
              src={image2Url}
              width={150}
              height={150}
            />
            <p style={{ display: "inline" }}>lorem ipsum doler sit amet</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamComparison;
