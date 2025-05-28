import MapComponent from '../components/Map.jsx';
import '../App.css';
import logo from  '../assets/logos/logo_lime_green.png'
import Sidebar from '../components/sidebar.jsx'

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
      <div className="box-green" style = {{marginTop: '55px'}}>
        <div className='box-cream'>
          <MapComponent />
        </div>
      </div>
    </div>
    );
}