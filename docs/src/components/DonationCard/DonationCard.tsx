import React from 'react';
import styles from './DonationCard.module.css';
import { IconExternalLink, IconCoffee, IconBrandGithub, IconCurrencyEthereum, IconCube } from '@tabler/icons-react';

export interface DonationCardProps {
  iconType: 'kofi' | 'github' | 'ethereum' | 'tezos';
  title: string;
  description: string;
  link: string;
  color: string;
}

export default function DonationCard({ iconType, title, description, link, color }: DonationCardProps) {
  // Function to determine which icon to render
  const renderIcon = () => {
    switch (iconType) {
      case 'kofi':
        return <IconCoffee size={36} />;
      case 'github':
        return <IconBrandGithub size={36} />;
      case 'ethereum':
        return <IconCurrencyEthereum size={36} />;
      case 'tezos':
        return <IconCube size={36} />;
      default:
        return <IconCoffee size={36} />;
    }
  };

  return (
    <div className={styles.donationCard}>
      <div className={styles.iconContainer} style={{ backgroundColor: color }}>
        {renderIcon()}
      </div>
      
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        
        <a 
          className={styles.linkButton}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: color }}
        >
          Support
          <IconExternalLink className={styles.externalIcon} size={16} />
        </a>
      </div>
    </div>
  );
}