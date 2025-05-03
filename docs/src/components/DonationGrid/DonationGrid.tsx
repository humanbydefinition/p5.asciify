import React from 'react';
import styles from './DonationGrid.module.css';
import DonationCard, { DonationCardProps } from '../DonationCard/DonationCard';

export default function DonationGrid() {
  const options: DonationCardProps[] = [
    {
      iconType: 'kofi',
      title: 'Ko-fi',
      description: 'Buy me a coffee to fuel more creative coding projects',
      link: 'https://ko-fi.com/humanbydefinition',
      color: '#ff5e5b'
    },
    {
      iconType: 'github',
      title: 'GitHub Sponsors',
      description: 'Support ongoing development directly through GitHub',
      link: 'https://github.com/sponsors/humanbydefinition',
      color: '#24292e'
    },
    {
      iconType: 'ethereum',
      title: 'Ethereum',
      description: 'Donate cryptocurrency via Ethereum',
      link: 'https://etherscan.io/address/0xAA14d79ccF069d3E57eeCb6822c1F241e0d46C42',
      color: '#627eea'
    },
    {
      iconType: 'tezos',
      title: 'Tezos',
      description: 'Donate cryptocurrency via Tezos',
      link: 'https://tzkt.io/humanbydefinition.tez',
      color: '#2c7df7'
    }
  ];

  return (
    <div className={styles.grid}>
      {options.map((option, index) => (
        <div key={index} className={styles.gridItem}>
          <DonationCard {...option} />
        </div>
      ))}
    </div>
  );
}