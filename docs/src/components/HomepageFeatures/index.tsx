import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode; // Changed type to ReactNode
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'The Swiss Army Knife of ASCII',
    Svg: require('@site/static/img/bescii1.svg').default,
    description: (
      <>
        <code>p5.asciify</code> is the most advanced ASCII conversion library available, offering all the tools you need to create stunning text-based art and animations in real-time.
      </>
    ),
  },
  {
    title: <>Open Source (<em>MIT License</em>)</>,
    Svg: require('@site/static/img/bescii2.svg').default,
    description: (
      <>
        <code>p5.asciify</code> is fully open source and free to use. We welcome contributions from the community to help us improve and expand the library.
      </>
    ),
  },
  {
    title: <>Powered by <code>p5.js</code> and <code>WebGL</code></>,
    Svg: require('@site/static/img/bescii3.svg').default,
    description: (
      <>
        <code>p5.asciify</code> is built on top of <code>p5.js</code>, a powerful JavaScript library for creative coding. It leverages <code>WebGL</code> for high-performance rendering and advanced graphics capabilities.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}