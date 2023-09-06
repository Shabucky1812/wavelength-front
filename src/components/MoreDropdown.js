import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const DropdownIcon = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-chevron-down"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={DropdownIcon}/>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {}}>Edit Track</Dropdown.Item>
        <Dropdown.Item onClick={() => {}}>Delete Track</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
