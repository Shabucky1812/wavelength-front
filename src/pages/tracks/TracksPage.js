import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
// react-bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// custom components
import Track from "./Track";
import Asset from "../../components/Asset";

const TracksPage = ({ message, filter = "" }) => {
  const [tracks, setTracks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [genre, setGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tracks/?${filter}genre_id=${genre}&search=${searchQuery}`
        );
        setTracks(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err)
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, searchQuery, genre]);

  return (
    <>
      <Row>
        <Col xs={6} md={8}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search Tracks"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Form>
        </Col>
        <Col xs={6} md={4}>
          <span>Genre Filter:</span>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Control
              as="select"
              custom
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              <option value={""}>No filter</option>
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
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={{ span: 10, offset: 1 }}>
          {hasLoaded ? (
            <>
              {tracks.results.length ? (
                tracks.results.map((track) => (
                  <Track key={track.id} {...track} />
                ))
              ) : (
                <Container>
                  <Asset message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TracksPage;
