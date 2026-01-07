// Hardcoded events data matching database structure
export const eventsData = [
    {
        eventId: "EVNT01",
        eventName: "QuestX",
        category: "Non Technical",
        oneLineDescription: "Fun and challenging activities to boost creativity, analytical skills, and teamwork",
        description: "QuestX is a non-technical event designed to engage participants through fun yet challenging activities that enhance creativity, analytical thinking, teamwork, and problem-solving skills in an interactive environment.",
        rounds: [
            {
                title: "Round 1 – Creative & Fun Challenges",
                tagline: "Think fast, laugh harder, and let creativity lead the way.",
                description: "Includes Limbo, Memory Game, Grid Game with mini dares, Pictionary, Emoji Decoding, Connections, and Meme Creation to encourage innovation, humour, observation skills, and collaboration.",
                _id: { "$oid": "694ce9c4297836cde7682480" }
            },
            {
                title: "Round 2 – Escape Room Challenge",
                tagline: "Every clue counts when the clock is ticking.",
                description: "Participants use personal belongings to solve puzzles and unlock clues, testing teamwork, strategic thinking, and problem-solving under pressure.",
                _id: { "$oid": "694ce9c4297836cde7682481" }
            }
        ],
        contacts: [
            { name: "Neelesh Padmanabh", mobile: "8148401083", _id: { "$oid": "694ce9c4297836cde7682482" } },
            { name: "Atul Vasanthakrishnan", mobile: "9345722948", _id: { "$oid": "694ce9c4297836cde7682483" } }
        ],
        hall: "Q Block Classroom",
        eventRules: "Participants must follow organiser instructions and maintain sportsmanship throughout the event.",
        teamSize: 4,
        date: "2026-02-13T09:00:00.000Z",
        closed: false,
        timing: "09:00 AM - 12:00 PM",
        image: "/images/events/paper_presentation.png"
    },
    {
        eventId: "EVNT02",
        eventName: "neXus",
        category: "Technical",
        oneLineDescription: "Marvel-themed beginner-friendly cybersecurity CTF with mission-based challenges",
        description: "neXus is a Marvel-themed Capture The Flag (CTF) event consisting of six mission-based cybersecurity challenges designed to build foundational technical skills, teamwork, and confidence through hands-on learning.",
        rounds: [
            {
                title: "Infinity Stone Missions",
                tagline: "Collect the flags. Restore balance to the system.",
                description: "Six beginner-friendly cybersecurity challenges covering cryptography, DNS lookup, log analysis, steganography, timestamp conversion, and web inspection. Participants capture flags and document solutions with screenshots.",
                _id: { "$oid": "694ce9d2297836cde7682489" }
            }
        ],
        contacts: [
            { name: "Karthick J S", mobile: "9042480747" },
            { name: "Pravith", mobile: "9843243610" }
        ],
        hall: "AIR Lab",
        teamSize: 3,
        date: "2026-02-13T13:00:00.000Z",
        timing: "01:00 PM - 04:00 PM",
        image: "/images/events/paper_presentation.png"
    },
    {
        eventId: "EVNT03",
        eventName: "Git Wars",
        category: "Non Technical",
        oneLineDescription: "Clone. Commit. Conquer",
        description: "Git Wars is a two-round interactive event that blends creativity, communication, strategy, and basic technical thinking.",
        rounds: [
            {
                title: "Code Charades",
                tagline: "Act it out before the signal is lost.",
                description: "Participants act out computer science-related terms using gestures only, with added constraints from Bug Cards. Points earned convert into strategic advantages for the next round.",
                _id: { "$oid": "694cec9c297836cde7682491" }
            },
            {
                "title": "Flash Memory",
                "tagline": "Risk smart or crash into chaos.",
                "description": "Teams answer questions and use advantages earned in Round 1 to select cups containing hidden points.",
                _id: { "$oid": "694cec9c297836cde7682492" }
            }
        ],
        teamSize: 4,
        hall: "Computer Lab 3",
        date: "2026-02-14T09:00:00.000Z",
        timing: "09:00 AM - 12:00 PM",
        image: "/images/events/paper_presentation.png"
    },
    {
        eventId: "EVNT04",
        eventName: "ForceCoders",
        category: "Technical",
        oneLineDescription: "Code like Tourist. Hack like a Grandmaster.",
        description: "A competitive coding event where speed and logic decide survival, followed by a hacking phase where you break others' code.",
        rounds: [
            {
                title: "Round 1 – Coding Phase",
                tagline: "Speed, logic, and precision decide survival.",
                description: "Participants solve competitive programming problems ranging from easy to hard.",
                _id: { "$oid": "694ceca6297836cde768249a" }
            },
            {
                title: "Round 2 – Hacking Phase",
                tagline: "Break the code before it breaks you.",
                description: "Participants attempt to hack other contestants' accepted solutions.",
                _id: { "$oid": "694ceca6297836cde768249b" }
            }
        ],
        teamSize: 2,
        hall: "Programming Lab 1",
        date: "2026-02-14T13:00:00.000Z",
        timing: "01:00 PM - 04:00 PM",
        image: "/images/events/paper_presentation.png"
    },
    {
        eventId: "EVNT05",
        eventName: "Open Quiz",
        category: "Quiz",
        oneLineDescription: "Master the prompt, control the output.",
        description: "A multi-round quiz testing your skills in AI prompting, financial strategy, and puzzle solving.",
        rounds: [
            {
                title: "Round 1 – Prompt Engineer Battle",
                tagline: "Master the prompt, control the output.",
                description: "Teams reverse-engineer AI-generated images by writing prompts.",
                _id: { "$oid": "694ced34297836cde76824a4" }
            },
            {
                title: "Round 2 – Stock Market Quiz",
                tagline: "Bet smart. Think smarter.",
                description: "Teams wager virtual coins before answering questions.",
                _id: { "$oid": "694ced34297836cde76824a5" }
            },
            {
                title: "Round 3 – Phygital Escape Quiz",
                tagline: "Decode reality, unlock the exit.",
                description: "Participants solve physical and digital puzzles using QR codes and clues.",
                _id: { "$oid": "694ced34297836cde76824a6" }
            }
        ],
        teamSize: 3,
        hall: "Seminar Hall A",
        date: "2026-02-13T10:00:00.000Z",
        timing: "10:00 AM - 01:00 PM",
        image: "/images/events/paper_presentation.png"
    },
    {
        eventId: "EVNT06",
        eventName: "CodeMania",
        category: "Technical",
        oneLineDescription: "Turn slow code into lightning-fast logic.",
        description: "Optimize inefficient code and bid wisely on questions to prove your mastery.",
        rounds: [
            {
                title: "Round 1 – The Optimization Arena",
                tagline: "Turn slow code into lightning-fast logic.",
                description: "Participants optimize inefficient code to meet strict time limits.",
                _id: { "$oid": "695a38a48baa56af32706870" }
            },
            {
                title: "Round 2 – Strategic Bidding Challenge",
                tagline: "Bid wisely or lose it all.",
                description: "Teams bid virtual currency on questions of varying difficulty.",
                _id: { "$oid": "695a38a48baa56af32706871" }
            }
        ],
        teamSize: 1,
        hall: "Main Auditorium",
        date: "2026-02-14T10:00:00.000Z",
        timing: "10:00 AM - 01:00 PM",
        image: "/images/events/paper_presentation.png"
    },
    {
        eventId: "EVNT07",
        eventName: "Thooral Hackathon",
        category: "Technical",
        oneLineDescription: "Great ideas begin with bold thinking.",
        description: "A comprehensive hackathon journey from ideation and pitching to documentation and final implementation.",
        rounds: [
            {
                title: "Ideation & Pitching",
                tagline: "Great ideas begin with bold thinking.",
                description: "Teams analyze problems and pitch innovative solutions.",
                _id: { "$oid": "695a3d878baa56af3270688c" }
            },
            {
                title: "Documentation & System Design",
                tagline: "Design it right before you build it.",
                description: "Participants prepare SRS documents and UML diagrams.",
                _id: { "$oid": "695a3d878baa56af3270688d" }
            },
            {
                title: "Implementation Phase",
                tagline: "From paper to production.",
                description: "Teams develop working prototypes or applications.",
                _id: { "$oid": "695a3d878baa56af3270688e" }
            },
            {
                title: "Final Presentation",
                tagline: "Show the world what you built.",
                description: "Teams present solutions, design decisions, and impact.",
                _id: { "$oid": "695a3d878baa56af3270688f" }
            }
        ],
        teamSize: 4,
        hall: "Innovation Center",
        date: "2026-02-13T09:00:00.000Z",
        timing: "09:00 AM - 04:00 PM",
        image: "/images/events/paper_presentation.png"
    }
];

// Group events by category
export const getEventsByCategory = () => {
    const categories = {};
    eventsData.forEach(event => {
        if (!categories[event.category]) {
            categories[event.category] = [];
        }
        categories[event.category].push(event);
    });
    return categories;
};

// Get all unique categories
export const getCategories = () => {
    return [...new Set(eventsData.map(event => event.category))];
};

// Get event by ID
export const getEventById = (id) => {
    return eventsData.find(event => event.eventId === id);
};
