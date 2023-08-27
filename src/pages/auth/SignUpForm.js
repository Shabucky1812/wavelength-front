import React, { useState } from "react";
// css link
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.Background}>
      <Container className={styles.FormContainer}>
        <h2 className={styles.Title}>Create an Account</h2>
        <hr />
        <Form className={styles.Form}>
          {/* username field */}
          <Form.Group controlId="username">
            <Form.Label className={styles.Label}>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>

          {/* password1 field */}
          <Form.Group controlId="password1">
            <Form.Label className={styles.Label}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>

          {/* password2 field */}
          <Form.Group controlId="password2">
            <Form.Label className={styles.Label}>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            className={`${btnStyles.Btn} ${btnStyles.Right}`}
          >
            Sign up
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignUpForm;
