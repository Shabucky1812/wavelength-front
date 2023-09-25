/* eslint-disable */
import React, { useRef, useState } from "react";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
// hooks
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useRedirect } from "../../hooks/useRedirect";
// axiosDefaults
import { axiosReq } from "../../api/axiosDefaults";
// css links
import styles from "../../styles/TrackCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

/**
 * TrackCreateForm component - renders a form used to create new track instances
 *
 * @returns track create form within a div element
 */
function TrackCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [trackData, setTrackData] = useState({
    title: "",
    artist: "",
    cover_art: "",
    genre_id: 0,
    opinion: "",
  });
  const { title, artist, cover_art, genre_id, opinion } = trackData;

  const imageInput = useRef(null);
  const history = useHistory();

  /**
   * handles changes to form values and sets state accordingly
   */
  const handleChange = (event) => {
    setTrackData({
      ...trackData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * handles changes to the cover art field
   */
  const handleChangeCoverArt = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(cover_art);
      setTrackData({
        ...trackData,
        cover_art: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
   * prevents default behaviour and attempts to submit form data to tracks endpoint.
   * redirects user upon successful creation, sets errors if the creation fails.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("cover_art", imageInput.current.files[0]);
    formData.append("genre_id", genre_id);
    formData.append("opinion", opinion);

    try {
      const { data } = await axiosReq.post("/tracks/", formData);
      history.push(`/tracks/${data.id}/`);
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className={styles.TrackFormBackground}>
      <Container className={formStyles.FormContainer}>
        <h2 className={formStyles.Title}>Share Track</h2>
        <hr />
        <Form className={formStyles.Form} onSubmit={handleSubmit}>
          {/* title field */}
          <Form.Group>
            <Form.Label htmlFor="title" className={formStyles.Label}>Title</Form.Label>
            <Form.Control
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* artist field */}
          <Form.Group>
            <Form.Label htmlFor="artist" className={formStyles.Label}>Artist</Form.Label>
            <Form.Control
              id="artist"
              type="text"
              name="artist"
              value={artist}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.artist?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* cover art field */}
          <Form.Group className={styles.CoverArt}>
            {cover_art ? (
              <Form.Label className={styles.ChangeImage} htmlFor="image-upload">
                <figure className={formStyles.ImagePreviewWrapper}>
                  <Image
                    src={cover_art}
                    alt="example track cover art"
                    className={formStyles.ImagePreview}
                  />
                </figure>
                Click/Tap to Change
              </Form.Label>
            ) : (
              <Form.Label className={styles.AddImage} htmlFor="image-upload">
                <i className="fa-solid fa-plus fa-xl" />
                Add Image
              </Form.Label>
            )}
            <Form.File
              id="image-upload"
              accept="image/*"
              className="d-none"
              onChange={handleChangeCoverArt}
              ref={imageInput}
            />
          </Form.Group>
          {errors.cover_art?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* genre_id field */}
          <Form.Group>
            <Form.Label htmlFor="genre" className={formStyles.Label}>Genre</Form.Label>
            <Form.Control
              id="genre"
              as="select"
              custom
              name="genre_id"
              value={genre_id}
              onChange={handleChange}
            >
              <option value={0}>No genre</option>
              <option value={1}>Pop</option>
              <option value={2}>Rock</option>
              <option value={3}>Hip-Hop</option>
              <option value={4}>Country</option>
              <option value={5}>R&B</option>
              <option value={6}>Folk</option>
              <option value={7}>Jazz</option>
              <option value={8}>Metal</option>
              <option value={9}>EDM</option>
              <option value={10}>Soul</option>
              <option value={11}>Funk</option>
              <option value={12}>Reggae</option>
              <option value={13}>Punk</option>
              <option value={14}>Classical</option>
              <option value={15}>Trap</option>
            </Form.Control>
          </Form.Group>
          {errors.genre_id?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* opinion field */}
          <Form.Group>
            <Form.Label htmlFor="opinion" className={formStyles.Label}>Opinion</Form.Label>
            <Form.Control
              id="opinion"
              as="textarea"
              rows={3}
              name="opinion"
              value={opinion}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.opinion?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <div className={styles.Buttons}>
            <button type="submit" className={`${btnStyles.Btn}`}>
              Share
            </button>
            <button
              type="button"
              onClick={() => history.goBack()}
              className={`${btnStyles.Btn} ${btnStyles.Cancel}`}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default TrackCreateForm;
