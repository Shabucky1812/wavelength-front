import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// css link
import styles from "../../styles/Track.module.css";
// react-bootstrap components
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { Col, Row } from "react-bootstrap";

const Track = (props) => {
  const {
    artist,
    average_score,
    cover_art,
    created_at,
    genre,
    genre_id,
    id,
    opinion,
    owner,
    profile_id,
    profile_image,
    review_id,
    reviews_count,
    title,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.CardBackground}>
      <Card.Body>
        <Row>
          <Col xs={12} md={6}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={60} />
              {owner}
            </Link>
          </Col>
          <Col xs={12} md={6}>
            <Card.Img className={styles.CoverArt} src={cover_art} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Track;
