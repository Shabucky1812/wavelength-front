import React, { useState } from "react";
// react-bootstrap components
import Form from "react-bootstrap/Form";

const TrackCreateForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    artist: "",
    cover_art: "",
    genre: "",
    opinion: "",
  });
  const { title, artist, cover_art, genre, opinion } = postData;

  return (
    <Form>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Artist</Form.Label>
        <Form.Control type="text" name="artist" />
      </Form.Group>
      <Form.Group>
        <Form.Label
          htmlFor="image-upload"
        >
          asset
        </Form.Label>
        <Form.File id="image-upload" accept="image/*" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Genre</Form.Label>
        <Form.Control as="select" custom name="genre">
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
        />
      </Form.Group>
    </Form>
  );
};

export default TrackCreateForm;
