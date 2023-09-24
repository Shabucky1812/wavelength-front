/* eslint-disable */
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// react-bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// the icon that represents the dropdown menu
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

/**
 * MoreDropdown component - used to access edit/delete functions for various content
 * types throughout the application.
 * 
 * @param {function} handleEdit - the relevant content's edit function
 * @param {function} handleDelete - the relevant content's delete function
 * @param {string} contentType - text relevant to content (e.g. Track/Review)
 * 
 * @returns dropdown element with edit and delete items
 */
export function MoreDropdown({ handleEdit, handleDelete, contentType }) {
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

/**
 * ProfileEditDropdown component - used for the dropdown element on the profile page.
 * Needs to be different because the profile requires unique edit forms.
 * 
 * @param {integer} id - the id of the current profile 
 * 
 * @returns dropdown element with all three edit items for the profile.
 */
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
