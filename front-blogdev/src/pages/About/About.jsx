import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Blog <span>DEV</span></h2>
      <p>
        Este blog foi feito com React e Firebase.
      </p>
    </div>
  );
}

export default About;
