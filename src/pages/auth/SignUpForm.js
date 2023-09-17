import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";
import axios from "axios";
// css links
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

/**
 * SignUpForm component - used to render the sign up form
 *
 * @returns sign up form
 */
const SignUpForm = () => {
  useRedirect("loggedIn");

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  /**
   * handles changes to form values and sets state accordingly
   */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * prevents default behaviour and attempts to submit form data to sign up endpoint.
   * sets current user data and redirects user upon successful sign up, sets errors
   * if the sign up fails.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div className={styles.SignUpBackground}>
      <Container className={formStyles.FormContainer}>
        <h2 className={formStyles.Title}>Create an Account</h2>
        <hr />
        <Form className={formStyles.Form} onSubmit={handleSubmit}>
          {/* username field */}
          <Form.Group controlId="username">
            <Form.Label className={formStyles.Label}>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.username?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* password1 field */}
          <Form.Group controlId="password1">
            <Form.Label className={formStyles.Label}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password1?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* password2 field */}
          <Form.Group controlId="password2">
            <Form.Label className={formStyles.Label}>
              Confirm password:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password2?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* non_field_errors such as passwords don't match */}
          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <button
            type="submit"
            className={`${btnStyles.Btn} ${btnStyles.Right}`}
          >
            Sign up
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default SignUpForm;
