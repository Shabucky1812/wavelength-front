import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
// custom components
import Avatar from "../../components/Avatar";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ReviewCreateForm(props) {
  const { track, setTrack, setReviews, profileImage, profile_id } = props;
  const [reviewData, setReviewData] = useState({
    opinion: "",
    score: 0,
  });

  const { opinion, score } = reviewData;

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        opinion,
        score,
        track,
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }));
      setTrack((prevTrack) => ({
        results: [
          {
            ...prevTrack.results[0],
            average_score: prevTrack.results[0].average_score
              ? (prevTrack.results[0].average_score *
                  prevTrack.results[0].reviews_count +
                  Number(score)) /
                (prevTrack.results[0].reviews_count + 1)
              : score,
            reviews_count: prevTrack.results[0].reviews_count + 1,
          },
        ],
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profileImage} />
        </Link>
        <Form.Label>Opinion:</Form.Label>
        <Form.Control
          placeholder="my review..."
          as="textarea"
          name="opinion"
          value={opinion}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Score:</Form.Label>
        <Form.Control
          type="number"
          name="score"
          value={score}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Share</Button>
    </Form>
  );
}

export default ReviewCreateForm;
