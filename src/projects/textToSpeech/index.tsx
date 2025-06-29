import React, { useState, useEffect, useRef } from "react";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState("0");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance>(null);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = synthRef.current.getVoices();
      setVoices(allVoices);
    };

    loadVoices();
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel(); // Stop any ongoing speech
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices[parseInt(selectedVoiceIndex)];

    if (voice) {
      utterance.voice = voice;
    } else {
      alert("no voice selected");
      return;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (synthRef.current.speaking) {
      synthRef.current.pause();
    }
  };

  const handleResume = () => {
    if (synthRef.current.paused) {
      synthRef.current.resume();
    }
  };

  const handleStop = () => {
    synthRef.current.cancel();
  };

  useEffect(() => {
    return () => {
      handleStop();
    };
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>Text to Speech Converter </h2>

      <textarea
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
      />

      <label>Select Voice</label>
      <select
        className="form-select"
        value={selectedVoiceIndex}
        onChange={(e) => setSelectedVoiceIndex(e.target.value)}
      >
        <option value="-1">Select voice</option>
        {voices.map((voice, index) => (
          <option key={voice.name} value={index}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      <label>
        Rate: {rate}
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
      </label>

      <label>
        Pitch: {pitch}
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(parseFloat(e.target.value))}
        />
      </label>

      <div style={{ marginTop: "20px" }}>
        <button className="btn mx-1 btn-primary" onClick={handleSpeak}>
          Speak
        </button>
        <button className="btn mx-1 btn-secondary" onClick={handlePause}>
          Pause
        </button>
        <button className="btn mx-1 btn-info" onClick={handleResume}>
          Resume
        </button>
        <button className="btn mx-1 btn-danger" onClick={handleStop}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;

// HR Interview Script
// Interviewer: Welcome to your HR round interview at Vlack Solutions. We're glad to have you here today. Let's start with the first question.

// Interviewer: Tell me about yourself.

// Candidate: I'm a Frontend Developer with 3 years of experience, currently working at Resource One IT Solutions. My core strength lies in building responsive and high-performance web applications using React.js, JavaScript, and modern tools like Redux, Tailwind CSS, and Webpack. Over time, I’ve taken initiative in optimizing app performance using techniques like lazy loading and code splitting. I’ve also led a small team to develop a task management system with role-based access. I come from an Electrical Engineering background, but transitioned into software development due to my deep interest in building user interfaces. I’m now looking for a growth-driven company like Vlack Solutions to contribute to scalable projects and continue learning.

// Interviewer: Walk me through your resume and work experience.

// Candidate: After completing my B.Tech in Electrical and Electronics Engineering, I shifted to frontend development and joined Resource One IT Solutions in July 2022. Here, I’ve worked on internal and client-facing applications, implemented performance optimization practices, and contributed to both solo and team-based projects. I've built several personal projects using the MERN stack including a Social Media App, Chat App, and a Job Interview Tracker. I also hold certifications like the Full Stack MERN certificate from Udemy and the Namaste Frontend System Design certificate by Akshay Saini.

// Interviewer: How did you transition from Electrical Engineering to Software Development?

// Candidate: While studying Electrical Engineering, I was introduced to programming through a friend who worked in software testing. My curiosity gradually shifted from circuits to code. After graduation, I started exploring frontend technologies on my own, built small projects, and realized I truly enjoyed creating visual interfaces. This led me to pursue full-time opportunities in frontend development, and since then, I’ve focused entirely on improving my skills and building scalable web applications.

// Interviewer: Why did you choose frontend development as your specialization?

// Candidate: I’ve always been drawn to design, user experience, and the impact of interfaces on usability. Frontend development allows me to blend creativity with logic. I enjoy translating designs into interactive and accessible components. React.js in particular excites me because of its component-based architecture, reusability, and active ecosystem. I find satisfaction in seeing immediate results of my work and how it helps end users.

// Interviewer: Why are you looking to leave your current company?

// Candidate: At Resource One, I’ve had a great learning experience, but most of my work has been in support or maintenance. I’m now looking for a role that allows me to take ownership of products, work in a collaborative agile team, and be part of building scalable, user-focused solutions. Vlack Solutions, being a fast-growing tech company, seems like the right place to take that next step.

// Interviewer: What are your strengths and weaknesses?

// Candidate: My strengths include consistency and self-discipline—I maintain a structured daily routine for both work and learning. I'm also a fast learner and pick up new tools and frameworks quickly. Lastly, I take ownership for delivering high-quality, tested, and optimized frontend code. Regarding weaknesses, I used to be hesitant to speak up in team discussions, especially early in my career. However, I’ve improved this over time by preparing better and staying involved in design and planning meetings.

// Interviewer: Why do you want to join Vlack Solutions?

// Candidate: Vlack Solutions is a fast-growing company that works on high-impact web and mobile projects. The job description aligns very closely with the kind of work I’m passionate about—building scalable React applications, writing optimized code, and collaborating with cross-functional teams. I also appreciate that the company is product-focused and values innovation and collaboration, which are important to me as I look to grow.

// Interviewer: What do you know about our company and our products or services?

// Candidate: I understand that Vlack Solutions is a tech company that delivers web and mobile solutions for clients worldwide. From what I’ve seen on your site and job description, your team values performance, responsive UI, and agile product development. I also noticed your emphasis on modern tech stacks and collaborative development, which reflects a growth mindset—something I really want to be part of.

// Interviewer: Why do you think you're a good fit for this role?

// Candidate: My 3 years of React.js development experience, hands-on optimization work, and exposure to full-stack projects make me well-suited for this role. I have experience building reusable components, integrating APIs, optimizing performance, and collaborating with designers and backend developers. Additionally, I’m proactive in learning—I keep up with best practices and have worked on both solo and team projects.

// Interviewer: What kind of work environment do you prefer?

// Candidate: I thrive in a collaborative environment where team members can openly discuss ideas, give and receive feedback, and support each other in delivering quality work. I also appreciate environments that encourage continuous learning and improvement, which I believe are key to long-term growth in tech.

// Interviewer: Are you more comfortable working in a team or independently?

// Candidate: I’m comfortable with both. I enjoy working independently when implementing a feature or solving a specific problem, but I also value team collaboration—especially during planning, brainstorming, and code reviews. I believe combining both approaches leads to better software and stronger teams.

// Interviewer: Where do you see yourself in the next two to three years?

// Candidate: In the next 2–3 years, I aim to become a senior frontend developer, taking full ownership of end-to-end features in a product environment. I also want to mentor junior developers and improve my design system and performance optimization skills. Long term, I see myself growing into a frontend architect role.

// Interviewer: Are you open to working in other technologies if needed?

// Candidate: Yes, I’m always open to learning new technologies if the project demands it. While my core strength is in React and frontend tools, I’ve worked with Node.js and MongoDB as well and am eager to pick up whatever is needed to support the team.

// Interviewer: Are you looking for a long-term opportunity here?

// Candidate: Yes, I’m looking for a company where I can stay long term, grow with the team, and contribute meaningfully to product development. I believe stability helps both the developer and the company build better systems.

// Interviewer: Do you have any plans for higher studies or relocation?

// Candidate: As of now, I have no plans for higher studies or relocation. My focus is entirely on improving my skills, growing professionally, and contributing to my next company.

// Interviewer: What is your current notice period? Can it be reduced?

// Candidate: My official notice period is 90 days. However, I’ve informed my current employer and I’m prepared to serve 45 days, with the option to buy out the remaining period. I can ensure a smooth and early transition.

// Interviewer: Are you willing to serve the notice period completely or opt for buyout?

// Candidate: I am flexible. I can serve the 45 days and buy out the rest if required. My goal is to ensure the new company doesn't face any delays and my current team has enough time to transition.

// Interviewer: When can you join if selected?

// Candidate: I can join within 45 days from the date of offer. If needed, I can try to reduce that further based on discussions with my current employer.

// Interviewer: Are you currently interviewing with other companies?

// Candidate: I’m in discussions with a few other companies, but Vlack Solutions is among my top priorities because of the technical alignment and team structure. I’ll give this opportunity serious consideration if selected.

// Interviewer: What is your current CTC and expected CTC?

// Candidate: My current CTC is ₹4 LPA. Based on my skills, experience, and the industry standard, I’m expecting around ₹9 LPA. I believe this reflects the value I bring in terms of frontend development and product delivery.

// Interviewer: Is your expected CTC flexible based on role and responsibilities?

// Candidate: Yes, I’m open to discussion if the role offers good learning, growth, and project ownership. While ₹9 LPA is my expectation, I’m more focused on long-term growth than short-term compensation.

// Interviewer: What benefits are most important to you—health, remote work, bonuses, etc.?

// Candidate: Health insurance, flexibility when needed, and performance-based bonuses are important to me. More than that, I value good team culture, continuous learning, and stability.

// Interviewer: Are you open to working from the office if required?

// Candidate: Yes, I’m open to working from the office. In fact, I prefer it during onboarding or for collaborative teams, as it helps understand the culture, product vision, and team dynamics better.

// Interviewer: Have you worked in a startup environment before?

// Candidate: Yes, my current company operates in a startup-like model where I’ve been involved in fast-paced, multiple-role projects. I’m comfortable wearing multiple hats and adapting to dynamic environments.

// Interviewer: How do you handle deadlines and pressure?

// Candidate: I manage my time effectively and break work into smaller deliverables to stay on track. I also keep communication open with my team. In my current job, I’ve handled tight timelines by balancing task priorities and using proper planning.

// Interviewer: Tell me about a time you faced a conflict in a team. How did you resolve it?

// Candidate: In one project, we had a mismatch between backend and frontend data expectations. Rather than pushing blame, I initiated a joint call with the backend developer, we discussed API changes, and agreed on a common contract. The issue was resolved within hours because of open communication.

// Interviewer: How do you prioritize tasks when working on multiple features or bugs?

// Candidate: I usually start by understanding deadlines and impact. I prioritize production bugs and critical issues first. Then I focus on features based on sprint planning or stakeholder importance. I use tools like Jira or Notion to track and organize work.

// Interviewer: Thank you for your time today. We'll be in touch soon.

// I hope this script is exactly what you need to create your practice interview audio! Let me know if you need any adjustments or further assistanc
