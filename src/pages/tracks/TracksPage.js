/* eslint-disable */
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// react-bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// hooks
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// axiosDefaults
import { axiosReq } from "../../api/axiosDefaults";
// utils
import { fetchMoreData } from "../../utils/utils";
// context hooks
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// css links
import styles from "../../styles/TracksPage.module.css";
// custom components
import Track from "./Track";
import Asset from "../../components/Asset";

/**
 * TracksPage component - used to return a list view of shared tracks based on the filters applied.
 *
 * @param {string} message - text to be displayed if a search returns no data
 * @param {string} filter - filter value to be applied based on which page the user is on
 *
 * @returns a search bar and genre filter above the list view of tracks all within a react fragment.
 */
function TracksPage({ message, filter = "" }) {
  const [tracks, setTracks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [genre, setGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    /**
     * fetches tracks based on filters applied and updates state accordingly
     */
    const fetchTracks = async () => {
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
    // searches on a half second timer to prevent rapid requests
    const timer = setTimeout(() => {
      fetchTracks();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, searchQuery, genre, currentUser]);

  return (
    <>
      <Row className={styles.FilterRow}>
        <Col xs={6} md={8}>
          <i className="fa-solid fa-magnifying-glass"/>Search
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
              <option value="">No filter</option>
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
      <hr />
      <Row>
        <Col xs={12} md={{ span: 10, offset: 1 }}>
          {hasLoaded ? (
            <>
              {tracks.results.length ? (
                <InfiniteScroll
                  children={tracks.results.map((track) => (
                    <Track key={track.id} {...track} />
                  ))}
                  dataLength={tracks.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!tracks.next}
                  next={() => fetchMoreData(tracks, setTracks)}
                />
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
