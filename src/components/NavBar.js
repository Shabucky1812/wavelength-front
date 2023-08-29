import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
// css link
import styles from "../styles/NavBar.module.css";
// react-bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
// react-router-dom NavLink
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser()

  const loggedInIcons = (
    <>
        <NavLink
        to="/feed"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i class="fa-solid fa-heart"></i>Feed
      </NavLink>
      <NavLink
        to="/search"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i class="fa-solid fa-magnifying-glass"></i>Search
      </NavLink>
      <NavLink
        to="/"
        className={styles.Link}
        onClick={() => {}}
      >
        <i class="fa-regular fa-circle-xmark"></i>Sign Out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.Link}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  )

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i class="fa-solid fa-arrow-right-to-bracket"></i>Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        <i class="fa-solid fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="lg" fixed="top" variant="dark">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <h1>Wavelength</h1>
          </Navbar.Brand>
        </NavLink>
        {/* add track button here */}
        <Navbar.Toggle
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
              <i class="fa-solid fa-music"></i>Discover
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
