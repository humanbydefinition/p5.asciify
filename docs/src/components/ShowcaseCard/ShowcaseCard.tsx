import React from 'react';
import styles from './ShowcaseCard.module.css';
import { IconBrandGithub, IconBrandMastodon, IconBrandInstagram, IconGlobe, IconExternalLink } from '@tabler/icons-react';

export interface ShowcaseCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  url: string;
  creator: {
    name: string;
    github?: string;
    instagram?: string;
    mastodon?: string;
    website?: string;
    avatar?: string;
  };
}

export default function ShowcaseCard({
  image,
  title,
  category,
  description,
  url,
  creator,
}: ShowcaseCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt='showcase item preview' className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.headerRow}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.category}>{category}</span>
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardActions}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitButton}
          >
            Visit
            <IconExternalLink size={16} className={styles.externalLinkIcon} />
          </a>
        </div>
        <div className={styles.creatorRow}>
          <div className={styles.creatorInfo}>
            <img
              src={
                creator.avatar ||
                (creator.github
                  ? `https://github.com/${creator.github}.png?size=64`
                  : '/img/default_avatar.png')
              }
              alt={`${creator.name} avatar`}
              className={styles.avatar}
            />
            <span className={styles.creatorName}>{creator.name}</span>
          </div>
          <div className={styles.socials}>
            {creator.github && (
              <a href={`https://github.com/${creator.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <IconBrandGithub size={18} />
              </a>
            )}
            {creator.instagram && (
              <a href={creator.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconBrandInstagram size={18} />
              </a>
            )}
            {creator.mastodon && (
              <a href={creator.mastodon} target="_blank" rel="noopener noreferrer" aria-label="Mastodon">
                <IconBrandMastodon size={18} />
              </a>
            )}
            {creator.website && (
              <a href={creator.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                <IconGlobe size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}