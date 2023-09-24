/* eslint-disable */
import { useCurrentUser } from "./contexts/CurrentUserContext";
// app css
import styles from "./App.module.css";
// components
import Asset from "./components/Asset";
import NavBar from "./components/NavBar";
// auth pages
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
// track pages
import TrackCreateForm from "./pages/tracks/TrackCreateForm";
import TrackEditForm from "./pages/tracks/TrackEditForm";
import TrackPage from "./pages/tracks/TrackPage";
import TracksPage from "./pages/tracks/TracksPage";
// profile pages
import ProfileSearch from "./pages/profiles/ProfileSearch";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfilePictureEditForm from "./pages/profiles/ProfilePictureEditForm";
import UsernameEditForm from "./pages/profiles/UsernameEditForm";
import PasswordEditForm from "./pages/profiles/PasswordEditForm";
// react-bootstrap
import Container from "react-bootstrap/Container";
// react-router-dom
import { Switch, Route } from "react-router-dom";
// axiosDefaults
import "./api/axiosDefaults";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <TracksPage message="No results found. Adjust the search query." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <TracksPage
                message="No results found. Follow a user/adjust the search query"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/search" render={() => <ProfileSearch message="No results found. Adjust the search query." />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/tracks/create"
            render={() => <TrackCreateForm />}
          />
          <Route exact path="/tracks/:id/edit" render={() => <TrackEditForm />} />
          <Route exact path="/tracks/:id" render={() => <TrackPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/picture" render={() => <ProfilePictureEditForm />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameEditForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <PasswordEditForm />} />
          {/* 404 Route */}
          <Route render={() => <Asset message="We couldn't find what you're looking for :(" />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
