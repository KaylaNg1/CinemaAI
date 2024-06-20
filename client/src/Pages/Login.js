import React, { useEffect } from 'react';
import './Login.css';
import Navbar from '../Components/Navbar';
import noteIcon from '../Media/noteIcon.png';

function Login() {
  useEffect(() => {
    const animateButton = (e) => {
      e.preventDefault();
      e.target.classList.remove('animate');
      e.target.classList.add('animate');
      setTimeout(() => {
        e.target.classList.remove('animate');
      }, 700);
    };

    const bubblyButtons = document.getElementsByClassName('Button-Animate');

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false);
    }

    return () => {
      for (let i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].removeEventListener('click', animateButton, false);
      }
    };
  }, []);
  return (
    <div className="Login">
      <Navbar />
      <div className="Login-Header">
        <div className="Front-Face">
          <div className="Left">
            Login
            <br />
            <span id="message">welcome back, friend :)</span>
            <div className="Credentials">
              <div className="Element">
                Email address:
                <br/>
                <input />
              </div>
              <div className="Element">
                Password:
                <br/>
                <input />
              </div>
            </div>
            <div className="Buttons">
              <button className = "Button-Animate">Login</button>
            </div>
          </div>
          <div className="Right">
            Embark on your <span style={{"fontWeight": "bolder" }}>note organization</span> journey with us.
            <br/>
            <img src = {noteIcon}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
