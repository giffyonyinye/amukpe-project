import React from 'react';
import { Link } from 'react-router-dom';
import fbIcon from '../assets/img/fb-icon.png';
import whatsAppIcon from '../assets/img/whatsapp-icon.png';
import igIcon from '../assets/img/ig-icon.png';



const Footer = () => {
    return (
        <section >
            <div className="footer-section">
            <div className="footer-content">
                <h3 style={{marginBottom:"1rem"}}>What We Are</h3>
                <p style={{paddingRight: "1rem"}}>
                    Amukpe Community is established to create awareness and job opportunities to indigenes and non-indigenes in the community and beyond.
                </p>

                <h3 style= {{fontSize:"1.3rem"}}>Social Media Links </h3>
                <div style={{display: "flex"}}>
                    <a href="https://facebook.com"><img style={{width: "2rem", height: "2rem"}} src={fbIcon} alt="#"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://instagram.com"><img style={{width: "2rem", height: "2rem"}}  src={igIcon} alt="#"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://whatsapp.com"><img style={{width: "2rem", height: "2rem"}} src={whatsAppIcon} alt="#"></img></a>
                </div>
            </div>

            <div className=" footer-content">
                <h4 className="quick-link">Quick Links</h4>
                <div className="mapsite">
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            <li>
                                <Link to="/about">About</Link>
                            </li>

                            

                            <li>
                                <Link to="/login">Sign In</Link>
                            </li>

                            
                        </ul>
                    </div>

                    <div>
                        <ul>

                            <li>
                                <Link to="/jobopenings">Jobs</Link>
                            </li>

                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>

                            <li>
                                <Link to="/register">Sign Up</Link>
                            </li>

                            
                        </ul>
                    </div>
                </div>
            </div>


            <div classNameName="contact footer-content">
                <h4 className="quick-link">Contact</h4>
                <div className="address">
                    <div className="contact-icon">
                        <span className="fa fa-send"></span>
                    </div>
                    <div className="contact-info">
                        <p>Location</p>
                        <p style={{fontSize:".8rem"}}>Amukpe, Sapele Delta State</p>
                    </div>
                </div>

                <div className="address">
                    <div className="contact-icon">
                        <span className="fa fa-envelope"></span>
                    </div>
                    <div className="contact-info">
                        <p>Email Address</p>
                        <p><a style={{color: "grey", fontSize:" .8rem"}} href="mailto:amukpecommunity@gmail.com">amukpedistrict@gmail.com</a></p>
                    </div>
                </div>

                <div className="address">
                    <div className="contact-icon">
                        <span className="fa fa-phone"></span>
                    </div>
                    <div className="contact-info">
                        <p>Call Us on</p>
                        <p><a style={{color: "grey", fontSize:".8rem"}} href="tel:+2348067263200">08067263200</a></p>
                    </div>
                </div>
            </div>

            
       </div>

       <div class="copyright">
           <p>&copy; Copyright 2021. Amukpe Community</p>
           
       </div>
       <div style={{ color: "black", textAlign: "right", background:"whitesmoke",fontSize: ".7rem", padding: ".2rem 1rem .2rem 0rem"}}><p>Developed by Giffy Insight Technologies.<br/> Tel: 09013970506</p>
        </div>
        </section>
    )
};

export default Footer;
