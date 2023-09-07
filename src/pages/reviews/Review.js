import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// custom components
import Avatar from "../../components/Avatar";
// react-bootstrap components
import Media from "react-bootstrap/Media";

const Review = (props) => {
  const { profile_id, profile_image, owner, opinion, score, reviewed_at } =
    props;

  return (
  <div>
    <hr />
    <Media>
      <Link to={`/profiles/${profile_id}`}>
        <Avatar src={profile_image} />
      </Link>
      <Media.Body>
        <span>{owner}</span>
        <span>{reviewed_at}</span>
        <p>{opinion}</p>
        <p>{score}/100</p>
      </Media.Body>
    </Media>
  </div>
  );
};

export default Review;
