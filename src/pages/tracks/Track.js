import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
// css link
import styles from "../../styles/Track.module.css";
// custom components
import { MoreDropdown } from "../../components/MoreDropdown";
import Avatar from "../../components/Avatar";
// react-bootstrap components
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

/**
 * Track component - renders informations about a track to be displayed throughout the site.
 *
 * @param {dict} props - contains information about the current track, aswell as if the
 * component is being loaded on the TrackPage.
 *
 * @returns track info rendered within a card element
 */
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

  /**
   * edit function to be passed to the MoreDropdown component
   */
  const handleEdit = () => {
    history.push(`/tracks/${id}/edit`);
  };

  /**
   * delete function to be passed to the MoreDropdown component
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tracks/${id}`);
      history.goBack();
    } catch {
      // console.log()
    }
  };

  return (
    <Card className={styles.CardBackground}>
      <Card.Header className={styles.Header}>
        <Row>
          <Col xs={12}>
            <Link
              to={`/profiles/${profile_id}`}
              className={styles.ProfileAvatar}
            >
              <Avatar src={profile_image} height={60} />
              <span className={styles.HeaderText}>{owner}</span>
            </Link>
            <span className={styles.Dropdown}>
              {is_owner && trackPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  contentType="Track"
                />
              )}
            </span>
            <div className={styles.RightHeader}>
              <span
                className={`${styles.HeaderText} ${styles.UpdatedTimeText}`}
              >
                Shared {created_at}
              </span>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={12} md={6} className={`${styles.InfoContainer}`}>
            <div className={styles.InfoBox}>
              <Card.Title className={styles.Title}>
                {title} - {artist}
              </Card.Title>
              <Card.Subtitle className={styles.Subtitle}>{genre}</Card.Subtitle>
            </div>
            <hr />
            <div className={styles.InfoBox}>
              <Card.Text className={styles.Opinion}>{opinion}</Card.Text>
            </div>
            <hr />
            <div className={styles.InfoBox}>
              <Card.Text className={styles.ScoreText}>
                Score:{" "}
                <span className={styles.Score}>
                  {average_score ? average_score : "Not yet scored"}
                </span>
                <span className={styles.ReviewCount}>
                  <i className="fa-regular fa-comment-dots"></i>
                  {reviews_count} reviews
                </span>
              </Card.Text>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Link to={`/tracks/${id}`} className={styles.CoverArtLink}>
              <Card.Img
                className={styles.CoverArt}
                src={cover_art}
                alt={title}
              />
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Track;
