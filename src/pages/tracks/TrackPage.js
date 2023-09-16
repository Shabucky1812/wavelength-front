import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
// custom components
import Track from "./Track";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import Review from "../reviews/Review";
import Asset from "../../components/Asset";

const TrackPage = () => {
  const { id } = useParams();
  const [track, setTrack] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: track }, { data: reviews }] = await Promise.all([
          axiosReq.get(`/tracks/${id}`),
          axiosReq.get(`reviews/?track=${id}`),
        ]);
        setTrack({ results: [track] });
        setReviews(reviews);
        const userReview = currentUser
          ? reviews.results.filter(
              (review) => review.owner === currentUser.username
            )
          : [];
        setUserReview(userReview);
      } catch (err) {
        // console.log(err)
      }
    };

    handleMount();
  }, [id, currentUser, reviews]);

  return (
    <div>
      <Track {...track.results[0]} trackPage />
      {/* review form (create/edit) */}
      <hr/>
      {!!userReview.length ? (
        <p>already reviewed, please edit your existing review instead!</p>
      ) : currentUser ? (
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

      {/* reviews list */}
      <hr/>
      {reviews.results.length ? (
        <InfiniteScroll
          children={reviews.results.map((review) => (
            <Review
              key={review.id}
              {...review}
              setTrack={setTrack}
              setReviews={setReviews}
            />
          ))}
          dataLength={reviews.results.length}
          loader={<Asset spinner />}
          hasMore={!!reviews.next}
          next={() => fetchMoreData(reviews, setReviews)}
        />
      ) : currentUser ? (
        <span>No one has reviewed this track yet.</span>
      ) : (
        <span>No reviews yet, sign in/up to add your own!</span>
      )}
    </div>
  );
};

export default TrackPage;
