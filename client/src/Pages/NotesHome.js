import React, { useEffect } from 'react';
import './NotesHome.css';
import UserNavbar from '../Components/UserNavbar';
import AddClass from '../Components/AddClass'

function NotesHome() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


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
        <div className="Table">
          <button className="Button-Animate" onClick={handleOpen} onClose={handleClose}
          ><div className="AddClass" />+</button>
          <AddClass isOpen={open} onClose={handleClose}>
          </AddClass>
        </div>
      </div>
    </div>
  );
}

export default NotesHome;
