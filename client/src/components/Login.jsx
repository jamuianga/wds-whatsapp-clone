import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Container, Form } from 'react-bootstrap';

export default function Login({ onIdSubmit }) {
  const idRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const createNewId = () => {
    onIdSubmit(uuid());
  };

  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: '100vh' }}
    >
      <Form className="w-100" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="me-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>
          Create a new ID
        </Button>
      </Form>
    </Container>
  );
}
