import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
// custom components
import Asset from "../../components/Asset";
import Track from "../tracks/Track";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const ProfilePage = () => {
  const [profile, setProfile] = useState({ results: [] });
  const [profileTracks, setProfileTracks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;
  const { id } = useParams();

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
  }, [id]);

  return (
    <Container>
      {hasLoaded ? (
        <>
          <div>
            <p>profile header info</p>
            {profile?.owner}
            {profile?.tracks_count}
            <p>tracks shared</p>
            {currentUser &&
              !is_owner &&
              (profile.following_id ? (
                <Button onClick={() => {}}>unfollow</Button>
              ) : (
                <Button onClick={() => {}}>follow</Button>
              ))}
          </div>
          <hr />
          <Container>
            <p>{profile?.owner}'s Shared Tracks</p>
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
              <Asset message={`${profile?.owner} has not shared any tracks yet!`} />
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
