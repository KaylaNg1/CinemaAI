import React, { useEffect } from 'react';
import './Login.css';
import Navbar from '../Components/Navbar';
import noteIcon from '../Media/noteIcon.png';
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '../notesHome';
    navigate(path);
  }

  useEffect(() => {
    const form = document.getElementById("Credentials");
    const login = async (event) => {
      event.preventDefault();
      const email = document.querySelector("[name=email]").value;
      const password = document.querySelector("[name=password]").value;

      const formData = {
        email: email,
        password: password
      };

      try {
        const response = await fetch("http://localhost:8001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        }).then((res) => res.json())

        console.log(response)

        if (response.status == 'ok') {
          // Request was successful
          const token = response.data
          localStorage.setItem('token', token)
          console.log("TOKEN: ", token)
          routeChange();
        } else {
          // Request failed
          console.error("Error inserting data:", response.statusText);
        }
      } catch (error) {
        console.error("Error accessing endpoint:", error);
      }
    };

    form.addEventListener('submit', login);
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
            <form id="Credentials">
              <div className="Element">
                Email address:
                <br/>
                <input name="email" type="email" placeholder="email address" />
              </div>
              <div className="Element">
                Password:
                <br/>
                <input name="password" type="password" placeholder="password" />
              </div>
              <input type="submit" value="Login" />
            </form>
            {/* <div className="Buttons">
              <button className = "Button-Animate">Login</button>
            </div> */}
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
