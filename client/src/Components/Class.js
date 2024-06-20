import React, { useEffect } from 'react';
import './NotesHome.css';
import UserNavbar from '../Components/UserNavbar';
import noteIcon from '../Media/noteIcon.png';

function Class() {

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
    <div className="Class">
      <div className="ClassHeader">
        
      </div>
    </div>
  );
}

export default Class;
