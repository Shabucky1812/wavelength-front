import React from "react";
// css links
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignInForm = () => {
  return (
    <div className={styles.SignInBackground}>
      <Container className={styles.FormContainer}>
        <h2 className={styles.Title}>Sign In</h2>
        <hr />
        <Form className={styles.Form}>
          {/* username field */}
          <Form.Group controlId="username">
            <Form.Label className={styles.Label}>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
            />
          </Form.Group>

          {/* password field */}
          <Form.Group controlId="password">
            <Form.Label className={styles.Label}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>

          <Button
            type="submit"
            className={`${btnStyles.Btn} ${btnStyles.Right}`}
          >
            Sign in
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignInForm;