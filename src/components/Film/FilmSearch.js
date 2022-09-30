import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Film from "./Film";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import { registerVersion } from "firebase/app";

function FilmSearch (props) {

  const methods = useForm();
  const { register } = useFormContext(); 

  const search = (data) => {
    console.log(data);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("searchForm");
    console.log(form);
    form.addEventListener('submit', search(), false);
  }, false);

  return(
    <React.Fragment>
      <Container className="main">
        <Row>
          <Col sm={4}>
            <h1>Search Movies</h1>
            <FormProvider {...methods}>
            <Form id="searchForm" className="mt-2 mb-2" onSubmit={() => methods.handleSubmit(search)}>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="search by title"
                  id="title"
                  {...register("title")}
                />
              </InputGroup>
              {/* <InputGroup className="mb-2">
                <Form.Control 
                  placeholder="from: 1980"
                  id="startYear" 
                />
                <Form.Control 
                  placeholder="to:&ensp;2000"
                  id="endYear"
                />
              </InputGroup> */}
              <Button className="end" type="submit">Search</Button>
            </Form>
            </FormProvider> 
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