import Navbar from "../Navbar/Navbar"
import KloverAnalytics from "../../assets/kloveranalytics.png"
import { Link, Outlet, useNavigate } from "react-router-dom"
import {FaBars} from "react-icons/fa"
import { useState } from "react"
import { useCookies } from "react-cookie"

const Header = () => {
  const [isNav, setIsNav] = useState(false)
  const [cookie, setCookie] = useCookies()
  const navigate = useNavigate()
  

  function setNav(): void {
    setIsNav(prevNav => !prevNav)
  }

  function LogOut() {
    setCookie("user", undefined, {path: "/", expires: new Date(Date.now() -  (30 * 24 * 3600))})
    navigate("/auth/login")
  }
  
  return (
    <>
      <header>
        <div id="logo">
          <img src={KloverAnalytics} alt=""/>
        </div>

        <div className={`nav ${isNav ? "open" : ""}`}>
          <Navbar setNav={setNav} />

          <div>
            {cookie.user && (
              <button onClick={LogOut} className="btn" style={{width: "100px", fontWeight: "bold", background: "#fff", border: "1px solid #fff",fontSize: "1.15rem"}}>Log Out</button>
            )}

            {!cookie.user && (
              <div className="user-account">
                <div><Link to="auth/login" className="btn">Login</Link></div>
                <div><Link to="auth/register" className="btn register">Register</Link></div>
              </div>
            )}
            
          </div>
        </div>

        <div onClick={setNav} className="nav-button">
          <FaBars 
            style={{"fontSize": "2em", "marginRight": "8px", "cursor": "pointer", "color": "#fff"}}
          />
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Header