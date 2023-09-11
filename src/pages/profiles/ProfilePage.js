import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Asset from "../../components/Asset";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";

const ProfilePage = () => {
  const [profile, setProfile] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
        ]);
        setProfile(profile);
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
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfilePage;
