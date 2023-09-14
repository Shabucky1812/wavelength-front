import React from "react";
import { useHistory } from "react-router";
// react-bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const DropdownIcon = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-gear fa-lg"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete, contentType }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={DropdownIcon} />

      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item onClick={handleEdit}>Edit {contentType}</Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>
          Delete {contentType}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown>
      <Dropdown.Toggle as={DropdownIcon} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/picture`)}
          aria-label="edit-profile-picture"
        >
          Edit Profile Picture
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          Edit Username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
