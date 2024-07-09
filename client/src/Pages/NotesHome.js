import React, { useEffect, useState } from 'react';
import './NotesHome.css';
import UserNavbar from '../Components/UserNavbar';
import Class from '../Components/Class';

function NotesHome() {
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
    <div className="NotesHome">
      <UserNavbar />
      <div className="NotesHome-Header">
        <div className="Table-Header">
          Classes
        </div>
        <div className="Classes">
          {/* <button className="Button-Animate" onClick={handleOpen}>
            <div className="AddClass">+</div>
          </button>
          <AddClass isOpen={open} onClose={handleClose} />
          <Class />
          <Class />
          <Class /> */}
          {/* Add more <Class /> components as needed */}
          <Class/>
        </div>
      </div>
    </div>
  );
}

export default NotesHome;
