import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const DropdownIcon = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-gear"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({handleEdit, handleDelete, contentType}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={DropdownIcon}/>

      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item onClick={handleEdit}>Edit {contentType}</Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>Delete {contentType}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
