import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// css links
import styles from "../../styles/ProfileEditForms.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
// react-bootstrap components
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

/**
 * PasswordEditForm component - used to render the password edit form
 * 
 * @returns password edit form within a container element
 */
const PasswordEditForm = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  /**
   * handles changes to form values and sets state accordingly
   */
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  /**
   * prevents default behaviour and attempts to submit form data to password change endpoint.
   * sets current user data and redirects user upon successful password change, sets errors
   * if the change fails.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      //   console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={formStyles.FormContainer}>
      <h2 className={formStyles.Title}>Change Password</h2>
      <hr />
      <Form onSubmit={handleSubmit} className={formStyles.Form}>
        <Form.Group className={styles.ProfileFormGroup}>
          <Form.Label className={formStyles.Label}>New password</Form.Label>
          <Form.Control
            placeholder="new password"
            type="password"
            value={new_password1}
            onChange={handleChange}
            name="new_password1"
          />
        </Form.Group>
        {errors?.new_password1?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <Form.Group className={styles.ProfileFormGroup}>
          <Form.Label className={formStyles.Label}>Confirm password</Form.Label>
          <Form.Control
            placeholder="confirm new password"
            type="password"
            value={new_password2}
            onChange={handleChange}
            name="new_password2"
          />
        </Form.Group>
        {errors?.new_password2?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <div className={styles.Buttons}>
          <button className={btnStyles.Btn} type="submit">Save</button>
          <button className={`${btnStyles.Btn} ${btnStyles.Cancel}`} onClick={() => history.goBack()}>Cancel</button>
        </div>
      </Form>
    </Container>
  );
};

export default PasswordEditForm;
