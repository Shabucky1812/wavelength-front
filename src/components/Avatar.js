import React from 'react'
// css link
import styles from "../styles/Avatar.module.css"

const Avatar = ({src, height=45, text}) => {
  return (
    <span><img className={styles.Avatar} src={src} alt='user avatar' height={height} width={height} />{text}</span>
  )
}

export default Avatar