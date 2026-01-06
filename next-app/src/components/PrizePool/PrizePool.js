"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './PrizePool.module.css';

export default function PrizePool() {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const targetAmount = 100000;
    const duration = 2000; // Animation duration in ms

    // Intersection Observer for triggering animation when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    // Counting animation
    useEffect(() => {
        if (!isVisible) return;

        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * targetAmount);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible]);

    // Format number with Indian numbering system (1,00,000)
    const formatAmount = (num) => {
        const str = num.toString();
        if (str.length <= 3) return str;

        let result = str.slice(-3);
        let remaining = str.slice(0, -3);

        while (remaining.length > 2) {
            result = remaining.slice(-2) + ',' + result;
            remaining = remaining.slice(0, -2);
        }

        if (remaining.length > 0) {
            result = remaining + ',' + result;
        }

        return result;
    };

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${isVisible ? styles.visible : ''}`}
        >
            <div className={styles.glowOrb}></div>
            <div className={styles.content}>
                <span className={styles.label}>Prize Pool</span>
                <div className={styles.amountWrapper}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.amount}>{formatAmount(count)}</span>
                </div>
                <div className={styles.decorLine}>
                    <span className={styles.lineLeft}></span>
                    <span className={styles.diamond}></span>
                    <span className={styles.lineRight}></span>
                </div>
            </div>
            <div className={styles.particles}>
                {[...Array(6)].map((_, i) => (
                    <span key={i} className={styles.particle} style={{ '--delay': `${i * 0.3}s` }}></span>
                ))}
            </div>
        </div>
    );
}
