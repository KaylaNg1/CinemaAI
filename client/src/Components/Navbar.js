import { NavLink } from 'react-router-dom'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './Navbar.css'
import CreateAccount from '../Pages/CreateAccount'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/" activeClassName="active-link">EduNotes</NavLink>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/about" activeClassName="active-link">about</NavLink>
            </li>
            <li>
              <NavLink to="/createAccount" activeClassName="active-link" id = "createAccountLink">create account</NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active-link">login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar