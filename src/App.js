// app css
import styles from "./App.module.css";
// components
import NavBar from "./components/NavBar";
// auth pages
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
// track pages
import TrackCreateForm from "./pages/tracks/TrackCreateForm";
import TrackPage from "./pages/tracks/TrackPage";
// react-bootstrap
import Container from "react-bootstrap/Container";
// react-router-dom
import { Switch, Route } from "react-router-dom";
// axiosDefaults
import "./api/axiosDefaults";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h2>discover</h2>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/tracks/create" render={() => <TrackCreateForm />} />
          <Route exact path="/tracks/:id" render={() => <TrackPage />} />
          {/* 404 Route */}
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
