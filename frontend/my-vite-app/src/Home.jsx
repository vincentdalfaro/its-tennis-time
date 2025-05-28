import MapComponent from './Map';
import './App.css';
import logo from  './assets/logos/logo_green.png'
import Sidebar from './sidebar.jsx'

export default function titlepage() {

  const w3_close = () => {
    document.getElementById("mySidebar").style.display = "none";
  };

  const w3_open = () => {
    document.getElementById("mySidebar").style.display = "block";
  };

  return (
    <div> 
      <Sidebar icon = {logo}/>
      <div className="box">
        <MapComponent />
      </div>
    </div>
    );
}