import React from "react";
// css link
import styles from "../styles/Asset.module.css"
// react-bootstrap components
import Spinner from "react-bootstrap/Spinner";

/**
 * Asset component - used to display various messages throughout the application,
 * usually regarding searches that return no results. Also used to display a spinner
 * whilst content is being loaded.
 * 
 * @param {boolean} spinner - to determine if the asset is being used as a spinner
 * @param {string} src - the url of an image that could be passed in
 * @param {string} message - text for the asset to render
 * 
 * @returns relevant content based on props within a div element.
 */
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
