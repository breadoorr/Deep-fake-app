import './Landing.css';
export const Landing = () => {
    return (
        <>
            <header>
                <div id="mobile">
                    <i id="bar" className="fas fa-bars"></i>
                </div>
                <nav>
                    <ul id="navbar">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">How to Play</a></li>
                        <li><a href="#">Team</a></li>
                        <li><a href="#" id="login-link">Sign Up/Login</a></li>
                    </ul>
                </nav>
            </header>

            <div id="modal" className="modal" data-mode="login">
                <div className="modal-content">
                    <span className="close-btn" id="close-btn">&times;</span>
                    <h2 id="modal-title">Sign Up / Login</h2>

                    <div id="login-form">
                        <input type="text" placeholder="Username" className="modal-input"/>
                        <input type="password" placeholder="Password" className="modal-input"/>
                        <button className="modal-btn">Login</button>
                        <p className="no-account-text">
                            Don’t have an account? <a href="#" id="signup-link">Sign up here</a>
                        </p>
                    </div>

                    <div id="registration-form" style={{display: null}}>
                        <input type="text" placeholder="Enter Username" className="modal-input"/>
                        <input type="email" placeholder="Enter Your Email" className="modal-input"/>
                        <input type="password" placeholder="Password" className="modal-input"/>
                        <button className="modal-btn">Register</button>
                        <p className="no-account-text">
                            Already have an account? <a href="#" id="login-back-link">Log in here</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="snap-wrapper">

                <section id="hero" className="hero">
                    <h1>Welcome</h1>
                    <p>Deepfake Awareness Game</p>
                    <a href="#choose-mode" className="start-btn">Start</a>
                    <p className="scroll-text">Scroll to learn more about the project</p>
                </section>

                <section id="info" className="content-section" tabIndex="0">
                    <h2>Fighting Misinformation</h2>
                    <p>Six students are raising awareness about deepfakes, revealing their impact on society.</p>

                    <h2>Engaging for Awareness</h2>
                    <p>The Deepfake Training Game boosts understanding of deepfake content through interactive play.</p>

                    <h2>How It Works</h2>
                    <p>Players distinguish real from fake in dynamic scenarios, sharpening their critical skills.</p>

                    <h2>Why It Matters</h2>
                    <p>Deepfake awareness is vital for everyone in today’s digital age.</p>

                </section>

                <section id="choose-mode" className="game-modes">
                    <h2>Choose Your Mode</h2>
                    <div className="mode">
                        <h3>Learning Mode</h3>
                        <p>Explore the world of deepfakes. This mode provides tips and examples to help you identify
                            manipulated content and understand common signs of fake images and videos.</p>
                        <button className="mode-btn" id="learning-mode">Let's Learn</button>
                    </div>
                    <div className="mode">
                        <h3>Play Mode</h3>
                        <p>Put your skills to the test! Use your knowledge to spot fake content in real scenarios.</p>
                        <button className="mode-btn" id="play-mode">Challenge Me</button>
                    </div>
                </section>

                <section id="team" className="developer-team">
                    <h2>Meet the Developer Team</h2>
                    <div className="team-members">
                        <div className="member">
                            <h3>Chystiakova
                                Daria</h3>
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

                <section className="footer">
                    <div className="footer-content">
                        <div className="contact-info">
                            <h3>Contact Us</h3>
                            <p>If you have any questions, feel free to reach out to us at:</p>
                            <p><strong>Email:</strong> <a
                                href="mailto:deepFakeProjectTeam@gmail.com">deepFakeProjectTeam@gmail.com</a></p>
                            <p>We’ll get back to you as soon as possible!</p>
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
                    <div className="footer-copyright">
                        <p>&copy; 2024 Deepfake Awareness Team. All rights reserved.</p>
                    </div>
                </section>
            </div>
        </>
    )
}

// module.exports.default = { Landing };