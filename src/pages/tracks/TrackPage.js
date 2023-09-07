import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Track from "./Track";
import ReviewCreateForm from "../reviews/ReviewCreateForm";

const TrackPage = () => {
  const { id } = useParams();
  const [track, setTrack] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: track }] = await Promise.all([
          axiosReq.get(`/tracks/${id}`),
        ]);
        setTrack({ results: [track] });
      } catch (err) {
        // console.log(err)
      }
    };

    handleMount();
  }, [id]);

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
        "Reviews here"
      ) : null}
    </div>
  );
};

export default TrackPage;
