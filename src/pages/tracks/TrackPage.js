import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

const TrackPage = () => {
  const { id } = useParams();
  const [track, setTrack] = useState({results: []})

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data: track}] = await Promise.all([
          axiosReq.get(`/tracks/${id}`)
        ])
        setTrack({results: [track]})
        console.log(track)
      } catch(err) {
        // console.log(err)
      }
    }

    handleMount()
  }, [id])

  return (
    <div>
      <p>Track Component</p>
      <p>Create/Edit Review Form</p>
      <p>Review List</p>
    </div>
  );
};

export default TrackPage;
