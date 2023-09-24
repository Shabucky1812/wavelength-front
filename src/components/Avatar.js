import React from "react";
// css link
import styles from "../styles/Avatar.module.css";

/**
 * Avatar component - used to render a user's profile image in a consistent format.
 *
 * @param {string} src - url of a user's profile image
 * @param {integer} height - value to be used as the height and width of the avatar,
 * defaults to 45
 * @param {string} text - optional text to be rendered next to avatar
 *
 * @returns user's profile image within a span element
 */
function Avatar ({ src, height = 45, text }) {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        alt="user avatar"
        height={height}
        width={height}
      />
      {text}
    </span>
  );
};

export default Avatar;
