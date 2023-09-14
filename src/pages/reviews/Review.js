import React, { useState } from "react";
import styles from "../../styles/Review.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Avatar from "../../components/Avatar";
import ReviewEditForm from "./ReviewEditForm";
// react-bootstrap components
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";

const Review = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    opinion,
    score,
    reviewed_at,
    id,
    setTrack,
    setReviews,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}`);
      setTrack((prevTrack) => ({
        results: [
          {
            ...prevTrack.results[0],
            average_score:
              prevTrack.results[0].reviews_count === 1
                ? null
                : Math.round(
                    (prevTrack.results[0].average_score *
                      prevTrack.results[0].reviews_count -
                      Number(score)) /
                      (prevTrack.results[0].reviews_count - 1)
                  ),
            reviews_count: prevTrack.results[0].reviews_count - 1,
          },
        ],
      }));
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <div className={styles.ReviewBackground}>
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className={styles.Body}>
          <span className={styles.Header}>{owner} - {reviewed_at}</span>
          {showEditForm ? (
            <ReviewEditForm
              id={id}
              profile_id={profile_id}
              profileImage={profile_image}
              prevOpinion={opinion}
              prevScore={score}
              setReviews={setReviews}
              setTrack={setTrack}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              <span className={styles.Opinion}>{opinion}</span>
              <span className={styles.Score}>{score}/100</span>
            </>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
            contentType="Review"
          />
        )}
      </Media>
    </div>
  );
};

export default Review;
