import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
// css links
import btnStyles from "../../styles/Button.module.css";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const TrackCreateForm = () => {
  const [trackData, setTrackData] = useState({
    title: "",
    artist: "",
    cover_art: "",
    genre: 0,
    opinion: "",
  });
  const { title, artist, cover_art, genre, opinion } = trackData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setTrackData({
      ...trackData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCoverArt = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(cover_art);
      setTrackData({
        ...trackData,
        cover_art: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("cover_art", imageInput.current.files[0]);
    formData.append("genre", genre);
    formData.append("opinion", opinion);

    try {
      const { data } = await axiosReq.post("/tracks/", formData);
      history.push(`/tracks/${data.id}/`);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Artist</Form.Label>
        <Form.Control
          type="text"
          name="artist"
          value={artist}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        {cover_art ? (
          <>
            <figure>
              <Image src={cover_art} alt="example track cover art" />
            </figure>
            <Form.Label className={btnStyles.Btn} htmlFor="image-upload">
              Change Image
            </Form.Label>
          </>
        ) : (
          <Form.Label className={btnStyles.Btn} htmlFor="image-upload">
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
      <Form.Group>
        <Form.Label>Genre</Form.Label>
        <Form.Control
          as="select"
          custom
          name="genre"
          value={genre}
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
      <Form.Group>
        <Form.Label>Opinion</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="opinion"
          value={opinion}
          onChange={handleChange}
        />
      </Form.Group>
      <Button onClick={() => history.goBack()}>Cancel</Button>
      <Button type="submit">Share</Button>
    </Form>
  );
};

export default TrackCreateForm;
