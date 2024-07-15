import React, { useEffect, useState } from 'react';
import './Class.css';
import AddNote from '../Components/AddNote';
import { useNavigate } from "react-router-dom";

export async function getClasses() {
  try {
    const response = await fetch("http://localhost:8001/getNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      }),
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

function Notes() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const result = await getClasses();
          setData(result);
        } catch (error) {
          setError("Error fetching classes");
        } finally {
          // setLoading(false);
        }
      } else {
        console.error("Token not found");
        // setLoading(false);
      }
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
          <div className="AddNote">+</div>
        </button>
        <AddNote isOpen={open} onClose={handleClose} />
        {/* Add more <Class /> components as needed */}
        {data.map((item, index) => (
          <button key={index} className="Button-Animate">
            <div className='NoteName'>{item}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Notes;
