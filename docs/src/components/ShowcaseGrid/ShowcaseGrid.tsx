import React from 'react';
import styles from './ShowcaseGrid.module.css';
import ShowcaseCard, { ShowcaseCardProps } from '../ShowcaseCard/ShowcaseCard';
import showcaseData from '@site/src/data/showcase.json';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ShowcaseGrid() {
  const [shuffledShowcase] = React.useState(() =>
    shuffleArray(showcaseData as ShowcaseCardProps[])
  );

  return (
    <div className={styles.grid}>
      {shuffledShowcase.map((project, idx) => (
        <div className={styles.gridItem} key={idx}>
          <ShowcaseCard {...project} />
        </div>
      ))}
    </div>
  );
}