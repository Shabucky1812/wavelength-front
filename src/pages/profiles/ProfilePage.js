import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Asset from "../../components/Asset";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";

const ProfilePage = () => {
  const [profile, setProfile] = useState({results: []})
  const [hasLoaded, setHasLoaded] = useState(false)
  const currentUser = useCurrentUser()
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{data: profile}] = await Promise.all([
          axiosReq.get(`/profiles/${id}`)
        ])
        setProfile(profile)
        setHasLoaded(true)
      } catch(err) {
        // console.log(err)
      }
    }

    fetchData();
  }, [id])

  return (
    <Container>
      {hasLoaded ? (
        <>
          <p>profile header info</p>
          {profile?.owner}
          {profile?.tracks_count}
          <p>tracks shared</p>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfilePage;
