import React from "react";
// react-bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TracksPage = ({message, filter=""}) => {
  return (
    <>
      <Row>
        <Col xs={6} md={8}>
          Search Bar
        </Col>
        <Col xs={6} md={4}>
          Filter
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={{span: 10, offset: 1}}>
          Track List
        </Col>
      </Row>
    </>
  );
};

export default TracksPage;
