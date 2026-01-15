"use client";

import React, { useRef, useEffect } from 'react';
import styles from './Speakers.module.css';
import { useSound } from '@/context/SoundContext';

// Schema: { image: string, name: string, type: string }
const SPEAKERS_DATA = [
    // Example data (Uncomment to test)
    // {
    //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
    //     name: "Steve Jobs",
    //     type: "Chief Guest"
    // },

    // {
    //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Elon_Musk_%283017880307%29_%28cropped%29.jpg/640px-Elon_Musk_%283017880307%29_%28cropped%29.jpg",
    //     name: "Elon Musk",
    //     type: "Keynote Speaker"
    // }
    {
        image: "/images/speakers/savitha-ramesh.jpg",
        name: "Savitha Ramesh",
        designation: "Vice President-Head of Services Delivery, Psiog Digital",
        type: "Speakers"
    },
    {
        image: "/images/speakers/Supriya.jpeg",
        name: "Supriya Rajamanickam",
        designation: "Senior Technical Leader, Cisco Systems",
        type: "Speakers"
    },
    {
        image: "/images/speakers/Balaraman.jpeg",
        name: "Balasankar Raman",
        designation: "Principal Engineer, Cisco Systems",
        type: "Speakers"
    },
    {
        image: "/images/speakers/shankar.jpg",
        name: "Shankar Gopalakrishnan",
        designation: "Principal Engineer, Cisco Systems",
        type: "Speakers"
    },
    {
        image: "/images/speakers/priyanka-raghavan.jpg",
        name: "Priyanka Raghavan",
        designation: "Co-Founder, Securacy.ai",
        type: "Speakers"
    },
    {
        image: "/images/speakers/karthick.jpg",
        name: "Karthik Ramachandran",
        designation: "Program Manager, Bosch Global Software Technologies",
        type: "Speakers"
    },
    {
        image: "/images/speakers/soundarrajan.jpg",
        name: "Soundarrajan S N",
        designation: "Associate Director of Technology, Verticurl",
        type: "Speakers"
    },
    {
        image: "/images/speakers/ragunanth.jpg",
        name: "Ragunath P K",
        designation: "Associate Director of Technology / Solution Lead, Verticurl",
        type: "Speakers"
    },
    {
        image: "/images/speakers/raghuram.jpg",
        name: "Raghu ram",
        designation: "Staff Software Architect, GE Healthcare",
        type: "Speakers"
    },
    {
        image: "/images/speakers/radhakrishnan.jpg",
        name: "Radhakrishnan Ramasamy",
        designation: "Senior Engineering Manager, Walmart",
        type: "Speakers"
    },
    {
        image: "/images/speakers/lovelynrose.jpg",
        name: "Lovelyn Rose",
        designation: "Founder and CEO, Lysa Solutions",
        type: "Speakers"
    },
    {
        image: "/images/speakers/sharan.jpg",
        name: "Sharan S S",
        designation: "Software Engineer, Texas Instruments",
        type: "Speakers"
    },
    {
        image: "/images/speakers/nithin.jpg",
        name: "Nithiin Kathiresan",
        designation: "Founding Engineer, AI PDF",
        type: "Speakers"
    }
];

export default function Speakers() {
    const { isMuted } = useSound();

    // Audio ref for hover sound
    const hoverSoundRef = useRef(null);

    // Initialize audio on mount
    useEffect(() => {
        hoverSoundRef.current = new Audio('/sounds/hover.mp3');
        hoverSoundRef.current.volume = 0.3;
    }, []);

    // Play sound helper - respects mute state
    const playHoverSound = () => {
        if (isMuted) return;
        if (hoverSoundRef.current) {
            hoverSoundRef.current.currentTime = 0;
            hoverSoundRef.current.play().catch(() => { });
        }
    };

    // Group data by type
    const groupedSpeakers = SPEAKERS_DATA.reduce((acc, speaker) => {
        const { type } = speaker;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(speaker);
        return acc;
    }, {});

    const hasSpeakers = Object.keys(groupedSpeakers).length > 0;

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Speakers & Panelists</h2>

            {!hasSpeakers ? (
                <div className={styles.toBeAnnounced}>
                    To Be Announced
                </div>
            ) : (
                <div className={styles.speakersList}>
                    {Object.entries(groupedSpeakers).map(([type, speakers], index) => (
                        <div
                            key={type}
                            className={styles.group}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            {/* <h3 className={styles.groupTitle}>{type}</h3> */}
                            <div className={styles.row}>
                                {speakers.map((speaker, idx) => (
                                    <div key={idx} className={styles.card} onMouseEnter={playHoverSound}>
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={speaker.image}
                                                alt={speaker.name}
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.info}>
                                            <h4 className={styles.name}>{speaker.name}</h4>
                                            {speaker.designation && (
                                                <p className={styles.designation}>{speaker.designation}</p>
                                            )}
                                            {/* <span className={styles.type}>{speaker.type}</span> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
