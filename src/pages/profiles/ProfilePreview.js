/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../../utils/utils";
import { axiosRes } from "../../api/axiosDefaults";
// css links
import styles from "../../styles/ProfilePreview.module.css";
import btnStyles from "../../styles/Button.module.css";
// custom components
import Avatar from "../../components/Avatar";

/**
 * ProfilePreview component - used to display previews of each profile on the
 * Profile Search page.
 * 
 * @param {dict} profile - relevant profile data
 * @param {function} setProfile - function used to update profile data on follow/unfollow
 * 
 * @returns profile preview within a div element
 */
function ProfilePreview({ profile, setProfiles }) {
  const { id, following_id, image, owner, tracks_count } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  /**
   * creates a follower instance with the current user following the clicked
   * user profile
   *
   * @param {dict} clickedProfile - info about the clicked profile
   */
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

  /**
   * removes the follower instance relevant to the current user and the clicked
   * user profile
   *
   * @param {dict} clickedProfile - info about the clicked profile
   */
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
            <button type="button" onClick={() => handleUnfollow(profile)} className={`${btnStyles.Btn} ${btnStyles.FollowBtn}`}>unfollow</button>
          ) : (
            <button type="button" onClick={() => handleFollow(profile)} className={`${btnStyles.Btn} ${btnStyles.FollowBtn}`}>follow</button>
          ))}
      </div>
    </div>
  );
};

export default ProfilePreview;
