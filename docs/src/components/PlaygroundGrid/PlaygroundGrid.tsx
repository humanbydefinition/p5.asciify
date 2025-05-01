import React from 'react';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard';
import styles from './PlayGroundGrid.module.css';

export default function PlaygroundGrid({ cards }) {
  return (
    <div className={styles.grid}>
      {cards.map((card, index) => (
        <div key={index} className={styles.gridItem}>
          <PlaygroundCard
            image={card.image}
            title={card.title}
            description={card.description}
            buttons={card.buttons}
          />
        </div>
      ))}
    </div>
  );
}