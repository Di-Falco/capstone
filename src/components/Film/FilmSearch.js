import React from "react";
import Film from "./Film";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function FilmSearch (props) {

  function search (event) {
    const form = document.getElementById("searchForm");
    let data = new FormData(form);
    console.log(data);
  }

  return(
    <React.Fragment>
      <Container className="main">
        <Row>
          <Col sm={4}>
            <h1>Search Movies</h1>
            <Form id="searchForm" className="mt-2 mb-2" onSubmit={() => search()}>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="search by title"
                  id="title"
                />
                <Button className="end" type="submit">Search</Button>
              </InputGroup>
              <InputGroup className="mb-2">
                <Form.Control 
                  placeholder="from: 1980"
                  id="startYear" 
                />
                <Form.Control 
                  placeholder="to:&ensp;2000"
                  id="endYear"
                />
              </InputGroup>
            </Form>
          </Col>
          <Col sm={8}>
            <h1></h1>
            <div className="searchResults">

            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default FilmSearch;