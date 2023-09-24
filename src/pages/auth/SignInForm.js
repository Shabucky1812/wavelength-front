/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// hooks
import { useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";
// JWT utils
import { setTokenTimestamp } from "../../utils/utils";
// css links
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
// context hook
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * SignInForm component - used to render the sign in form
 *
 * @returns sign in form
 */
function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  /**
   * handles changes to form values and sets state accordingly
   */
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * prevents default behaviour and attempts to submit form data to login endpoint.
   * sets current user data and redirects user upon successful login, sets errors
   * if the sign in fails.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div className={styles.SignInBackground}>
      <Container className={formStyles.FormContainer}>
        <h2 className={formStyles.Title}>Sign In</h2>
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

          {/* password field */}
          <Form.Group controlId="password">
            <Form.Label className={formStyles.Label}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* non_field_errors */}
          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <button
            type="submit"
            className={`${btnStyles.Btn} ${btnStyles.Right}`}
          >
            Sign in
          </button>
        </Form>
      </Container>
    </div>
  );
}

export default SignInForm;
