

export const INTEREST_CATEGORIES = {
  "THINK & DISCOVER": ["Problem Solving", "Mathematics", "Science", "Research", "Experiments", "Logical Thinking", "Data & Statistics", "Puzzles", "Understanding How Things Work", "Space & Astronomy", "Psychology", "Human Behaviour", "Investigation", "Discovery", "Asking Why"],
  "TECHNOLOGY": ["Computers", "Coding", "Web Development", "Mobile Apps", "AI & Machine Learning", "Cybersecurity", "Robotics", "Electronics", "Game Development", "Data Science", "Cloud Technology", "Networking", "Automation", "Hardware", "3D Printing", "Emerging Technology"],
  "BUILD & FIX": ["Building Things", "Repairing Things", "Machines", "Vehicles", "Electronics", "Electrical Work", "Mechanical Work", "Construction", "Designing Structures", "Working With Tools", "DIY Projects", "Practical Experiments", "Making Physical Products"],
  "CREATIVE": ["Drawing", "Graphic Design", "UI/UX Design", "Photography", "Video Editing", "Animation", "3D Design", "Architecture", "Fashion", "Music", "Singing", "Acting", "Storytelling", "Writing", "Filmmaking", "Content Creation", "Creative Writing", "Illustration"],
  "PEOPLE & SOCIETY": ["Helping People", "Teaching", "Explaining Ideas", "Communication", "Public Speaking", "Psychology", "Counseling", "Leadership", "Teamwork", "Mentoring", "Healthcare", "Understanding People", "Social Impact", "Community Work", "Debate", "Negotiation"],
  "BUSINESS": ["Entrepreneurship", "Business", "Finance", "Investing", "Economics", "Marketing", "Sales", "Branding", "Management", "Startups", "Negotiation", "Organizing Events", "Managing Money", "Building a Business", "Finding Business Opportunities"],
  "WORLD & SOCIETY": ["Environment", "Climate", "Animals", "Nature", "Agriculture", "Geography", "History", "Law & Justice", "Government", "Social Issues", "Sustainability", "Community Development", "Public Service"],
  "HEALTH & LIFE": ["Medicine", "Healthcare", "Human Body", "Nutrition", "Fitness", "Sports Science", "Medical Technology", "Biotechnology", "Genetics", "Neuroscience", "Public Health", "Laboratory Science"],
  "ACTION & ADVENTURE": ["Sports", "Fitness", "Travel", "Adventure", "Outdoor Work", "Field Work", "Exploring New Places", "Wildlife", "Emergency Response", "Aviation", "Marine Life", "Working in Different Places"],
  "FUTURE": ["Space Technology", "AI", "Robotics", "Autonomous Vehicles", "Virtual Reality", "Augmented Reality", "Smart Cities", "Renewable Energy", "Electric Vehicles", "Drones", "Quantum Technology"],
  "DIGITAL CULTURE": ["Gaming", "Game Design", "Esports", "Streaming", "YouTube", "Social Media", "Digital Communities", "Online Business", "Content Creation"]
};

export const ADAPTIVE_INTERESTS = {
  "Technology": {
    q: "What sounds most exciting?",
    options: ["Build a website", "Build a mobile app", "Create an AI tool", "Protect a system", "Build a game", "Analyze data", "Build a robot", "Work with hardware", "Set up networks"]
  },
  "Cybersecurity": {
    q: "What sounds most exciting?",
    options: ["Find vulnerabilities", "Investigate a cyber incident", "Protect a network", "Analyze suspicious activity", "Learn ethical hacking", "Build secure software"]
  },
  "Creative": {
    q: "What sounds most exciting?",
    options: ["Design an app", "Edit a video", "Create animation", "Design a poster", "Create a brand", "Take photographs", "Tell a story", "Design a product"]
  },
  "Business": {
    q: "What sounds most exciting?",
    options: ["Start a business", "Analyze company data", "Create marketing", "Manage a team", "Negotiate", "Build a product", "Sell something"]
  }
};

export const SUBJECT_CATEGORIES = {
  "STEM": ["Mathematics", "Computer Science", "Physics", "Chemistry", "Biology", "Environmental Science", "Statistics", "Electronics", "Engineering"],
  "BUSINESS & SOCIETY": ["Business Studies", "Economics", "Accountancy", "Social Studies", "History", "Geography", "Political Science", "Psychology", "Sociology"],
  "CREATIVE & COMMUNICATION": ["Art", "Design", "Music", "Literature", "Languages", "Media Studies", "Drama", "Photography"],
  "PRACTICAL": ["Technical Education", "Electronics", "Computer Hardware", "Automobile", "Agriculture", "Home Science", "Physical Education"]
};

export const SUBJECT_SUB_INTERESTS = {
  "Computer Science": ["Writing Code", "Web Development", "Apps", "AI", "Cybersecurity", "Databases", "Networking", "Game Development", "UI Design", "Hardware"],
  "Mathematics": ["Logic", "Statistics", "Probability", "Geometry", "Patterns", "Puzzles", "Calculations", "Data"],
  "Physics": ["Machines", "Electronics", "Electricity", "Space", "Energy", "Mechanics", "Robotics", "Experiments"],
  "Biology": ["Human Body", "Medicine", "Animals", "Plants", "Environment", "Genetics", "Biotechnology", "Microbiology", "Nutrition", "Neuroscience"]
};

