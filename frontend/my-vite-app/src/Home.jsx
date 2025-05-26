import MapComponent from './Map';
import './App.css';
import logo from  './assets/logos/logo_green.png'

export default function titlepage() {
  return (
    <div>      
      <div style = {{textAlign: "right"}}>
        <img src = {logo} 
             style={{ width: '300px'}}/>
      </div>

      <div className="box">
        {/* <img src = {logo}> </img> */}
        <MapComponent />
      </div>
    </div>
    );
}