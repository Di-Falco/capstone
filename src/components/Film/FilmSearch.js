import React, { useState } from "react";
import Film from "./Film";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function FilmSearch (props) {
  const [values, setValues] = useState({
    title: "",
    startYear: 0,
    endYear: 3000
  }); 
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    setSubmitted(true);
  }

  const handleTitleInput = (event) => {
    setValues({...values, title: event.target.value});
  }

  const handleStartYearInput = (event) => {
    setValues({...values, startYear: event.target.value});
  }

  const handleEndYearInput = (event) => {
    setValues({...values, endYear: event.target.value});
  }

  return(
    <React.Fragment>
      <Container className="main">
        <Row>
          <Col sm={4}>
            <h1>Search Movies</h1>
            <Form id="searchForm" className="mt-2 mb-2" onSubmit={handleSubmit}>
              <InputGroup className="mb-2">
                <Form.Control
                  onChange={handleTitleInput}
                  placeholder="search by title"
                  id="title"
                  value={values.title}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <Form.Control 
                onChange={handleStartYearInput}
                  placeholder="from: 1980"
                  id="startYear" 
                />
                <Form.Control 
                  onChange={handleEndYearInput}
                  placeholder="to:&ensp;2000"
                  id="endYear"
                />
              </InputGroup>
              <Button className="end" type="submit">Search</Button>
            </Form>
          </Col>
          <Col sm={8}>
            <div className="searchResults">
              <h1></h1>

            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default FilmSearch;