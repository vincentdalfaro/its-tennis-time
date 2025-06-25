import { Link } from 'react-router-dom';
import logo from  '../assets//icons-white/logo-white.png'
import world from '../assets/icons-white/world.png'

export default function TopBar() {
    return (
      <div className="flex-topbar">
          <img src={logo} 
            style={{width:'40px', marginLeft: "20px"}}/>

          <div className="flex-topbar-2">
            <span className="white-text" style={{fontSize: '27px', marginLeft: "0px"}}>Tennis Time</span>
            <Link to="/" className="white-text" style={{fontSize: '16px', marginLeft: "130px"}}>Home</Link>
            <Link to="/map" className="white-text" style={{fontSize: '16px', marginLeft: "30px"}}>Map</Link>
            <Link to="/about" className="white-text" style={{fontSize: '16px', marginLeft: "30px"}}>About</Link>
          </div>

          <img src={world} style={{width:'50px'}}/>
      </div>
    );
}