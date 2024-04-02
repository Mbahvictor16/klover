import { NavLink } from "react-router-dom"

interface INav {
  setNav: () => void
}

const Navbar = ({setNav}: INav) => {
  return (
    <nav>
        <ul>
            <li>
              <NavLink to="" onClick={setNav}>Home</NavLink>
            </li>
            <li>
              <NavLink to="stocks" onClick={setNav}>Stocks</NavLink>
            </li>
            <li >
              <NavLink to="about" onClick={setNav}>About Us</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar