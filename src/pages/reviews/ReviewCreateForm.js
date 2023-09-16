import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
// css links
import styles from "../../styles/ReviewCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

function ReviewCreateForm(props) {
  const { track, setTrack, setReviews } = props;
  const [reviewData, setReviewData] = useState({
    opinion: "",
    score: null,
  });

  const { opinion, score } = reviewData;
  const [errors, setErrors] = useState({});

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
            <Form.Label className={formStyles.Label}>Opinion:</Form.Label>
            <Form.Control
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
            <Form.Label className={formStyles.Label}>Score:</Form.Label>
            <Form.Control
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
