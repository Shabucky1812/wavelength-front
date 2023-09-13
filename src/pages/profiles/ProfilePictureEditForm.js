import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
// css links
import btnStyles from "../../styles/Button.module.css";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

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
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <figure>
          <Image src={profilePicture} alt="profile picture" />
        </figure>
        <Form.Label className={btnStyles.Btn} htmlFor="image-upload">
          Change Image
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

      <Button onClick={() => history.goBack()}>Cancel</Button>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default ProfilePictureEditForm;
