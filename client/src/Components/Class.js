import React, { useEffect, useState } from 'react';
import './Class.css';
import AddClass from '../Components/AddClass';

export async function getClasses() {
  try {
    const response = await fetch("http://localhost:8001/getClasses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error("Error fetching data:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error accessing endpoint:", error);
    return [];
  }
}

function Class() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getClasses();
      setData(result);
    };

    fetchData();

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
  }, []); // Ensure useEffect runs only once

  return (
    <div className="Class">
       <div className="Table">
          <button className="Button-Animate" onClick={handleOpen}>
            <div className="AddClass">+</div>
          </button>
          <AddClass isOpen={open} onClose={handleClose} />
          {/* Add more <Class /> components as needed */}
        {data.map((item, index) => (
          <button key={index} className="Button-Animate">
            <div className='ClassName'>{item}</div>
          </button>
        ))}
       </div>
    </div>
  );
}

export default Class;
