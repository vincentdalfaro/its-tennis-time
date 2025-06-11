
import '../App.css';
import Topbar from '../components/Topbar.jsx'
import MyMap from '../components/MapComponent.jsx'

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
          marginLeft: "39.86%",
          zIndex: 0
        }}></div>

     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className='white-text'>Whoops</h1>
        </div>

        <MyMap />
      </div>

    </div>
    );
}