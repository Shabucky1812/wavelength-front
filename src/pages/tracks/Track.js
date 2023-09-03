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
    id,
    opinion,
    owner,
    profile_id,
    profile_image,
    review_id,
    reviews_count,
    title,
    trackPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.CardBackground}>
      <Card.Header className={styles.Header}>
        <Row>
          <Col xs={12}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={60} />
              <span className={styles.HeaderText}>{owner}</span>
            </Link>
            <div className={styles.RightHeader}>
              <span className={styles.HeaderText}>Shared {created_at}</span>
              {is_owner && trackPage && "..."}
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={12} md={6} className={`${styles.InfoContainer}`}>
            <div>
              <Card.Title className={styles.Title}>
                {title} - {artist}
              </Card.Title>
              <Card.Subtitle className={styles.Subtitle}>{genre}</Card.Subtitle>
            </div>
            <hr />
            <Card.Text>{opinion}</Card.Text>
            <hr />
            <Card.Text>
              Score:{" "}
              <span>{average_score ? average_score : "Not yet scored"}</span>
            </Card.Text>
          </Col>
          <Col xs={12} md={6}>
            <Card.Img className={styles.CoverArt} src={cover_art} alt={title} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Track;
