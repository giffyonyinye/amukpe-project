import React from "react";
import about from "../assets/img/aboutSvg.svg";
import Footer from "./Footer"


const AboutUs = () => {
    return (
        <section style={{paddingTop:"6rem", paddingLeft:"1rem"}}>
            <div className="text-center h3 pt-4 border" style={{width:"fit-content", margin:"auto"
        
        
        }}>
                About Us
            </div>

            <div className="pt-5">
                <div className="row justify-content-evenly ">
                    <div>
                        <img src={about} alt="aboutUs" className="img-fluid" style={{width:"60%"}} />
                    </div>

                    <div  style={{paddingLeft:"1rem", paddingRight:"1rem", marginTop:"3rem"}}>
                        <h5 style={{fontWeight:"600",width:"fit-content", borderBottom:"5px solid #3a011d"}}>Amukpe Community</h5>
                        <p>Amukpe Community is situated in Amukpe, Sapele Local Government, Delta State. <br/>
                            This platform was established in the year 2021 with the idea from Mr Dickson  Omoraka.
                        </p>
                        <h6 style={{fontWeight:"600",width:"fit-content", borderBottom:"5px solid #3a011d"}}>Aims and Objectives</h6>
                        <p>The main aim of this community platform is to improve the current state of the community thereby<br/> creating awareness
                            and job opportunities to both indigenes and non-indigenes of Okpe Community. <br/>
                            We appreciate talented, hardworking, skilled and career-driven individuals in Okpe community <br/> at large and in diaspora. <br/>
                            Our Objectives is to reduce the level of unemployment by creating job opportunities in the community. <br/>
                            The administrators of this platform stand as a voice to the the people of the community and beyond.<br/>
                            Oneness is Strength, Love and Progress. 
                        </p>
                    </div>
                </div>

            </div>
            <br/>
            <br/>
            <br/>
            <br/>

            <Footer/>
        </section>
    )
}

export default AboutUs;
