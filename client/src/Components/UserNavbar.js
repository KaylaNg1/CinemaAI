import { NavLink } from 'react-router-dom'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './UserNavbar.css'
import profile from '../Media/profile.png'

const UserNavbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/" activeClassName="active-link">EduNotes</NavLink>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/notesHome" activeClassName="active-link" id= "notesLink">notes</NavLink>
            </li>
            <li>
              <NavLink to="/createAccount" activeClassName="active-link" id = "studyLink">study</NavLink>
            </li>
          </ul>
        </div>
        <div className="profile">
          <NavLink to="/profile" activeClassName="active-link" id = "profileLink"><img src = {profile}/></NavLink>
        </div>
      </div>
    </nav>
  )
}

export default UserNavbar