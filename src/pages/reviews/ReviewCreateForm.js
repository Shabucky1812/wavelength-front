/* eslint-disable */
import React, { useState } from "react";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
// axiosDefaults
import { axiosRes } from "../../api/axiosDefaults";
// css links
import styles from "../../styles/ReviewCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

/**
 * ReviewCreateForm component - used to create a review for a track
 *
 * @param {dict} props - contains track and functions needed for updating info upon
 * review creation
 *
 * @returns review create form within a container element
 */
function ReviewCreateForm(props) {
  const { track, setTrack, setReviews } = props;
  const [reviewData, setReviewData] = useState({
    opinion: "",
    score: "",
  });

  const { opinion, score } = reviewData;
  const [errors, setErrors] = useState({});

  /**
   * handles changes to form values and sets state accordingly
   */
  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * prevents default behaviour and attempts to submit form data to review create endpoint.
   * sets review and track data upon successful review creation, sets errors
   * if the creation fails.
   */
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
              ? Math.round(
                  (prevTrack.results[0].average_score *
                    prevTrack.results[0].reviews_count +
                    Number(score)) /
                    (prevTrack.results[0].reviews_count + 1)
                )
              : score,
            reviews_count: prevTrack.results[0].reviews_count + 1,
          },
        ],
      }));
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <Container
        className={`${formStyles.FormContainer} ${styles.ReviewFormContainer}`}
      >
        <h2 className={formStyles.Title}>Review Track</h2>
        <Form onSubmit={handleSubmit} className={formStyles.Form}>
          {/* opinion field */}
          <Form.Group>
            <Form.Label htmlFor="opinion" className={formStyles.Label}>Opinion:</Form.Label>
            <Form.Control
              id="opinion"
              placeholder="my review..."
              as="textarea"
              name="opinion"
              value={opinion}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          {errors.opinion?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* score field */}
          <Form.Group>
            <Form.Label htmlFor="score" className={formStyles.Label}>Score:</Form.Label>
            <Form.Control
              id="score"
              type="number"
              name="score"
              value={score}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.score?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <button
            type="submit"
            className={`${btnStyles.Btn} ${styles.ReviewButton}`}
          >
            Share
          </button>
        </Form>
      </Container>
      <hr />
    </>
  );
}

export default ReviewCreateForm;
