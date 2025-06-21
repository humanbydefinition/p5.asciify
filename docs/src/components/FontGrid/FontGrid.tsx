import React from 'react';
import FontCard, { FontCardProps } from '../FontCard/FontCard';
import styles from './FontGrid.module.css';
import fonts from '@site/src/data/fonts.json';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FontGrid() {
  const [shuffledFonts] = React.useState(() =>
    shuffleArray(fonts as FontCardProps[])
  );

  return (
    <div className={styles.grid}>
      {shuffledFonts.map((font: FontCardProps, index: number) => (
        <div key={index} className={styles.gridItem}>
          <FontCard
            name={font.name}
            image={font.image}
            description={font.description}
            downloadUrl={font.downloadUrl}
            glyphCount={font.glyphCount}
            formats={font.formats}
            license={font.license}
          />
        </div>
      ))}
    </div>
  );
}