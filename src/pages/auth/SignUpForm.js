import React from 'react'
// css link
import styles from "../../styles/SignInUpForm.module.css";
// react-bootstrap components
import Container from 'react-bootstrap/Container';

const SignUpForm = () => {
  return (
    <div className={styles.Background}>
        <Container className={styles.FormContainer}>
            <h2 className={styles.Title}>Create an Account</h2>
            form goes here
        </Container>
    </div>
  )
}

export default SignUpForm