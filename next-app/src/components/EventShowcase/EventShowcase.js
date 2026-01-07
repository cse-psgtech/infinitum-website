'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { eventsData } from '@/data/eventsData';
import { CometCard } from '@/components/ui/comet-card';
import styles from './EventShowcase.module.css';

export default function EventShowcase({ sounds }) {
    const [activeEventIndex, setActiveEventIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                if (sounds?.click) sounds.click.play();
                setIsModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isModalOpen, sounds]);

    const openModal = () => {
        const audio = new Audio('/sounds/expand.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.error("Audio play failed", e));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        if (sounds?.click) sounds.click.play();
        setIsModalOpen(false);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

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
                <span>Register Now</span>
            </button>

            {/* Event Name with Bracket Frame - Moved outside main layout for alignment */}
            <div className={styles.headerContainer}>
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
            </div>

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

                {/* Center Event Display - Now contains primarily the image */}
                <div className={styles.eventDisplay}>
                    {/* Event Image on Platform */}
                    <div className={styles.eventImageContainer}>
                        {/* Mobile Swipe Indicator (Dots) */}
                        <div className={styles.mobileSwipeIndicator}>
                            {eventsData.map((_, index) => (
                                <span
                                    key={index}
                                    className={`${styles.swipeDot} ${index === activeEventIndex ? styles.activeDot : ''}`}
                                ></span>
                            ))}
                        </div>

                        {/* Navigation Arrows - Using absolute positioning relative to this container which hugs the image */}
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

                        <CometCard className={styles.eventImageCard}>
                            <div className={`${styles.eventImage} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`} onClick={openModal} style={{ cursor: 'pointer' }}>
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
                        </CometCard>

                        {/* Glowing Platform */}
                        <div className={styles.platform}>
                            <div className={styles.platformGlow}></div>
                            <div className={styles.platformRing}></div>
                            <div className={styles.platformRing2}></div>
                        </div>
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
                                        {round.tagline && (
                                            <div className={styles.roundItemTagline}>{round.tagline}</div>
                                        )}
                                        <div className={styles.roundItemDesc}>{round.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button className={styles.ctaButton} onClick={openModal}>
                        <span>Learn More</span>
                        <i className="ri-arrow-right-line"></i>
                    </button>
                </div>
            </div>

            {/* Event Description Removed as per user request */}
            {/* <div className={`${styles.eventDescription} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                <p>{currentEvent.description}</p>
            </div> */}

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className={styles.overlay} onClick={handleBackdropClick}>
                    <div className={styles.modal}>
                        <button className={styles.closeBtn} onClick={closeModal}>
                            ✕
                        </button>

                        <div className={styles.modalContent}>
                            <div className={styles.modalPosterWrapper}>
                                <div className={styles.modalGlowRing}></div>
                                <Image
                                    src={currentEvent.image}
                                    alt={currentEvent.eventName}
                                    width={350}
                                    height={350}
                                    className={styles.modalPoster}
                                    unoptimized
                                />
                            </div>
                            <div className={styles.modalInfo}>
                                <span className={styles.modalLabel}>{currentEvent.category || 'EVENT'}</span>
                                <h2 className={styles.modalTitle}>{currentEvent.eventName}</h2>
                                {currentEvent.oneLineDescription && (
                                    <p className={styles.modalOneLiner}>{currentEvent.oneLineDescription}</p>
                                )}
                                <p className={styles.modalDesc}>{currentEvent.description}</p>

                                {/* Event Info Grid */}
                                <div className={styles.modalInfoGrid}>
                                    {currentEvent.date && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Date</span>
                                            <span className={styles.modalInfoValue}>
                                                {new Date(currentEvent.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    )}
                                    {currentEvent.timing && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Timing</span>
                                            <span className={styles.modalInfoValue}>{currentEvent.timing}</span>
                                        </div>
                                    )}
                                    {currentEvent.hall && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Venue</span>
                                            <span className={styles.modalInfoValue}>{currentEvent.hall}</span>
                                        </div>
                                    )}
                                    {currentEvent.teamSize && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Team Size</span>
                                            <span className={styles.modalInfoValue}>{currentEvent.teamSize} Members</span>
                                        </div>
                                    )}
                                </div>

                                {/* Rounds */}
                                {currentEvent.rounds && currentEvent.rounds.length > 0 && (
                                    <div className={styles.modalRounds}>
                                        <h4 className={styles.modalSectionTitle}>Rounds</h4>
                                        {currentEvent.rounds.map((round, index) => (
                                            <div key={round._id?.$oid || index} className={styles.modalRoundItem}>
                                                <span className={styles.roundNumber}>{index + 1}</span>
                                                <div>
                                                    <strong>{round.title}</strong>
                                                    {round.description && <p>{round.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Contacts */}
                                {currentEvent.contacts && currentEvent.contacts.length > 0 && (
                                    <div className={styles.modalContacts}>
                                        <h4 className={styles.modalSectionTitle}>Coordinators</h4>
                                        {currentEvent.contacts.map((contact, index) => (
                                            <div key={contact._id?.$oid || index} className={styles.modalContactItem}>
                                                <span>{contact.name}</span>
                                                <a href={`tel:${contact.mobile}`}>{contact.mobile}</a>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    className={styles.registerBtn}
                                    onClick={handleRegister}
                                >
                                    <span>Register Now</span>
                                    {/* <i className="ri-arrow-right-up-line"></i> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
