import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
// react-bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
// custom components
import Track from "./Track";
import Asset from "../../components/Asset"

const TracksPage = ({message, filter=""}) => {
  const [tracks, setTracks] = useState({results: []})
  const [hasLoaded, setHasLoaded] = useState(false)
  const {pathname} = useLocation()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axiosReq.get(`/tracks/?${filter}`)
        setTracks(data)
        setHasLoaded(true)
      } catch(err) {
        // console.log(err)
      }
    }

    setHasLoaded(false)
    fetchPosts()
  }, [filter, pathname])

  return (
    <>
      <Row>
        <Col xs={6} md={8}>
          Search Bar
        </Col>
        <Col xs={6} md={4}>
          Filter
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={{span: 10, offset: 1}}>
          {hasLoaded ? (
            <>
              {tracks.results.length ? (
                tracks.results.map(track => (
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