"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './CircularMenu.module.css';

const MENU_ITEMS = [
    { label: 'Home', icon: 'ri-home-line', href: '/' },
    { label: 'About', icon: 'ri-user-line', href: '/about' },
    { label: 'Charity', icon: 'ri-heart-line', href: '/charity' },
    { label: 'Music', icon: 'ri-music-line', href: '/music' },
    { label: 'News', icon: 'ri-newspaper-line', href: '/news' },
];

export default function CircularMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const index = MENU_ITEMS.findIndex(item => item.href === pathname);
        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [pathname]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (index) => {
        setActiveIndex(index);
        setTimeout(() => {
            setIsOpen(false);
        }, 600);
    };

    const getItemStyle = (index) => {
        const total = MENU_ITEMS.length;
        const step = 360 / total;
        // We want activeIndex to be at 90 degrees (down)
        // angle = 90 + (index - activeIndex) * step
        const angle = 90 + (index - activeIndex) * step;
        
        return {
            '--angle': `${angle}deg`
        };
    };

    return (
        <nav className={`${styles.navContainer} ${isOpen ? styles.open : ''}`}>
            <div className={styles.menuBackdrop} onClick={() => setIsOpen(false)} />

            <button className={styles.toggleBtn} onClick={toggleMenu}>
                <i className={`ri-menu-3-line ${styles.menuIcon}`}></i>
                <i className={`ri-close-line ${styles.closeIcon}`}></i>
            </button>
            <ul className={styles.submenu}>
                {MENU_ITEMS.map((item, index) => (
                    <li 
                        key={index} 
                        style={getItemStyle(index)}
                        className={index === activeIndex ? styles.active : ''}
                    >
                        <Link 
                            href={item.href} 
                            className={styles.link}
                            onClick={() => handleItemClick(index)}
                        >
                            <div className={styles.iconCircle}>
                                <i className={item.icon}></i>
                            </div>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
