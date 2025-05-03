import React from 'react';
import contributors from '@site/src/data/contributors.json';
import ContributorCard from './ContributorCard/ContributorCard';
import styles from './Contributors.module.css';

export default function Contributors() {
  return (
    <div className={styles.container}>
      {contributors.map((c) => (
        <ContributorCard
          key={c.username}
          username={c.username}
          description={c.description}
          name={c.name}
          mastodon={c.mastodon}
          website={c.website}
          instagram={c.instagram}
        />
      ))}
    </div>
  );
}