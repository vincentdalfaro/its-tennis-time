import '../App.css';
import logo from  '../assets/logos/logo_lime_green.png'
import Sidebar from '../components/sidebar.jsx'
import home_photo from  '../assets/tennis.jpg'


export default function Home() { 

  return (
  <div>
    <Sidebar icon={logo} />
  </div>
);
}