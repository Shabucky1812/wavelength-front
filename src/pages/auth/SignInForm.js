import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import axios from "axios";
import { setTokenTimestamp } from "../../utils/utils";
// css links
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser()
  useRedirect('loggedIn')

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({})

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user)
      setTokenTimestamp(data)
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div className={styles.SignInBackground}>
      <Container className={styles.FormContainer}>
        <h2 className={styles.Title}>Sign In</h2>
        <hr />
        <Form className={styles.Form} onSubmit={handleSubmit}>
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
          {errors.username?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* password field */}
          <Form.Group controlId="password">
            <Form.Label className={styles.Label}>Password:</Form.Label>
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