import { Link, NavLink } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
      <nav className="nav-bar">
      <div className="logo"><Link to="/">Home</Link></div>
      <ul>
        <li><NavLink to="/Login">Login</NavLink></li>
          <li><NavLink to="/Register">Registrer</NavLink></li>
          <li><NavLink to="/UserList">User List</NavLink></li>
      </ul>
      </nav>
      <div className="spaceUnder"></div>
    </div>
  )
}

export default Navbar
