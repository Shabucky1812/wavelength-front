import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../../utils/utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
// css links
import styles from "../../styles/ProfilePreview.module.css";
import btnStyles from "../../styles/Button.module.css";
// custom components
import Avatar from "../../components/Avatar";
// react-bootstrap components
import Button from "react-bootstrap/Button";

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
    <div className={styles.PreviewBackground}>
      <Link to={`/profiles/${id}`}>
        <Avatar src={image} />
      </Link>
      <div className={styles.InfoText}>
        <span>{owner}</span>
        <span className={styles.ExtraText}> - Shared Tracks: {tracks_count}</span>
      </div>
      <div className={styles.FollowButton}>
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <button onClick={() => handleUnfollow(profile)} className={`${btnStyles.Btn} ${btnStyles.FollowBtn}`}>unfollow</button>
          ) : (
            <button onClick={() => handleFollow(profile)} className={`${btnStyles.Btn} ${btnStyles.FollowBtn}`}>follow</button>
          ))}
      </div>
    </div>
  );
};

export default ProfilePreview;
