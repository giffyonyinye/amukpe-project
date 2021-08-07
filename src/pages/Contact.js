import React from 'react';
import Footer from './Footer';


const Contact = () => {
    return (
        <section style={{paddingTop:"7rem"}}>
            <div className="text-center h3 pt-4">
                Contact Us
            </div>
            <div className="row justify-content-evenly mt-5"style={{background:"whitesmoke"}} >
                <div className=" p-5">
                    <p><i className="fa fa-phone border p-1" style={{background:"#3a011d", color:"white"}}></i> Call Us:</p>
                    <p>Contact: <a href="tel:+2348063361340">08063361340</a></p>
                    <p>Contact: <a href="tel:+2348034664025">08034664025</a></p>
                    <p>Lines open 8am-7pm GMT Monday-Saturday</p>
                </div>

                

                <div className=" p-5">
                    <p><i className="fa fa-envelope p-1"  style={{background:"#3a011d", color:"white"}}></i>  Email Us:</p>
                    <p>Contact: <a href="mailto:amukpedistrict@gmail.com">amukpedistrict@gmail.com</a></p>
                    <p>We aim to respond to your enquires within 24 hours.</p>

                </div>

                <div className=" p-5">
                    <p><i className="fa fa-home p-1"  style={{background:"#3a011d", color:"white"}}></i>  Location:</p>
                    <p>Amukpe, Sapele, Delta State.</p>
                    <p>Open Monday-Friday, 9am-4pm</p>

                </div>

                
            </div>
            <br/>
            <br/>
            <br/>
            

            <Footer/>
        </section>
    )
}

export default Contact;