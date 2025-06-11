
import '../App.css';
import Topbar from '../components/Topbar.jsx'
import MyMap from '../components/MyMap.jsx'

export default function Map() {

  return (
    <div> 
      <Topbar/>

      <div style={{
        width: '100%',
        height: '2px',
        backgroundColor: 'white'
      }}></div>

      <div style={{
          position: 'absolute',
          width: '2px',
          backgroundColor: 'white',
          height: '100vh', 
          marginLeft: "500px",
          zIndex: 0
        }}></div>

      <div style = {{display: "flex", alignContent: "flex-start"}}>
        <text style = {{color: "white"}}> Hello?</text>
        <MyMap></MyMap>
      </div>

    </div>
    );
}