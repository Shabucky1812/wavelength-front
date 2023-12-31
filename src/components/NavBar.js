import React from "react";
import axios from "axios";
// react-bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
// react-router-dom NavLink
import { NavLink } from "react-router-dom";
// JWT utils
import { removeTokenTimestamp } from "../utils/utils";
// css link
import styles from "../styles/NavBar.module.css";
// custom components
import Avatar from "./Avatar";
// custom hooks
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

/**
 * NavBar component - used to render wavelength's navbar
 *
 * @returns the navbar content within a react-bootstrap NavBar element
 */
function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  /**
   * signs the current user out and stops the site from attempting to refresh access tokens.
   */
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err)
    }
  };

  // jsx for the share track navbar icon
  const shareTrackIcon = (
    <NavLink
      to="/tracks/create"
      className={`${styles.Link} ${styles.ShareTrack}`}
      activeClassName={styles.Active}
    >
      <i className="fa-solid fa-plus fa-lg" />
      Share Track
    </NavLink>
  );

  // icons to be displayed to logged in users
  const loggedInIcons = (
    <>
      <NavLink
        to="/feed"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-heart" />
        Feed
      </NavLink>
      <NavLink
        to="/search"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-magnifying-glass" />
        Search
      </NavLink>
      <NavLink to="/" className={styles.Link} onClick={handleSignOut}>
        <i className="fa-regular fa-circle-xmark" />
        Sign Out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.Link}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  // icons to be displayed to logged out users
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-arrow-right-to-bracket" />
        Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-user-plus" />
        Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="lg"
      fixed="top"
      variant="dark"
    >
      <Container className={styles.Container}>
        <NavLink to="/">
          <Navbar.Brand>
            <h1>Wavelength</h1>
          </Navbar.Brand>
        </NavLink>
        {currentUser && shareTrackIcon}
        {/* navbar toggle element handles collapsing navbar on smaller screens */}
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          ref={ref}
          aria-controls="basic-navbar-nav"
          className={styles.Toggler}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              to="/"
              className={styles.Link}
              activeClassName={styles.Active}
              exact
            >
              <i className="fa-solid fa-music" />
              Discover
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
