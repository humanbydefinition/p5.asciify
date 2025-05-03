import React from 'react';
import styles from './FontCard.module.css';
import { IconDownload, IconExternalLink } from '@tabler/icons-react';


export interface FontCardProps {
    name: string;
    image: string;
    description: string;
    downloadUrl: string;
    glyphCount: number;
    formats: string[];
    license: string;
}

export default function FontCard({
    name,
    image,
    description,
    downloadUrl,
    glyphCount,
    formats,
    license,
}: FontCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={image} alt={`${name} font sample`} className={styles.cardImage} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.headerRow}>
                    <h3 className={styles.cardTitle}>{name}</h3>
                    <div className={styles.headerBadges}>
                        <div className={styles.badge}>
                            <i className="tabler:letters" aria-hidden="true"></i>
                            <span>{glyphCount} glyphs</span>
                        </div>
                        <div className={styles.badge}>
                            <i className="tabler:license" aria-hidden="true"></i>
                            <span>{license}</span>
                        </div>
                    </div>
                </div>

                <p className={styles.cardDescription}>{description}</p>

                <div className={styles.cardActions}>
                    <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadButton}
                    >
                        Visit
                        <IconExternalLink size={16} className={styles.externalLinkIcon} />
                    </a>
                </div>
            </div>
        </div>
    );
}