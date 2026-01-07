'use client';
import React from 'react';
import styles from './CometCard.module.css';

/**
 * CometCard - A premium card component with comet-like glow effects
 * Wraps content in a stylish glowing border animation
 */
export function CometCard({ children, className = '' }) {
    return (
        <div className={`${styles.cometCard} ${className}`}>
            <div className={styles.cometGlow}></div>
            <div className={styles.cometContent}>
                {children}
            </div>
        </div>
    );
}

export default CometCard;
