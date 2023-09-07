import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// css link
import styles from "../../styles/Track.module.css";
// custom components
import { MoreDropdown } from "../../components/MoreDropdown";
// react-bootstrap components
import Card from "react-bootstrap/Card";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosRes } from "../../api/axiosDefaults";

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
    reviews_count,
    title,
    trackPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/tracks/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
        await axiosRes.delete(`/tracks/${id}`)
        history.goBack()
    } catch {
        // console.log()
    }
  }

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
              {is_owner && trackPage && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}
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
              <span><i className="fa-regular fa-comment-dots"></i>{reviews_count} reviews</span>
            </Card.Text>
          </Col>
          <Col xs={12} md={6}>
            <Link to={`/tracks/${id}`} className={styles.CoverArtLink}>
              <Card.Img className={styles.CoverArt} src={cover_art} alt={title} />
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Track;
