// Hardcoded events data matching database structure
export const eventsData = [
    {
        eventId: "EVNT01",
        eventName: "Hackathon Supreme",
        category: "Technical",
        oneLineDescription: "Code. Create. Conquer.",
        description: "Build innovative solutions to real-world problems in this 24-hour coding marathon. Team up with fellow developers and showcase your skills to win exciting prizes.",
        rounds: [
            {
                title: "Round 1 – Ideation & Pitch",
                description: "Present your idea to the judges and get feedback on feasibility and innovation."
            },
            {
                title: "Round 2 – Development Sprint",
                description: "24-hour coding marathon to build your solution with full technical support."
            },
            {
                title: "Round 3 – Final Presentation",
                description: "Showcase your working prototype and compete for the top prizes."
            }
        ],
        contacts: [
            {
                name: "Technical Lead",
                mobile: "9876543210"
            },
            {
                name: "Event Coordinator",
                mobile: "9876543211"
            }
        ],
        hall: "Main Auditorium",
        eventRules: "Teams of 2-4 members. Original code only. All decisions by judges are final.",
        teamSize: 4,
        date: "2026-02-13T09:00:00.000Z",
        closed: false,
        timing: "9:00 AM - 9:00 AM (Next Day)",
        youtubeUrl: "",
        image: "/images/events/hackathon.png"
    },
    {
        eventId: "EVNT02",
        eventName: "Code Combat",
        category: "Competitive",
        oneLineDescription: "Battle of Algorithms",
        description: "Test your competitive programming skills in this intense coding battle. Solve complex algorithmic problems against the clock and rise to the top of the leaderboard.",
        rounds: [
            {
                title: "Round 1 – Qualification",
                description: "Solve basic to intermediate problems to qualify for the finals."
            },
            {
                title: "Round 2 – Finals",
                description: "Advanced algorithmic challenges for the top performers."
            }
        ],
        contacts: [
            {
                name: "Competitive Lead",
                mobile: "9876543212"
            }
        ],
        hall: "Computer Lab 1",
        eventRules: "Individual participation. No internet access during contest. Use of pre-written code templates allowed.",
        teamSize: 1,
        date: "2026-02-13T14:00:00.000Z",
        closed: false,
        timing: "2:00 PM - 5:00 PM",
        youtubeUrl: "",
        image: "/images/events/code_competition.png"
    },
    {
        eventId: "EVNT03",
        eventName: "Git Wars",
        category: "Non Technical",
        oneLineDescription: "Clone. Commit. Conquer",
        description: "Git Wars is a two-round interactive event that blends creativity, communication, strategy, and basic technical thinking. With a Star Wars theme, participants compete as teams in progressive rounds where early performance directly impacts later advantages, fostering teamwork, improvisation, and decision-making in a fun and competitive environment.",
        rounds: [
            {
                title: "Round 1 – Code Charades (The Droid's Transmission)",
                description: "Participants act out computer science-related terms using gestures only, with added constraints from Bug Cards. Points earned convert into strategic advantages for the next round."
            },
            {
                title: "Round 2 – Deal or No Deal: CS Edition (The Asteroid Field)",
                description: "Teams answer a mix of technical and non-technical questions and use advantages earned in Round 1 to select cups containing hidden points, introducing risk-taking and strategy."
            }
        ],
        contacts: [
            {
                name: "Srimathikalpana T",
                mobile: "8122966128"
            },
            {
                name: "Suryaprakash B",
                mobile: "7339143171"
            }
        ],
        hall: "G Block Classroom",
        eventRules: "Teams must follow organiser instructions. Judging is based on accuracy, time, creativity, team synergy, and effective use of advantages. Organisers' decisions are final.",
        teamSize: 4,
        date: "2026-02-14T09:00:00.000Z",
        closed: false,
        timing: "To be announced",
        youtubeUrl: "",
        image: "/images/events/quiz.png"
    },
    {
        eventId: "EVNT04",
        eventName: "Tech Workshop",
        category: "Learning",
        oneLineDescription: "Learn. Build. Innovate.",
        description: "Hands-on learning with industry experts covering the latest technologies and frameworks. Perfect for beginners and intermediate developers looking to upskill.",
        rounds: [
            {
                title: "Session 1 – Theory & Fundamentals",
                description: "Learn core concepts and best practices from experienced professionals."
            },
            {
                title: "Session 2 – Hands-on Practice",
                description: "Build real-world projects with guidance from mentors."
            }
        ],
        contacts: [
            {
                name: "Workshop Coordinator",
                mobile: "9876543213"
            }
        ],
        hall: "Seminar Hall",
        eventRules: "Individual participation. Bring your own laptop. All materials will be provided.",
        teamSize: 1,
        date: "2026-02-13T10:00:00.000Z",
        closed: false,
        timing: "10:00 AM - 4:00 PM",
        youtubeUrl: "",
        image: "/images/events/workshop.png"
    },
    {
        eventId: "EVNT05",
        eventName: "Tech Talk",
        category: "Learning",
        oneLineDescription: "Inspire. Innovate. Impact.",
        description: "Inspiring talks from tech leaders sharing their journey, insights, and vision for the future of technology.",
        rounds: [
            {
                title: "Keynote Session",
                description: "Hear from industry leaders about cutting-edge technology and career insights."
            },
            {
                title: "Q&A Session",
                description: "Interactive session where you can ask questions and network with speakers."
            }
        ],
        contacts: [
            {
                name: "Events Team",
                mobile: "9876543214"
            }
        ],
        hall: "Main Auditorium",
        eventRules: "Open to all. First come first serve seating.",
        teamSize: 1,
        date: "2026-02-14T14:00:00.000Z",
        closed: false,
        timing: "2:00 PM - 4:00 PM",
        youtubeUrl: "",
        image: "/images/events/tech_talk.png"
    },
    {
        eventId: "EVNT06",
        eventName: "Paper Presentation",
        category: "Academic",
        oneLineDescription: "Research. Present. Excel.",
        description: "Present your innovative research ideas and compete with fellow researchers. Showcase your academic prowess and win recognition.",
        rounds: [
            {
                title: "Round 1 – Abstract Review",
                description: "Submit your research abstract for preliminary evaluation."
            },
            {
                title: "Round 2 – Presentation",
                description: "Present your complete research work to a panel of judges."
            }
        ],
        contacts: [
            {
                name: "Academic Coordinator",
                mobile: "9876543215"
            }
        ],
        hall: "Conference Room",
        eventRules: "Teams of 1-3 members. Original research only. Plagiarism will lead to disqualification.",
        teamSize: 3,
        date: "2026-02-14T10:00:00.000Z",
        closed: false,
        timing: "10:00 AM - 2:00 PM",
        youtubeUrl: "",
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
