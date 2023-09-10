import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
// react-bootstrap components
import Container from 'react-bootstrap/Container'

const ProfileSearch = ({message}) => {
  const [profileData, setProfileData] = useState({results: []})
  const [searchQuery, setSearchQuery] = useState("")
  const currentUser = useCurrentUser()

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq.get(`/profiles/?ordering=-followers_count&search=${searchQuery}`)
        setProfileData(data)
      } catch(err) {
        // console.log(err)
      }
    }

    handleMount()
  }, [currentUser, searchQuery])

  return (
    <Container>
      <p>Search bar</p>
      {profileData.results.map(profile => <p key={profile.id}>{profile.owner}</p>)}
      {message}
    </Container>
  )
}

export default ProfileSearch