export const REAL_WORLD_PROBLEMS = {
  "Computer Science": ["Protect people from cyber attacks", "Build an AI assistant", "Build healthcare technology", "Create a game", "Build a website", "Analyze data", "Build smart vehicle technology", "Improve education with technology"]
};

export const STRENGTH_CATEGORIES = {
  "THINKING": ["Problem Solving", "Logical Thinking", "Critical Thinking", "Analytical Thinking", "Decision Making", "Pattern Recognition", "Research", "Observation", "Troubleshooting", "Strategic Thinking", "Attention to Detail", "Learning Quickly", "Asking Good Questions", "Finding Solutions", "Understanding Complex Ideas"],
  "TECHNOLOGY": ["Computer Basics", "Programming", "Web Development", "Data Analysis", "AI / Machine Learning", "Cybersecurity", "Networking", "Hardware", "Electronics", "Digital Tools", "Technical Troubleshooting", "Learning New Technology", "Automation", "Software Tools"],
  "PRACTICAL": ["Technical / Mechanical", "Repairing Things", "Building Things", "Working With Tools", "Operating Machines", "DIY Projects", "Physical Coordination", "Following Technical Instructions", "Working With Materials", "Construction", "Vehicle Maintenance", "Practical Experiments"],
  "CREATIVE": ["Creativity", "Drawing", "Design", "UI/UX", "Photography", "Video Editing", "Animation", "Writing", "Storytelling", "Music", "Visual Thinking", "Generating Ideas", "Imagination", "Creating New Things", "Thinking Differently"],
  "COMMUNICATION": ["Communication", "Public Speaking", "Writing", "Explaining Ideas", "Storytelling", "Presentation", "Debate", "Negotiation", "Listening", "Persuasion", "Teaching"],
  "PEOPLE": ["Teamwork", "Helping Others", "Empathy", "Understanding People", "Mentoring", "Teaching", "Conflict Resolution", "Supporting Others", "Building Relationships", "Leadership", "Collaboration", "Patience", "Active Listening", "Community Engagement"],
  "BUSINESS": ["Leadership", "Decision Making", "Organization", "Project Management", "Entrepreneurship", "Business Thinking", "Financial Thinking", "Sales", "Marketing", "Negotiation", "Planning", "Delegation", "Taking Initiative", "Managing Teams", "Identifying Opportunities"],
  "ORGANIZATION": ["Organization", "Time Management", "Planning", "Meeting Deadlines", "Managing Multiple Tasks", "Documentation", "Record Keeping", "Scheduling", "Prioritization", "Consistency", "Attention to Detail", "Completing Tasks", "Working Independently"],
  "SCIENCE": ["Scientific Thinking", "Experimentation", "Observation", "Data Collection", "Analysis", "Research", "Mathematics", "Hypothesis Testing", "Laboratory Work", "Understanding Evidence", "Investigating Problems", "Curiosity", "Accuracy", "Patience"],
  "REAL WORLD": ["Working Outdoors", "Physical Fitness", "Agriculture", "Working With Animals", "Nature", "Environmental Awareness", "Field Work", "Travel", "Adaptability", "Navigation", "Emergency Response"]
};

export const STRENGTH_EVIDENCE = [
  "School projects", "Personal projects", "Competitions", "Games / puzzles",
  "Helping friends/family", "Coding", "Fixing things", "Sports", "Clubs / events",
  "Volunteering", "Real-life situations", "I haven't had much chance yet", "Other"
];

export const WORKSTYLE_SCENARIOS = {
  "A: A computer cannot connect to the internet. Find out what's wrong.": "Technical",
  "B: Create a poster for a college event.": "Creative",
  "C: Explain a difficult topic to a classmate.": "Communication",
  "D: Organize a team to finish a project.": "Leadership",
  "E: Analyze data and find a pattern.": "Analytical",
  "F: Build or repair something using tools.": "Practical",
  "G: Investigate suspicious computer activity.": "Cybersecurity",
  "H: Design an app screen.": "Design",
  "I: Create a marketing campaign.": "Business"
};

export const NEGATIVE_PREFERENCES = [
  "Desk work", "Working alone", "Public speaking", "Repetitive tasks",
  "Heavy physical work", "Numbers", "Computers", "Outdoor work", "High pressure",
  "Customers", "Long education", "Structured work", "Unpredictable work", "Frequent travel"
];

// Fallback for SKILLS used in scoring
export const SKILLS = [
  "Computer Basics", "Programming", "Problem Solving", "Communication",
  "Creativity", "Technical/Mechanical", "Organization", "Customer Service"
];

export const SKILL_DESC = {
  "Computer Basics": "Confidence with computers and OS tools is the baseline.",
  "Programming": "Writing, reading and debugging code is foundational.",
  "Problem Solving": "Structured analytical thinking is transferable across every role.",
  "Communication": "Explaining technical ideas clearly to non-technical people.",
  "Creativity": "Design, content and novel solution-building.",
  "Technical/Mechanical": "Hands-on practical skills.",
  "Organization": "Managing tasks, priorities and documentation.",
  "Customer Service": "Handling people, expectations and complaints professionally."
};
