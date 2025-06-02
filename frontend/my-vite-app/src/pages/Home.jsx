import MapComponent from '../components/Map.jsx';
import '../App.css';
import logo from  '../assets/logos/logo_lime_green.png'
import Sidebar from '../components/sidebar.jsx'
export default function Home() {

  return (
  <div>
    <Sidebar icon={logo} />

      <div className="box-green" style={{ marginTop: '55px' }}>
        <h1 className = "map-header">Reservations</h1>
        <div className='flex-container'>          
          <MapComponent />
        </div>
      </div>



  </div>
);
}