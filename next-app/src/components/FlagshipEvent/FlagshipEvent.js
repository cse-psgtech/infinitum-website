"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FlagshipEvent.module.css';

// Static event data
const EVENT_DATA = {
    title: 'Thooral Hackathon',
    shortDescription: 'The ultimate hackathon challenge awaits. Test your skills and compete with the best minds in an intense 24-hour coding marathon.',
    fullDescription: 'Prepare yourself for the most anticipated event of Infinitum! Thooral Hackathon brings together the brightest minds to compete in an intense coding marathon. Showcase your problem-solving skills, algorithmic thinking, and creativity as you tackle challenging problems designed to push your limits. Whether you\'re a seasoned coder or an enthusiastic beginner, this event offers something for everyone. Join us for an unforgettable experience filled with learning, competition, and amazing prizes!',
    posterSrc: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
    registerLink: '/events'
};

// Get API URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function FlagshipEvent() {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [flagship, setFlagship] = useState({});
    const [thooral, setThooral] = useState({})
    const cardRef = useRef(null);

    // Audio refs
    const clickSoundRef = useRef(null);
    const expandSoundRef = useRef(null);
    const hoverSoundRef = useRef(null);

    // Fetch flagship event data
    useEffect(() => {
        const fetchFlagshipEvent = async () => {
            try {
                // Step 1: Fetch all events
                const response = await fetch(`${API_URL}/api/events?limit=50`);
                const data = await response.json();

                // Handle different response formats
                let events = [];
                if (Array.isArray(data)) {
                    events = data;
                } else if (data.events && Array.isArray(data.events)) {
                    events = data.events;
                } else if (data.data && Array.isArray(data.data)) {
                    events = data.data;
                }

                // Step 2: Find Thooral Hackathon
                const thooral_hackathon = events.find(event =>
                    event.eventName === "Thooral Hackathon"
                );

                if (thooral_hackathon) {
                    // Set basic flagship data
                    setFlagship({
                        eventId: thooral_hackathon.eventId,
                        eventName: thooral_hackathon.eventName,
                        category: thooral_hackathon.category,
                        oneLineDescription: thooral_hackathon.oneLineDescription,
                        clubName: thooral_hackathon.clubName,
                    });

                    // Step 3: Fetch detailed event data
                    const detailResponse = await fetch(`${API_URL}/api/events/${thooral_hackathon.eventId}`);
                    const detailData = await detailResponse.json();

                    let eventDetails = null;
                    if (detailData.event && Array.isArray(detailData.event)) {
                        eventDetails = detailData.event[0];
                    } else if (detailData.event) {
                        eventDetails = detailData.event;
                    } else if (detailData.data && Array.isArray(detailData.data)) {
                        eventDetails = detailData.data[0];
                    } else if (detailData.data) {
                        eventDetails = detailData.data;
                    } else if (Array.isArray(detailData)) {
                        eventDetails = detailData[0];
                    } else {
                        eventDetails = detailData;
                    }

                    setThooral(eventDetails);
                    console.log('Thooral Details:', eventDetails);
                }
            } catch (err) {
                console.error('Error fetching flagship event:', err);
            }
        };

        fetchFlagshipEvent();
    }, []);

    // Initialize audio on mount
    useEffect(() => {
        clickSoundRef.current = new Audio('/sounds/click.mp3');
        expandSoundRef.current = new Audio('/sounds/expand.mp3');
        hoverSoundRef.current = new Audio('/sounds/hover.mp3');
        clickSoundRef.current.volume = 0.5;
        expandSoundRef.current.volume = 0.5;
        hoverSoundRef.current.volume = 0.3;
    }, []);

    // Play sound helper
    const playSound = (audioRef) => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }
    };

    // Intersection observer for entrance animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Mouse tracking for 3D tilt effect
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0.5, y: 0.5 });
    };

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (isOverlayOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOverlayOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOverlayOpen) {
                playSound(clickSoundRef);
                setIsOverlayOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOverlayOpen]);

    const openOverlay = () => {
        playSound(expandSoundRef);
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        playSound(clickSoundRef);
        setIsOverlayOpen(false);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeOverlay();
        }
    };

    const handleCardHover = () => {
        playSound(hoverSoundRef);
    };

    // Calculate 3D transform
    const tiltX = (mousePosition.y - 0.5) * 10;
    const tiltY = (mousePosition.x - 0.5) * -10;
    const glareX = mousePosition.x * 100;
    const glareY = mousePosition.y * 100;

    const { title, shortDescription, fullDescription, posterSrc, registerLink } = EVENT_DATA;

    return (
        <>
            {/* Card */}
            <div
                ref={cardRef}
                className={`${styles.cardWrapper} ${isVisible ? styles.visible : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleCardHover}
                onClick={openOverlay}
                style={{
                    '--tilt-x': `${tiltX}deg`,
                    '--tilt-y': `${tiltY}deg`,
                    '--glare-x': `${glareX}%`,
                    '--glare-y': `${glareY}%`,
                }}
            >
                {/* Floating particles */}
                <div className={styles.particles}>
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>

                {/* Corner accents */}
                <div className={styles.cornerTL}></div>
                <div className={styles.cornerTR}></div>
                <div className={styles.cornerBL}></div>
                <div className={styles.cornerBR}></div>

                {/* Holographic overlay */}
                <div className={styles.holographic}></div>

                <div className={styles.card}>
                    {/* Label */}
                    <div className={styles.labelWrapper}>
                        <span className={styles.labelAccent}>▸</span>
                        <span className={styles.label}>FLAGSHIP EVENT</span>
                        <span className={styles.labelAccent}>◂</span>
                    </div>

                    <div className={styles.cardContent}>
                        {/* Poster with glow ring */}
                        <div className={styles.posterContainer}>
                            <div className={styles.glowRing}></div>
                            <div className={styles.posterFrame}>
                                <Image
                                    src={posterSrc}
                                    alt={title}
                                    width={200}
                                    height={200}
                                    className={styles.poster}
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className={styles.info}>
                            <h2 className={styles.title} data-text={title}>{flagship.eventName}</h2>
                            <p className={styles.description}>{flagship.oneLineDescription}</p>
                            <button className={styles.ctaButton}>
                                <span>Learn More</span>
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isOverlayOpen && (
                <div className={styles.overlay} onClick={handleBackdropClick}>
                    <div className={styles.modal}>
                        <button className={styles.closeBtn} onClick={closeOverlay}>
                            <i className="ri-close-line"></i>
                        </button>

                        <div className={styles.modalContent}>
                            <div className={styles.modalPosterWrapper}>
                                <div className={styles.modalGlowRing}></div>
                                <Image
                                    src={posterSrc}
                                    alt={thooral?.eventName || title}
                                    width={350}
                                    height={350}
                                    className={styles.modalPoster}
                                    unoptimized
                                />
                            </div>
                            <div className={styles.modalInfo}>
                                <span className={styles.modalLabel}>{thooral?.category || 'FLAGSHIP EVENT'}</span>
                                <h2 className={styles.modalTitle}>{thooral?.eventName || title}</h2>
                                {thooral?.oneLineDescription && (
                                    <p className={styles.modalOneLiner}>{thooral.oneLineDescription}</p>
                                )}
                                <p className={styles.modalDesc}>{thooral?.description || fullDescription}</p>

                                {/* Event Info Grid */}
                                <div className={styles.modalInfoGrid}>
                                    {thooral?.date && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Date</span>
                                            <span className={styles.modalInfoValue}>
                                                {new Date(thooral.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    )}
                                    {thooral?.timing && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Timing</span>
                                            <span className={styles.modalInfoValue}>{thooral.timing}</span>
                                        </div>
                                    )}
                                    {thooral?.hall && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Venue</span>
                                            <span className={styles.modalInfoValue}>{thooral.hall}</span>
                                        </div>
                                    )}
                                    {thooral?.teamSize && (
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalInfoLabel}>Team Size</span>
                                            <span className={styles.modalInfoValue}>{thooral.teamSize} Members</span>
                                        </div>
                                    )}
                                </div>

                                {/* Rounds */}
                                {thooral?.rounds && thooral.rounds.length > 0 && (
                                    <div className={styles.modalRounds}>
                                        <h4 className={styles.modalSectionTitle}>Rounds</h4>
                                        {thooral.rounds.map((round, index) => (
                                            <div key={round._id || index} className={styles.modalRoundItem}>
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
                                {thooral?.contacts && thooral.contacts.length > 0 && (
                                    <div className={styles.modalContacts}>
                                        <h4 className={styles.modalSectionTitle}>Coordinators</h4>
                                        {thooral.contacts.map((contact, index) => (
                                            <div key={contact._id || index} className={styles.modalContactItem}>
                                                <span>{contact.name}</span>
                                                <a href={`tel:${contact.mobile}`}>{contact.mobile}</a>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {thooral?.clubName && (
                                    <p className={styles.modalClub}>Organized by {thooral.clubName}</p>
                                )}

                                <Link
                                    href={registerLink}
                                    className={styles.registerBtn}
                                    onClick={() => playSound(clickSoundRef)}
                                >
                                    <span>Register Now</span>
                                    <i className="ri-arrow-right-up-line"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
