import React from 'react';
import Link from '@docusaurus/Link';
import { IconBrandGithub, IconBrandMastodon, IconBrandInstagram, IconGlobe } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import styles from './ContributorCard.module.css';

export default function ContributorCard({ username, name, description, mastodon, website, instagram }) {
  const avatarUrl = `https://github.com/${username}.png?size=200`;
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <img src={avatarUrl} alt={`${name} avatar`} className={styles.avatar} />
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.description}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
      <div className={styles.socials}>
        <Link to={`https://github.com/${username}`}>
          <IconBrandGithub size={20} />
        </Link>
        {instagram && (
          <>
            {' '}
            {' '}
            <Link to={instagram}>
              <IconBrandInstagram size={20} />
            </Link>
          </>
        )}
        {mastodon && (
          <>
            {' '}
            {' '}
            <Link to={mastodon}>
              <IconBrandMastodon size={20} />
            </Link>
          </>
        )}
        {website && (
          <>
            {' '}
            {' '}
            <Link to={website}>
              <IconGlobe size={20} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}