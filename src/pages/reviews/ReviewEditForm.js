/* eslint-disable */
import React, { useState } from "react";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// axiosDefaults
import { axiosRes } from "../../api/axiosDefaults";
// css links
import styles from "../../styles/ReviewCreateEditForm.module.css";
import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";

/**
 * ReviewEditForm component - used to render the review edit form.
 *
 * @param {dict} props - contains review id and relevant functions to update state.
 *
 * @returns review edit form within a form element
 */
function ReviewEditForm(props) {
  const { id, prevOpinion, prevScore, setReviews, setTrack, setShowEditForm } =
    props;

  const [formOpinion, setFormOpinion] = useState(prevOpinion);
  const [formScore, setFormScore] = useState(prevScore);

  const [errors, setErrors] = useState({});

  /**
   * handles changes to the opinion field
   */
  const handleChangeOpinion = (event) => {
    setFormOpinion(event.target.value);
  };

  /**
   * handles changes to the score field
   */
  const handleChangeScore = (event) => {
    setFormScore(event.target.value);
  };

  /**
   * prevents default behaviour and attempts to submit form data to review edit endpoint.
   * updates review and track data upon successful review editing, sets errors
   * if the edit fails.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/reviews/${id}/`, {
        opinion: formOpinion,
        score: formScore,
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => review.id === id
            ? {
                ...review,
                opinion: formOpinion,
                score: formScore,
                reviewed_at: "now",
              }
            : review),
      }));
      setTrack((prevTrack) => ({
        results: [
          {
            ...prevTrack.results[0],
            average_score: Math.round(
              (prevTrack.results[0].average_score *
                prevTrack.results[0].reviews_count -
                Number(prevScore) +
                Number(formScore)) /
                prevTrack.results[0].reviews_count
            ),
          },
        ],
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={formStyles.Form}>
      {/* opinion field */}
      <Form.Group>
        <Form.Label className={formStyles.Label}>Opinion:</Form.Label>
        <Form.Control
          placeholder="my review..."
          as="textarea"
          name="opinion"
          value={formOpinion}
          onChange={handleChangeOpinion}
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
          value={formScore}
          onChange={handleChangeScore}
        />
      </Form.Group>
      {errors.score?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <div className={styles.EditButtons}>
        <button type="submit" className={btnStyles.Btn}>
          Save
        </button>
        <button
          type="button"
          className={`${btnStyles.Btn} ${btnStyles.Cancel}`}
          onClick={() => setShowEditForm(false)}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}

export default ReviewEditForm;
