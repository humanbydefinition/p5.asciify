import React from 'react';
import FontCard, { FontCardProps } from '../FontCard/FontCard';
import styles from './FontGrid.module.css';
import fonts from '@site/src/data/fonts.json';

export default function FontGrid() {
  return (
    <div className={styles.grid}>
      {fonts.map((font: FontCardProps, index: number) => (
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