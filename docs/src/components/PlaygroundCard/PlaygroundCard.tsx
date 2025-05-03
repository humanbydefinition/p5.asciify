import React from 'react';
import styles from './PlaygroundCard.module.css';

export default function PlaygroundCard({ 
  image, 
  title, 
  description, 
  buttons
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardActions}>
          {buttons.map((button, index) => (
            <a 
              key={index}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButton}
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}