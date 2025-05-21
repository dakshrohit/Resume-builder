import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
    
        const navigate = useNavigate();
      
        const handleStart = () => {
          navigate("/page1");
        };
  return (
    <div className="root">
      <div className="app">
        <div className="header">
          <div className="head-left">
            <p className="content-left">RESUME BUILDER</p>
          </div>
          <div className="head-right">
            <ul className="content_right">
              <div className="content_right_text">
                <li>Examples</li>
                <li>Templates</li>
                <li>Covers</li>
              </div>
              <li>
                <button className="signinbtn">Sign in</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="center_content">Create Your Resume Online...</div>
      <div className="main_btn_class">
        <button className="main_btn"onClick={handleStart}>LETS START</button>
      </div>
      <div className="text-mid">LET ME REPRESENT YOUR HARDWORK !</div>
      <div className="milestone">
        <ul className="text">
          <li>
            <p>25K+&nbsp;</p>
            <p>RECRUITED&nbsp;</p>
          </li>
          <li>
            <p>10K+</p>
            <p>LOGINS</p>
          </li>
          <li className="third">
            <p>5K+</p>
            <p>&nbsp;CV DOWNLOADS</p>
          </li>
        </ul>
      </div>
      <div className="footer">
        <div className="cont1">
          <p className="head">LET'S CONNECT </p>
          <br></br>
          <p>Get in touch </p>
          <p>9547686925</p>
          <p>thor.bijlikadevta01@gmail.com</p>
        </div>
        <div className="cont2">
          <p className="head">COMPANY</p>
          <br></br>
          <p>About Us</p>
          <p>Support</p>
          <p>Privacy Policy</p>
          <p>Terms and Condition</p>
        </div>

        <div>
          <p className="head">COMMUNITY</p>
          <br></br>
          <p>Whatsapp</p>
          <p>Discord</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
