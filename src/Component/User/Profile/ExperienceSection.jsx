import React from 'react';
import styles from './ExperienceSection.module.css';
import { Outlet } from 'react-router-dom';

function ExperienceSection() {
  return (
    <section className={styles.experienceSection}>
      

      <h3 className={styles.allPost}>Post</h3>
      
      <Outlet/>
      
    </section>
  );

}

export default ExperienceSection;
