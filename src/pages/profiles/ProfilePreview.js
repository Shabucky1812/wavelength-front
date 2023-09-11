import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Avatar from '../../components/Avatar'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const ProfilePreview = ({profile}) => {
  const {id, following_id, image, owner, tracks_count} = profile
  const currentUser = useCurrentUser()
  const is_owner = currentUser?.username === owner

  return (
    <div className="align-items-center">
      <Link to={`/profiles/${id}`}>
        <Avatar src={image} />
      </Link>
      <div>
        <span>{owner}</span>
        <span>Shared Tracks: {tracks_count}</span>
      </div>
      <div className="text-right">
        {currentUser && !is_owner && (
          following_id ? (
            <Button onClick={() => {}}>unfollow</Button>
          ) : (
            <Button onClick={() => {}}>follow</Button>
          )
        )}
      </div>
    </div>
  )
}

export default ProfilePreview