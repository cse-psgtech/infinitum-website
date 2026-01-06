'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { eventsData } from '@/data/eventsData';
import styles from './EventShowcase.module.css';

export default function EventShowcase({ sounds }) {
    const [activeEventIndex, setActiveEventIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);


    const currentEvent = eventsData[activeEventIndex];

    const handleEventChange = (direction) => {
        const newIndex = direction === 'next'
            ? (activeEventIndex + 1) % eventsData.length
            : (activeEventIndex - 1 + eventsData.length) % eventsData.length;

        // Play click sound immediately
        if (sounds && sounds.click) {
            sounds.click.play();
        }

        setIsTransitioning(true);

        // Play hover sound during transition
        setTimeout(() => {
            if (sounds && sounds.hover) {
                sounds.hover.play();
            }
        }, 100);

        // Play logo sound as new content appears
        setTimeout(() => {
            setActiveEventIndex(newIndex);
            setIsTransitioning(false);
            if (sounds && sounds.logo) {
                sounds.logo.play();
            }
        }, 300);
    };


    const handleRegister = () => {
        // Play click sound
        if (sounds && sounds.click) {
            sounds.click.play();
        }
        // TODO: Navigate to registration page or open modal
        alert(`Register for ${currentEvent.eventName}`);
    };

    if (!currentEvent) return null;

    return (
        <div className={styles.showcase}>
            {/* Register Button - Top Right */}
            <button className={styles.registerButton} onClick={handleRegister}>
                <span className={styles.registerIcon}>📝</span>
                <span>Register Now</span>
            </button>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
                {/* Left Stats Panel */}
                <div className={styles.statsPanel}>
                    <div className={styles.statItem}>
                        <div className={styles.statLabel}>Team Size</div>
                        <div className={styles.statValue}>
                            {currentEvent.teamSize === 1 ? 'Individual' : `${currentEvent.teamSize} Members`}
                        </div>
                    </div>

                    <div className={styles.statItem}>
                        <div className={styles.statLabel}>Venue</div>
                        <div className={styles.statValue}>{currentEvent.hall}</div>
                    </div>

                    <div className={styles.statItem}>
                        <div className={styles.statLabel}>Timing</div>
                        <div className={styles.statValue}>{currentEvent.timing}</div>
                    </div>
                </div>

                {/* Center Event Display */}
                <div className={styles.eventDisplay}>
                    {/* Event Name with Bracket Frame */}
                    <div className={styles.eventHeader}>
                        <div className={styles.bracket}>
                            <span className={styles.bracketCorner}></span>
                            <span className={styles.bracketCorner}></span>
                        </div>
                        <h1 className={`${styles.eventName} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                            {currentEvent.eventName}
                        </h1>
                        <div className={styles.bracket}>
                            <span className={styles.bracketCorner}></span>
                            <span className={styles.bracketCorner}></span>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p className={`${styles.tagline} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                        {currentEvent.oneLineDescription}
                    </p>

                    {/* Event Image on Platform */}
                    <div className={styles.eventImageContainer}>
                        {/* Mobile Swipe Indicator (Dots) */}
                        <div className={styles.mobileSwipeIndicator}>
                            <span className={styles.swipeDot}></span>
                            <span className={styles.swipeDot}></span>
                            <span className={styles.swipeDot}></span>
                            <span className={styles.swipeDot}></span>
                        </div>

                        <div className={`${styles.eventImage} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                            {currentEvent.image && (
                                <Image
                                    src={currentEvent.image}
                                    alt={currentEvent.eventName}
                                    width={400}
                                    height={400}
                                    priority
                                    className={styles.eventImg}
                                />
                            )}
                        </div>

                        {/* Glowing Platform */}
                        <div className={styles.platform}>
                            <div className={styles.platformGlow}></div>
                            <div className={styles.platformRing}></div>
                            <div className={styles.platformRing2}></div>
                        </div>

                        {/* Navigation Arrows - Near Image */}
                        {eventsData.length > 1 && (
                            <>
                                <button
                                    className={`${styles.navArrow} ${styles.navLeft}`}
                                    onClick={() => handleEventChange('prev')}
                                    aria-label="Previous event"
                                >
                                    ◀
                                </button>
                                <button
                                    className={`${styles.navArrow} ${styles.navRight}`}
                                    onClick={() => handleEventChange('next')}
                                    aria-label="Next event"
                                >
                                    ▶
                                </button>
                            </>
                        )}
                    </div>

                    {/* Event Counter - Below Image */}
                    {eventsData.length > 1 && (
                        <div className={styles.eventCounterContainer}>
                            <span className={styles.eventCounter}>
                                Event {activeEventIndex + 1} of {eventsData.length}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right Stats Panel with Rounds and Contacts */}
                <div className={styles.statsPanel}>
                    {/* Rounds Details */}
                    {currentEvent.rounds && currentEvent.rounds.length > 0 && (
                        <div className={styles.roundsContainer}>
                            <div className={styles.roundsHeader}>
                                <div className={styles.statLabel}>Rounds</div>
                                <div className={styles.roundCount}>{currentEvent.rounds.length} Rounds</div>
                            </div>
                            {currentEvent.rounds.map((round, index) => (
                                <div key={round._id?.$oid || index} className={styles.roundItem}>
                                    <div className={styles.roundBadge}>R{index + 1}</div>
                                    <div className={styles.roundDetails}>
                                        <div className={styles.roundItemTitle}>{round.title}</div>
                                        <div className={styles.roundItemDesc}>{round.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Event Description */}
            <div className={`${styles.eventDescription} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                <p>{currentEvent.description}</p>
            </div>
        </div>
    );
}
