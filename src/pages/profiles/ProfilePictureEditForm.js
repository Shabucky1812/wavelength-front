import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// css links
import styles from "../../styles/ProfileEditForms.module.css";
import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

const ProfilePictureEditForm = () => {
  const [errors, setErrors] = useState([]);
  const setCurrentUser = useSetCurrentUser();
  const [profilePicture, setProfilePicture] = useState("");

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        const { image, is_owner } = data;

        is_owner ? setProfilePicture(image) : history.push("/");
      } catch (err) {
        // console.log(err)
      }
    };

    handleMount();
  }, [history, id]);

  const handleChangeProfilePicture = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(profilePicture);
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.push(`/profiles/${id}/`);
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container className={formStyles.FormContainer}>
      <h2 className={formStyles.Title}>Change Profile Image</h2>
      <Form onSubmit={handleSubmit} className={formStyles.Form}>
        <Form.Group className={styles.ProfileImage}>
          <Form.Label className={styles.ChangeImage} htmlFor="image-upload">
            <figure className={formStyles.ImagePreviewWrapper}>
              <Image
                src={profilePicture}
                alt="profile picture"
                className={formStyles.ImagePreview}
              />
            </figure>
            Click/Tap to change
          </Form.Label>
          <Form.File
            id="image-upload"
            accept="image/*"
            className="d-none"
            onChange={handleChangeProfilePicture}
            ref={imageInput}
          />
        </Form.Group>
        {errors.profilePicture?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
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

export default ProfilePictureEditForm;
