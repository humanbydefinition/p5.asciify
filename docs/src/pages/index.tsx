import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import P5Sketch from '@site/src/components/HomeP5Sketch/P5Sketch';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <header className={clsx('hero', styles.heroBanner)} style={{ position: 'relative', overflow: 'hidden' }}>
      <P5Sketch title={siteConfig.title} tagline={siteConfig.tagline} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className={styles.titleTaglineContainer}>
            <div className={styles.titleContainer}>
              <Heading as="h1" className={clsx('hero__title', styles.titleText)}>
                {siteConfig.title}
              </Heading>
            </div>
            <div className={styles.taglineContainer}>
              <p className={styles.taglineText}>
                {siteConfig.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Documentation for p5.asciify, a library for creating text-based art and animations using p5.js.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}