import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData, followHelper, unfollowHelper } from "../../utils/utils";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
// css links
import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
// custom components
import Asset from "../../components/Asset";
import Track from "../tracks/Track";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";

const ProfilePage = () => {
  const [profile, setProfile] = useState({ results: [] });
  const [profileTracks, setProfileTracks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;
  const { id } = useParams();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post(`/followers/`, {
        followed: clickedProfile.id,
      });

      setProfile((prevState) => ({
        ...prevState,
        results: prevState.results?.map((profile) =>
          followHelper(profile, clickedProfile, data.id)
        ),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfile((prevState) => ({
        ...prevState,
        results: prevState.results?.map((profile) =>
          unfollowHelper(profile, clickedProfile)
        ),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profile }, { data: tracks }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/tracks/?owner__profile=${id}`),
        ]);
        setProfile(profile);
        setProfileTracks(tracks);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err)
      }
    };

    fetchData();
  }, [id, profile]);

  return (
    <Container className={styles.ProfileContainer}>
      {hasLoaded ? (
        <>
          <Row className={styles.ProfileHeader}>
            <Col md={4} xs={12}>
              <Image
                src={profile?.image}
                alt="profile avatar"
                className={styles.ProfileAvatar}
              />
              <h2 className={styles.Owner}>{profile?.owner}</h2>
            </Col>
            <Col xs={12} md={8}>
              <Row className={styles.StatsRow}>
                <Col xs={12} sm={4} className={styles.StatsCol}>
                  <span className={styles.StatNumber}>
                    {profile?.tracks_count}
                  </span>
                  <p>tracks</p>
                </Col>
                <Col xs={12} sm={4} className={styles.StatsCol}>
                  <span className={styles.StatNumber}>
                    {profile?.followers_count}
                  </span>
                  <p>followers</p>
                </Col>
                <Col xs={12} sm={4} className={styles.StatsCol}>
                  <span className={styles.StatNumber}>
                    {profile?.following_count}
                  </span>
                  <p>following</p>
                </Col>
              </Row>
              {currentUser &&
                !is_owner &&
                (profile.following_id ? (
                  <button
                    className={`${btnStyles.Btn} ${btnStyles.FollowBtn}`}
                    onClick={() => handleUnfollow(profile)}
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    className={`${btnStyles.Btn} ${btnStyles.FollowBtn}`}
                    onClick={() => handleFollow(profile)}
                  >
                    follow
                  </button>
                ))}
              {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            </Col>
          </Row>
          <hr />
          <Container>
            <p className={styles.TracksTitle}>{profile?.owner}'s Shared Tracks:</p>
            {profileTracks?.results.length ? (
              <InfiniteScroll
                children={profileTracks.results.map((track) => (
                  <Track key={track.id} {...track} />
                ))}
                dataLength={profileTracks.results.length}
                loader={<Asset spinner />}
                hasMore={!!profileTracks.next}
                next={() => fetchMoreData(profileTracks, setProfileTracks)}
              />
            ) : (
              <Asset
                message={`${profile?.owner} has not shared any tracks yet!`}
              />
            )}
          </Container>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfilePage;
