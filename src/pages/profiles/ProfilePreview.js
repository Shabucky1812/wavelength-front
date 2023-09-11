import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
        results: prevState.results.map((profile) => {
          return profile.id === clickedProfile.id
            ? {
                ...profile,
                followers_count: profile.followers_count + 1,
                following_id: data.id,
              }
            : profile.is_owner
            ? {
                ...profile,
                following_count: profile.following_count + 1,
              }
            : profile;
        }),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

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
            <Button onClick={() => {}}>unfollow</Button>
          ) : (
            <Button onClick={() => handleFollow(profile)}>follow</Button>
          ))}
      </div>
    </div>
  );
};

export default ProfilePreview;
