import React from 'react';
import styles from './SimpleHeader.module.css';

export default function SimpleHeader() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Infinitum</h1>
        </header>
    );
}
