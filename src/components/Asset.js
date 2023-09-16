import React from "react";
// css link
import styles from "../styles/Asset.module.css"
// react-bootstrap components
import Spinner from "react-bootstrap/Spinner";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={styles.Asset}>
      {spinner && (
        <Spinner animation="border" role="status" className={styles.Spinner}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {src && <img src={src} alt={message} />}
      {message && <p className={styles.Message}>{message}</p>}
    </div>
  );
};

export default Asset;
