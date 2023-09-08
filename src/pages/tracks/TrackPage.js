import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Track from "./Track";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import Review from "../reviews/Review";

const TrackPage = () => {
  const { id } = useParams();
  const [track, setTrack] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: track }, { data: reviews }] = await Promise.all([
          axiosReq.get(`/tracks/${id}`),
          axiosReq.get(`reviews/?track=${id}`),
        ]);
        setTrack({ results: [track] });
        setReviews(reviews);
        const userReview = currentUser ? (reviews.results.filter(review => review.owner === currentUser.username )) : null
        console.log(userReview)
        setUserReview(userReview)
      } catch (err) {
        // console.log(err)
      }
    };

    handleMount();
  }, [id, currentUser]);

  return (
    <div>
      <Track {...track.results[0]} trackPage />
      {currentUser ? (
        <ReviewCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          track={id}
          setTrack={setTrack}
          setReviews={setReviews}
        />
      ) : reviews.results.length ? (
        "Reviews"
      ) : null}
      {reviews.results.length ? (
        reviews.results.map((review) => (
          <Review
            key={review.id}
            {...review}
            setTrack={setTrack}
            setReviews={setReviews}
          />
        ))
      ) : currentUser ? (
        <span>No one has reviewed this track yet.</span>
      ) : (
        <span>No reviews yet, sign in/up to add your own!</span>
      )}
    </div>
  );
};

export default TrackPage;
