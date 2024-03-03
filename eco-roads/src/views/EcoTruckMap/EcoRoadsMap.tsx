import '../../css/App.css';
import * as React from "react";
import {Map} from "../../components/open-layers/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'
import {Col, Container, Row} from "react-bootstrap";
import {RoadsBuilderPanel} from "../../components/roads-builder/panel/RoadsBuilderPanel";

export const EcoRoadsMap = () => {
  return (
      <Container className="g-0" fluid>
        <Row className="g-0">
          <Col md={9}>
            <Map/>
          </Col>
          <Col md={3}>
            <RoadsBuilderPanel/>
          </Col>
        </Row>
      </Container>
  );
}
