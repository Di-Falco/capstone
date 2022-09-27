import React from "react";
import Film from "./Film";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function FilmSearch (props) {


  return(
    <React.Fragment>
      <Container className="main">
        <Row>
          <Col sm={4}>
            <Form>
              <InputGroup>
                <Form.Control
                  placeholder="search by title"
                  aria-label="titleSearch"
                />
                <Button className="end">Search</Button>
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Search by release year</InputGroup.Text>
                <Form.Control 
                  placeholder="From: 1900"
                  aria-label="startYear"
                />
                <Form.Control
                  placeholder="To: 2000"
                  aria-label="endYear"
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default FilmSearch;