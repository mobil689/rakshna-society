
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './team.css';
import { Linkedin, Github, Instagram, ChevronDown, Moon, Sun } from 'lucide-react';

const MeetTheTeam = () => {
    const [isLight, setIsLight] = useState(false);
    const [dropdowns, setDropdowns] = useState<Record<number, boolean>>({});

    const toggleTheme = () => setIsLight(!isLight);

    const toggleDropdown = (id: number) => {
        setDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="team-page-container">
            <Header />
            
    <section className="hero">
        <div className="hero-content">
            <svg className="hero-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 21.75c4.782-1.22 8.25-5.553 8.25-10.618v-4.85l-8.25-3.032L3.75 6.282v4.85c0 5.065 3.468 9.398 8.25 10.618z" />
            </svg>
            <h1>Meet the Members of <br />Rakshna</h1>
            <p>
                The minds behind the mission - promoting cyber awareness and ethical online behavior, promoting
                cybersecurity awareness for a safer digital world.
            </p>
        </div>
    </section>

    <div className={`terminal-window ${isLight ? "light-mode" : ""}`}>
        <header className="terminal-header">
            <div className="terminal-buttons">
                <span className="btn btn-red"></span>
                <span className="btn btn-yellow"></span>
                <span className="btn btn-green"></span>
            </div>
            <div className="terminal-title">Meet The Team - Terminal</div>
            <button id="themeToggle" className="theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme}>
                {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
            </button>
        </header>

        <div className="container">
            <header>
                <div className="command-line">
                    <span className="prompt">Rakshna@mait:~$</span>
                    <span className="command">cat meet_the_team.sh</span>
                </div>
            </header>

            
            <section id="mentors">
                <h2 className="section-title">Faculty Mentors</h2>
                <div className="centered-grid">

                    
                    <div className="member-wrapper">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="/team/neeraj sir photo.webp" alt="Dr Neeraj Gupta" className="profile-photo" />
                                    <h3 className="member-name">Dr Neeraj Gupta</h3>
                                    <p className="member-role">Faculty Advisor</p>
                                </div>
                                <div className="flip-card-back">
                                    <h4 className="back-title">Specializations</h4>
                                    <ul className="back-list">
                                        <li className="back-item">Artificial Intelligence</li>
                                        <li className="back-item">Ethical Computing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="social-bar">
                            <a target="_blank" href="https://www.linkedin.com/in/neeraj-gupta-0487254/"
                                className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    
                    <div className="member-wrapper">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="/team/bhoomi mam photo.webp" alt="Dr Bhoomi Gupta" className="profile-photo" />
                                    <h3 className="member-name">Dr Bhoomi Gupta</h3>
                                    <p className="member-role">Mentor</p>
                                </div>
                                <div className="flip-card-back">
                                    <h4 className="back-title">Experience</h4>
                                    <ul className="back-list">
                                        <li className="back-item">Ph.D. Computer Science</li>
                                        <li className="back-item">15+ Years Industry Exp</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="social-bar">
                            <a target="_blank" href="https://www.linkedin.com/in/dr-bhoomi-gupta-3278a734/"
                                className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                </div>
            </section>



            
            <section id="core-council">
                <h2 className="section-title">Council</h2>
                <div className="council-container">

                    
                    <div className="member-wrapper president-wrapper">
                        <div className="flip-card president-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="/team/1689613174218 - Aditya jha.webp" alt="President"
                                        className="profile-photo" />
                                    <h3 className="member-name">Aditya Kumar Jha
                                    </h3>
                                    <p className="member-role">President</p>
                                </div>
                                <div className="flip-card-back">
                                    <h4 className="back-title">Certifications</h4>
                                    <ul className="back-list">
                                        <li className="back-item">Harvard Leadership</li>
                                        <li className="back-item">Google Project Mgmt</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="social-bar">
                            <a target="_blank" href="https://www.linkedin.com/in/aditya-jha-552604230"
                                className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                            <a target="_blank" href="https://aditya-portfolio-self-ten.vercel.app/" className="social-link"
                                title="GitHub"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>

                    
                    <div className="council-grid">

                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/IMG_7864 - Crescent Moon.webp" alt="Arjun Jain"
                                            className="profile-photo" />
                                        <h3 className="member-name">Arjun Jain</h3>
                                        <p className="member-role">Vice President</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Operations Mgmt</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/arjunjaincs/" className="social-link"
                                    title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://www.github.com/arjunjaincs" className="social-link"
                                    title="GitHub"><Github className="w-5 h-5" /></a>
                            </div>
                        </div>

                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/high-res-image - YASHIKA SHARMA cropped.webp"
                                            alt="Yashika Sharma" className="profile-photo" />
                                        <h3 className="member-name">Yashika Sharma</h3>
                                        <p className="member-role">Vice President</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Database Admin</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank"
                                    href="https://www.linkedin.com/in/yashika-sharma-931a51324?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://github.com/yashikaaasharma" className="social-link"
                                    title="GitHub"><Github className="w-5 h-5" /></a>
                            </div>
                        </div>

                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/Kartik Singh edited.webp" alt="Kartik Singh" className="profile-photo" />
                                        <h3 className="member-name">Kartik Singh</h3>
                                        <p className="member-role">Secretary</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Accounting</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/kartik-singh19" className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://github.com/PROBOTTHACK" className="social-link" title="GitHub"><Github className="w-5 h-5" /></a>
                            </div>
                        </div>

                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/Screenshot_2026-04-05-10-46-55-39_965bbf4d18d205f782c6b8409c5773a4 - Nimish Ratra.webp"
                                            alt="Nimish Ratra" className="profile-photo" />
                                        <h3 className="member-name">Nimish Ratra</h3>
                                        <p className="member-role">Joint Secretary</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Project Mgmt</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/nimish-ratra-67b536281/"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                
                            </div>
                        </div>
                        
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/IMG_20250304_003542_0544 - Daksh Sharma.webp"
                                            alt="Daksh Sharma" className="profile-photo" />
                                        <h3 className="member-name">Daksh Sharma</h3>
                                        <p className="member-role">General Secretary</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Leadership</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank"
                                    href="https://www.linkedin.com/in/daksh-sharma-a93340328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://www.instagram.com/dsdaksh_11?igsh=MXZwZXU0bnlmcGozaQ=="
                                    className="social-link" title="GitHub"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/Screenshot_20260219_225328_Instagram~2 - Garv Goel.webp"
                                            alt="Garv Goel" className="profile-photo" />
                                        <h3 className="member-name">Garv Goel</h3>
                                        <p className="member-role">Senior Associate </p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Leadership</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank"
                                    href="https://www.linkedin.com/in/garv-goel?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/Screenshot 2026-03-24 at 2.53.40 PM - RAGHAV SHARMA.webp"
                                            alt="Raghav Sharma" className="profile-photo" />
                                        <h3 className="member-name">Raghav Sharma</h3>
                                        <p className="member-role">Senior Associate</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Leadership</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank"
                                    href="https://www.linkedin.com/in/raghav-sharma-9b8566345?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/IMG20260403165137~2 - Guneet Kaur.webp" alt="Guneet Kaur"
                                            className="profile-photo" />
                                        <h3 className="member-name">Guneet Kaur</h3>
                                        <p className="member-role">Senior Associate</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Certifications</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Leadership</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank"
                                    href="https://www.linkedin.com/in/guneet-kaur-595700329?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://github.com/GUN33Tk" className="social-link"
                                    title="GitHub"><Github className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section id="tech-team">
                <h2 className="section-title">Tech Team</h2>
                <div className="centered-grid">
                    
                    <div className="member-wrapper">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="/team/IMG_20260108_000957_076 - Abhisht.webp"
                                        alt="Abhisht Pratap Shukla" className="profile-photo" />
                                    <h3 className="member-name">Abhisht Pratap Shukla</h3>
                                    <p className="member-role">Head</p>
                                </div>
                                <div className="flip-card-back">
                                    <h4 className="back-title">Certifications</h4>
                                    <ul className="back-list">
                                        <li className="back-item">AWS Architect</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="social-bar">
                            <a target="_blank"
                                href="https://www.linkedin.com/in/abhisht-pratap-shukla?utm_source=share_via&utm_content=profile&utm_medium=member_androidhttps://www.linkedin.com/in/abhisht-pratap-shukla?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                            <a target="_blank" href="https://github.com/mobil689" className="social-link" title="GitHub"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>
                    
                    <div className="member-wrapper">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="/team/Devansh malik updated.webp" alt="Devansh Malik"
                                        className="profile-photo" />
                                    <h3 className="member-name">Devansh Malik</h3>
                                    <p className="member-role">Co-Head</p>
                                </div>
                                <div className="flip-card-back">
                                    <h4 className="back-title">Certifications</h4>
                                    <ul className="back-list">
                                        <li className="back-item">Google UX</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="social-bar">
                            <a target="_blank" href="https://www.linkedin.com/in/devansh-malik-65745b313/"
                                className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                            <a target="_blank" href="https://github.com/devanshmalik-13" className="social-link"
                                title="GitHub"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>
                    
                    <div className="member-wrapper">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="/team/Kshitij image.webp" alt="Kshitij" className="profile-photo" />
                                    <h3 className="member-name">Kshitij</h3>
                                    <p className="member-role">Co-Head</p>
                                </div>
                                <div className="flip-card-back">
                                    <h4 className="back-title">Certifications</h4>
                                    <ul className="back-list">
                                        <li className="back-item">Full Stack Dev</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="social-bar">
                            <a target="_blank" href="https://www.linkedin.com/in/kshitij2804/" className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                            <a target="_blank" href="https://github.com/kshitijpal07" className="social-link" title="GitHub"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                
                <div className={`team-dropdown ${dropdowns[1] ? 'active' : ''}`}>
                    <button className="dropdown-trigger" onClick={() => toggleDropdown(1)}>
                        <span>More Team Members</span>
                        <ChevronDown className="w-4 h-4 ml-2 inline-block dropdown-icon" />
                    </button>
                    <div className="dropdown-content">
                        <div className="stick-list">
                            
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Nimish Jindal</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a href="https://www.linkedin.com/in/nimish-jindal-0abb31329/" target="_blank"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a href="https://github.com/Nimish3186/" target="_blank" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Saksham Jain</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank"
                                        href="https://www.linkedin.com/in/saksham-jain-b72220212?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/Saksham16926" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Anurag Mehra</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/anurag-mehra-softwaredev"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/anuragmehra786" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Praneel Maitra</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/praneel-maitra"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/praneel1" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Abhiraj Mishra</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/abhiraj-mishra/"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/abhiraj-mishra" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Sarthak Malik</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/sarthak-malik-b63a4b326/"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/SarthakMalik123" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Madhav Gagneja </span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank"
                                        href="https://www.linkedin.com/in/madhav-g-90813b321?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/madhav-gagneja" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Keshav kumar</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank"
                                        href="https://www.linkedin.com/in/dev-keshav-kumar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/Keshav1712" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Prajjwal Hedaoo </span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/prajjwal-hedaoo-737717384/"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Jatin</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/jatinrajput-0415l"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/JatinRajputexe" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Aarush jain</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/aarush-jain-0768aa335/"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/zke-7D6" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                            <div className="stick-item">
                                <div className="stick-info">
                                    <span className="stick-name">Rishabh Kaushik</span>
                                    <span className="stick-role">Member</span>
                                </div>
                                <div className="stick-socials">
                                    <a target="_blank" href="https://www.linkedin.com/in/rishabh-kaushik-9876a238a/"
                                        className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                    <a target="_blank" href="https://github.com/Rishu222006/" className="stick-link"
                                        title="GitHub"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            
            <section id="non-tech">

                
                <div className="team-subunit">
                    <h2 className="section-title">Social Media Team</h2>
                    <div className="centered-grid">
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/IMG_1065 - Dhruv Bhatia.webp" alt="Dhruv"
                                            className="profile-photo" />
                                        <h3 className="member-name">Dhruv</h3>
                                        <p className="member-role">Head Social Media Team</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Content Strategy</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/dhruv-bhatia-00125432b"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank"
                                    href="https://www.instagram.com/i.dhruvv_?igsh=YWpwams0cW5ocGtp&utm_source=qr"
                                    className="social-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/Snapchat-1036216382 - Jessica.webp" alt="Jessica"
                                            className="profile-photo" />
                                        <h3 className="member-name">Jessica</h3>
                                        <p className="member-role">Co-Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Graphic Design</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank"
                                    href="https://www.linkedin.com/in/jessica-166441323?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://www.instagram.com/jeessyyccaaa?igsh=MWh0YzZuaGxyczZyMA==" className="social-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/Garv Nanda.webp" alt="Garv Nanda" className="profile-photo" />
                                        <h3 className="member-name">Garv Nanda</h3>
                                        <p className="member-role">Co-Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Community Mgmt</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/garv-nanda-4106b6336" className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://www.instagram.com/garvnandaa/?hl=en" className="social-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </div>
                    <div className={`team-dropdown ${dropdowns[2] ? 'active' : ''}`}>
                        <button className="dropdown-trigger" onClick={() => toggleDropdown(2)}>
                            <span>More Team Members</span>
                            <ChevronDown className="w-4 h-4 ml-2 inline-block dropdown-icon" />
                        </button>
                        <div className="dropdown-content">
                            <div className="stick-list">
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Anushka Singh</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank" href="https://www.linkedin.com/in/anushka-singh-777aa831a"
                                            className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        <a target="_blank"
                                            href="https://www.instagram.com/anu.sshhkkaa?igsh=YTliaWM4bXdoNmk%3D&utm_source=qr"
                                            className="stick-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Ashmita Khanal</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank"
                                            href="https://www.linkedin.com/in/ashmita-khanal-7460b4331?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                            className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        <a target="_blank"
                                            href="https://www.instagram.com/ashmitakhanal_?igsh=Mm54bXN4eXR5NGlt"
                                            className="stick-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="team-subunit">
                    <h2 className="section-title">Event Management Team</h2>
                    <div className="centered-grid">
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/WhatsApp Image 2026-03-24 at 20.32.30 - VINAYAK VASHISHTHA.webp"
                                            alt="Vinayak Vashishtha" className="profile-photo" />
                                        <h3 className="member-name">Vinayak Vashishtha</h3>
                                        <p className="member-role">Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Logistics</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/vinayakvashishtha112005"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/Mahesh Kumar.webp" alt="Mahesh Kumar Mandal" className="profile-photo" />
                                        <h3 className="member-name">Mahesh Kumar Mandal</h3>
                                        <p className="member-role">Co-Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Event Flow</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/mahesh-kumar-971a94346?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://www.instagram.com/artiste_mahi" className="social-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/file_00000000977c720b9bf79e1152447040 - Tushar Garg.webp"
                                            alt="Tushar Garg" className="profile-photo" />
                                        <h3 className="member-name">Tushar Garg</h3>
                                        <p className="member-role">Co-Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">On-ground Mgmt</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/tushar-garg-4608b9374/"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                
                            </div>
                        </div>
                    </div>
                    <div className={`team-dropdown ${dropdowns[3] ? 'active' : ''}`}>
                        <button className="dropdown-trigger" onClick={() => toggleDropdown(3)}>
                            <span>More Team Members</span>
                            <ChevronDown className="w-4 h-4 ml-2 inline-block dropdown-icon" />
                        </button>
                        <div className="dropdown-content">
                            <div className="stick-list">
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Rishabh Kaushik</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank" href="https://www.linkedin.com/in/rishabh-kaushik-9876a238a/"
                                            className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        
                                    </div>
                                </div>
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Devesh Pratap Singh</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank"
                                            href="https://www.linkedin.com/in/devesh-pratap-singh-9ab707381?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                                            className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        <a target="_blank"
                                            href="https://www.instagram.com/_devesh__rajput_21_?igsh=MWEza2RpbnA0bXdlaA%3D%3D&utm_source=qr"
                                            className="stick-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="team-subunit">
                    <h2 className="section-title">PR & Outreach Team</h2>
                    <div className="centered-grid">
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/IMG-20260206-WA0012 - Jay.webp" alt="Jai Giri"
                                            className="profile-photo" />
                                        <h3 className="member-name">Jai Giri</h3>
                                        <p className="member-role">Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Publicity</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank"
                                    href="https://www.linkedin.com/in/jai-giri-93953b328?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                    className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/IMG_20260323_130102 - Shivam Gupta.webp" alt="Shivam Gupta"
                                            className="profile-photo" />
                                        <h3 className="member-name">Shivam Gupta</h3>
                                        <p className="member-role">Co-Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Partnerships</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                <a target="_blank" href="https://www.linkedin.com/in/shivam-gupta-4756b6318?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="social-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                <a target="_blank" href="https://github.com/Shivam-Gupta290506" className="social-link" title="Instagram"><Github className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div className="member-wrapper">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src="/team/hritik image - hritik tyagi.webp" alt="Hritik Tyagi"
                                            className="profile-photo" />
                                        <h3 className="member-name">Hritik Tyagi</h3>
                                        <p className="member-role">Co-Head</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <h4 className="back-title">Expertise</h4>
                                        <ul className="back-list">
                                            <li className="back-item">Media Relations</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="social-bar">
                                
                                
                                        
                            </div>
                        </div>
                    </div>
                    <div className={`team-dropdown ${dropdowns[4] ? 'active' : ''}`}>
                        <button className="dropdown-trigger" onClick={() => toggleDropdown(4)}>
                            <span>More Team Members</span>
                            <ChevronDown className="w-4 h-4 ml-2 inline-block dropdown-icon" />
                        </button>
                        <div className="dropdown-content">
                            <div className="stick-list">
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Muskan Bhardwaj</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank" href="https://www.linkedin.com/in/muskan-bhardwaj12"
                                            className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        <a target="_blank"
                                            href="https://www.instagram.com/mbhardwaj_12?igsh=Nnc4ajZ4NGE5aHpw"
                                            className="stick-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Keshav Garg</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank" href="https://www.linkedin.com/in/keshav-garg-169399365
" className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        <a target="_blank" href="https://www.instagram.com/keshav_garg_1807?igsh=NnJuZWk2N296Y3d6
" className="stick-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Prateek Tanwar</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank" href="https://www.linkedin.com/in/prateek-tanwar-9b61a8332/"
                                            className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        <a target="_blank"
                                            href="https://www.instagram.com/_prateek_og?igsh=MWtuNDB4b2x0ZmVwcw=="
                                            className="stick-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                                <div className="stick-item">
                                    <div className="stick-info">
                                        <span className="stick-name">Devanshi Verma</span>
                                        <span className="stick-role">Member</span>
                                    </div>
                                    <div className="stick-socials">
                                        <a target="_blank" href="https://www.linkedin.com/in/devanshi-verma-4238b3330
" className="stick-link" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                                        <a target="_blank" href="https://www.instagram.com/devanshi_ii16?igsh=Z2w4eW1hZ2dpZTdr
" className="stick-link" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>


    <hr className="footer-divider" />
    
            <Footer />
        </div>
    );
};

export default MeetTheTeam;
