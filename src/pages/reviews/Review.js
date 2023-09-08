import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Avatar from "../../components/Avatar";
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
                : Math.round((prevTrack.results[0].average_score *
                    prevTrack.results[0].reviews_count -
                    Number(score)) /
                  (prevTrack.results[0].reviews_count - 1)),
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
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body>
          <span>{owner}</span>
          <span>{reviewed_at}</span>
          <p>{opinion}</p>
          <p>{score}/100</p>
        </Media.Body>
        {is_owner && (
          <MoreDropdown
            handleEdit={() => {}}
            handleDelete={handleDelete}
            contentType="Review"
          />
        )}
      </Media>
    </div>
  );
};

export default Review;
