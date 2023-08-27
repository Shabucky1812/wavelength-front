// app css
import styles from "./App.module.css";
// components
import NavBar from "./components/NavBar";
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
          <Route exact path="/signin" render={() => <h2>sign in</h2>} />
          <Route exact path="/signup" render={() => <h2>sign up</h2>} />
          {/* 404 Route */}
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
