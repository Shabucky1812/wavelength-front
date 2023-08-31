import React from "react";
// react-bootstrap components
import Spinner from "react-bootstrap/Spinner";

const Asset = ({ spinner, src, message }) => {
  return (
    <div>
      {spinner && (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {src && <img src={src} alt={message} />}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Asset;
