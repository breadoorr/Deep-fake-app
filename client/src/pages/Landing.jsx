import './Landing.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useEffect, useRef} from "react";



import { Navigate, useNavigate } from 'react-router-dom';
export const Landing = () => {
    const navigate = useNavigate();
    const sections = useRef([]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.focus();
                    }
                });
            },
            {
                threshold: 1,
            }
        );

        sections.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const setRef = (index) => (el) => {
        sections.current[index] = el;
    };

    return (
        <div className="Landing">
            <Header />
            <div className="snap-wrapper">
                <section
                    id="hero"
                    className="hero"
                    tabIndex="0"
                    ref={setRef(0)}
                >
                    <h1>Welcome</h1>
                    <p>Deepfake Awareness Game</p>
                    <a className="start-btn" onClick={() => navigate('/menu')}>Start</a>
                    <p className="scroll-text">Scroll to learn more about the project</p>
                </section>

                <section
                    id="info"
                    className="content-section"
                    tabIndex="0"
                    ref={setRef(1)}
                >
                    <h2>Fighting Misinformation</h2>
                    <p style={{lineHeight: "1.3rem"}}>Six students are raising awareness about deepfakes, revealing their impact on society.</p>

                    <h2>Engaging for Awareness</h2>
                    <p style={{lineHeight: "1.3rem"}}>The Deepfake Training Game boosts understanding of deepfake content through interactive play.</p>

                    <h2>How It Works</h2>
                    <p style={{lineHeight: "1.3rem"}}>Players distinguish real from fake in dynamic scenarios, sharpening their critical skills.</p>

                    <h2>Why It Matters</h2>
                    <p style={{lineHeight: "1.3rem"}}>Deepfake awareness is vital for everyone in today’s digital age.</p>
                </section>

                <section
                    id="choose-mode"
                    className="game-modes"
                    tabIndex="0"
                    ref={setRef(2)}
                >
                    <h2>Choose Your Mode</h2>
                    <div className="mode">
                        <h3>Learning Mode</h3>
                        <p style={{lineHeight: "1.7rem",  fontFamily: "'Space Mono', monospace"}}>Explore the world of deepfakes. This mode provides tips and examples to help you identify
                            manipulated content and understand common signs of fake images and videos.</p>
                        <button className="mode-btn" id="learning-mode" onClick={() => navigate('/learning')}>Let's Learn</button>
                    </div>
                    <div className="mode">
                        <h3>Play Mode</h3>
                        <p style={{lineHeight: "1.7rem", fontFamily: "'Space Mono', monospace"}}>Put your skills to the test! Use your knowledge to spot fake content in real scenarios.</p>
                        <button className="mode-btn" id="play-mode" onClick={() => navigate('/menu')}>Challenge Me</button>
                    </div>
                </section>

                <section
                    id="team"
                    className="developer-team"
                    tabIndex="0"
                    ref={setRef(3)}
                >
                    <h2>Meet the Developer Team</h2>
                    <div className="team-members">
                        <div className="member">
                            <h3>Chystiakova Daria</h3>
                            <p>Project Manager</p>
                        </div>
                        <div className="member">
                            <h3>Iambarshev Ivan</h3>
                            <p>Lead Developer</p>
                        </div>
                        <div className="member">
                            <h3>Gavrishchuk Alena</h3>
                            <p>UI/UX Designer</p>
                        </div>
                        <div className="member">
                            <h3>Kostanian Spartak</h3>
                            <p>System Admin</p>
                        </div>
                        <div className="member">
                            <h3>Stukalin Timofey</h3>
                            <p>DB Admin</p>
                        </div>
                    </div>
                </section>

                <section
                    id="footer"
                    className="footer"
                    tabIndex="0"
                    ref={setRef(4)}
                >
                    <div className="footer-content">
                        <div className="contact-info">
                            <h3>Contact Us</h3>
                            <p style={{lineHeight: "1.3rem"}}>If you have any questions, feel free to reach out to us at:</p>
                            <p style={{lineHeight: "1.3rem"}}><strong>Email:</strong> <a
                                href="mailto:deepFakeProjectTeam@gmail.com">deepFakeProjectTeam@gmail.com</a></p>
                            <p style={{lineHeight: "1.3rem"}}>We’ll get back to you as soon as possible!</p>
                        </div>
                        <form className="contact-form">
                            <label htmlFor="contact-name">Name</label>
                            <input type="text" id="contact-name" name="contact-name" placeholder="Your name" required/>
                            <label htmlFor="contact-email">Email</label>
                            <input type="email" id="contact-email" name="contact-email" placeholder="Your email"
                                   required/>
                            <label htmlFor="contact-message">Message</label>
                            <textarea id="contact-message" name="contact-message" placeholder="Your message" rows="3"
                                      required></textarea>
                            <button type="submit" className="contact-btn">Send Message</button>
                        </form>
                    </div>
                    <div className="landing-footer-copyright">
                        <p>&copy; 2024 Deepfake Awareness Team. All rights reserved.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

