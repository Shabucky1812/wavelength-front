import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../../utils/utils";

const ProfilePreview = ({ profile, setProfiles }) => {
  const { id, following_id, image, owner, tracks_count } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post(`/followers/`, {
        followed: clickedProfile.id,
      });

      setProfiles((prevState) => ({
        ...prevState,
        results: prevState.results.map((profile) => followHelper(profile, clickedProfile, data.id)),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
        await axiosRes.delete(`/followers/${clickedProfile.following_id}`)

        setProfiles((prevState) => ({
            ...prevState,
            results: prevState.results?.map((profile) => unfollowHelper(profile, clickedProfile))
        }))
    } catch(err) {
        // console.log(err)
    }
  }

  return (
    <div className="align-items-center">
      <Link to={`/profiles/${id}`}>
        <Avatar src={image} />
      </Link>
      <div>
        <span>{owner}</span>
        <span>Shared Tracks: {tracks_count}</span>
      </div>
      <div className="text-right">
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <Button onClick={() => handleUnfollow(profile)}>unfollow</Button>
          ) : (
            <Button onClick={() => handleFollow(profile)}>follow</Button>
          ))}
      </div>
    </div>
  );
};

export default ProfilePreview;
