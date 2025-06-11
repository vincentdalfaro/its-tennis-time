import { Link } from 'react-router-dom';
import logo from  '../assets/logo-white.png'
import world from '../assets/world.png'

export default function TopBar() {
    

    return (
      <div className="flex-topbar">
          <img src = {logo} 
            style = {{width:'40px', 
            marginLeft: "20px"
          }}/>

          <div className = "flex-topbar-2">
            <text class = "white-text" style = {{fontSize: '27px', marginLeft: "0px"}}>Tennis Time</text>
            <Link to= "/" class = "white-text" style = {{fontSize: '16px', marginLeft: "130px"}}>Home</Link>
            <Link to = "/map" class = "white-text" style = {{fontSize: '16px', marginLeft: "30px"}}>Map</Link>
            <Link to = "/about" class = "white-text" style = {{fontSize: '16px', marginLeft: "30px"}}>About</Link>
          </div>

          <img src = {world} 
            style = {{width:'50px'
          }}/>
      </div>
);

}