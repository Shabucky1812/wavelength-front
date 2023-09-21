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

/**
 * TrackPage component - renders information to be diplayed on the Track detail page.
 * Diplays the relevant track and it's reviews alongside a conditionally rendered review
 * create form.
 *
 * @returns all the track page content within a div element
 */
const TrackPage = () => {
  const { id } = useParams();
  const [track, setTrack] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    /**
     * Fetches relevant track and review data and updates state accordingly
     */
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
      <hr />
      {!!userReview.length ? (
        <>
          <Asset message="You have already reviewed this Track. Edit/Delete from below." />
          <hr />
        </>
      ) : currentUser ? (
        <ReviewCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          track={id}
          setTrack={setTrack}
          setReviews={setReviews}
        />
      ) : null}

      {/* reviews list */}
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
        <Asset message="No one has reviewed this track yet." />
      ) : (
        <Asset message="No reviews yet, sign in/up to add your own!" />
      )}
    </div>
  );
};

export default TrackPage;
