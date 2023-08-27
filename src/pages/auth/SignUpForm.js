import React from "react";
// css link
import styles from "../../styles/SignInUpForm.module.css";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUpForm = () => {
  return (
    <div className={styles.Background}>
      <Container className={styles.FormContainer}>
        <h2 className={styles.Title}>Create an Account</h2>
        <hr />
        <Form className={styles.Form}>
          <Form.Group controlId="username">
            <Form.Label className={styles.Label}>Username:</Form.Label>
            <Form.Control type="text" placeholder="Username" name="username" />
          </Form.Group>

          <Form.Group controlId="password1">
            <Form.Label className={styles.Label}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
            />
          </Form.Group>

          <Form.Group controlId="password2">
            <Form.Label className={styles.Label}>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="password2"
            />
          </Form.Group>

          <Button type="submit">Sign up</Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignUpForm;
