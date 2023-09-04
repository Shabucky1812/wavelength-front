import React, { useEffect, useState } from "react";
// react-bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

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
                console.log("show tracks")
              ) : (
                console.log("no results msg")
              )}
            </>
          ) : (
            console.log("spinner")
          )}
        </Col>
      </Row>
    </>
  );
};

export default TracksPage;
