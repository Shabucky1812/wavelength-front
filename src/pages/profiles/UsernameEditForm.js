import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
// css links
import styles from "../../styles/ProfileEditForms.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
// react-bootstrap components
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

/**
 * UsernameEditForm component - used to render the username edit form
 * 
 * @returns username edit form within a container
 */
const UsernameEditForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  /**
   * prevents default behaviour and attempts to submit form data to profile endpoint.
   * sets current user data and redirects user upon successful submit, sets errors
   * if the submit fails.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={formStyles.FormContainer}>
      <h2 className={formStyles.Title}>Change Username</h2>
      <hr />
      <Form onSubmit={handleSubmit} className={styles.Form}>
        <Form.Group className={styles.ProfileFormGroup}>
          <Form.Label className={formStyles.Label}>Change username</Form.Label>
          <Form.Control
            placeholder="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        {errors?.username?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <div className={styles.Buttons}>
          <button className={btnStyles.Btn} type="submit">
            Save
          </button>
          <button
            className={`${btnStyles.Btn} ${btnStyles.Cancel}`}
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default UsernameEditForm;
