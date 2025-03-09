import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Footer = () => {
    return (
        <footer>
            <div className="container footer-container">
                <div className="footer-column">
                    <h3>QuickBite Campus</h3>
                    <p>Your go-to platform for quick and delicious meals on campus.</p>
                </div>
                <div className="footer-column">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#menuSection">Menu</a></li>
                        <li><a href="https://profile-fawn-eight.vercel.app/">Profile</a></li>
                        <li><a href="tel:+919347166411" id="contactLink">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook fa-lg"></i></a>
                        <a href="https://www.instagram.com/saketh1607?igsh=eW52ZXIzMnZ3Z3Ax"><i className="fab fa-instagram fa-lg"></i></a>
                        <a href="#"><i className="fab fa-twitter fa-lg"></i></a>
                        <a href="https://www.linkedin.com/in/kotagiri-saketh-560569219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fab fa-linkedin fa-lg"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 QuickBite Campus. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;