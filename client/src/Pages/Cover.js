import React, { useEffect } from 'react';
import './Cover.css';
import Navbar from '../Components/Navbar';
import front from '../Media/front.png';

function Cover() {
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
    <div className="Home">
      <Navbar />
      <div className="Home-Header">
        <div className="Front-Face">
          <div className="Left">
            Organize your thoughts better with <span style={{ color: '#55AD9B' }}>EduNotes</span>
            <div className="Buttons">
              <button className="Button-Animate">Learn More</button>
            </div>
          </div>
          <div className="Right">
            <img src={front} alt="Front" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cover;
