import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Avatar from "../../components/Avatar";
// react-bootstrap components
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";

const Review = (props) => {
  const { profile_id, profile_image, owner, opinion, score, reviewed_at } =
    props;

const currentUser = useCurrentUser()
const is_owner = currentUser?.username === owner

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
      {is_owner && (
        <MoreDropdown handleEdit={() => {}} handleDelete={() => {}} contentType="Review" />
      )}
    </Media>
  </div>
  );
};

export default Review;
