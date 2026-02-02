import '../Component.css';
import {useState} from "react";
import { Link } from 'react-router-dom';
  function Navbar() {
      let [showMenu, setshowMenu] = useState(false);
      let handleButtonToggle = ()=>{
        setshowMenu(!showMenu);
      }
      
    
      return(
        <>
        <header>
          <div className="container">
            <div className="grid Nav-grid">
              <div className="logo">Portfolio</div>
              <nav className={showMenu ? "mobile-menu" : "pc-menu"}>
                <ul>
                  <li><Link  to="/"  className="link">Home</Link></li>
                 
                </ul>
                
              
              </nav>
              <div className="ham-menu">
                <button onClick={handleButtonToggle}>≡</button>  
              </div>
            </div>
          </div>
        </header>
        </>
        );
      };
  export default Navbar;