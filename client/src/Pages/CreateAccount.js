import React, { useEffect } from 'react';
import './CreateAccount.css';
import Navbar from '../Components/Navbar';
import noteIcon from '../Media/noteIcon.png';
import { useNavigate } from "react-router-dom";

function CreateAccount() {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '../notesHome'; 
    navigate(path);
  }

  async function createAccount() {
    const email = document.querySelector("[name=email]").value;
    const password = document.querySelector("[name=password]").value;
  
    const formData = {
      email: email,
      password: password
    };
  
    try {
      console.log("in try catch");
      const response = await fetch("http://localhost:8000/uploadUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Request was successful
        console.log("Data inserted successfully");
        routeChange()

      } else {
        // Request failed
        console.error("Error inserting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error accessing endpoint:", error);
    }
  }

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
    <div className="CreateAccount">
      <Navbar />
      <div className="CreateAccount-Header">
        <div className="Front-Face">
          <div className="Left">
            Create Account
            <br />
            <span id="message">join us! create an account today :)</span>
            <div className="Credentials">
              <div className="Element">
                Email address:
                <br />
                <input name="email" type="email" />
              </div>
              <div className="Element">
                Password:
                <br />
                <input name="password" type="password" />
              </div>
              <div className="Element">
                Re-type Password:
                <br />
                <input name="re-password" type="password" />
              </div>
            </div>
            <div className="Buttons">
              <button className="Button-Animate" onClick={createAccount}>Create Account</button>
            </div>
          </div>
          <div className="Right">
            Embark on your <span style={{ fontWeight: 'bolder' }}>note organization</span> journey with us.
            <br />
            <img src={noteIcon} alt="Note Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
