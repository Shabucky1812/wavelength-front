import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
// css links
import styles from "../../styles/ProfileSearch.module.css";
// custom components
import Asset from "../../components/Asset";
import ProfilePreview from "./ProfilePreview";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// infinite scroll
import InfiniteScroll from "react-infinite-scroll-component";

const ProfileSearch = ({ message }) => {
  const [profiles, setProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          `/profiles/?ordering=-followers_count&search=${searchQuery}`
        );
        setProfiles(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err)
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchProfiles();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [currentUser, searchQuery]);

  return (
    <Container>
      <Form onSubmit={(event) => event.preventDefault()} className={styles.SearchBar}>
        <i className="fa-solid fa-magnifying-glass"></i>Search
        <Form.Control
          type="text"
          placeholder="Search Profiles"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Form>
      <hr/>
      {hasLoaded ? (
        <>
          {profiles.results.length ? (
            <InfiniteScroll
              children={profiles.results.map((profile) => (
                <ProfilePreview key={profile.id} profile={profile} setProfiles={setProfiles} />
              ))}
              dataLength={profiles.results.length}
              loader={<Asset spinner />}
              hasMore={!!profiles.next}
              next={() => fetchMoreData(profiles, setProfiles)}
            />
          ) : (
            <Container>
              <Asset message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
};

export default ProfileSearch;
