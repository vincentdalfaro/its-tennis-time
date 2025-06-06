import '../App.css';
import logo from  '../assets/logos/logo_lime_green.png'
import Sidebar from '../components/sidebar.jsx'
import home_photo from  '../assets/tennis.jpg'


export default function Home() { 

  return (
  <div>
    <Sidebar icon={logo} />
    <div className='flex-home'>
      <img src = {home_photo} 
        style={{ width: '700px'}}/>  
        <div style={{ width: '2px', height: '350px', backgroundColor: 'black', marginLeft: "10px" }}></div> 
        <div className='flex-home-2'>
          <text style = {{fontSize: 40, marginLeft: "160px", font: "Times New Roman"}}> Find Your Court!</text>
          <input style = {{marginLeft:"160px"}} type="text" placeholder="Zip Code" />
        </div>
    </div>
   <div style={{ height: '2px', backgroundColor: 'black', marginTop: "10px", width: "700px", marginLeft: "15px" }}></div>
    <div>
      <text style = {{fontSize: 40, marginLeft: "160px", font: "Times New Roman"}}> Explore Visualizations</text>
    </div>
  </div>
);
}