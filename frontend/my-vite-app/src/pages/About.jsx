import '../App.css';
import logo from  '../assets/logo-white.png'
import Topbar from '../components/Topbar.jsx'

export default function About() {

  return (
    <div> 
      <Topbar icon = {logo}/>
      <div className="horizontal-bar" />
      <div class = "text-white">
          <h1>Hello</h1>
      </div>


    </div>
    );
}