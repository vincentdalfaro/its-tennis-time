
import '../App.css';
import Topbar from '../components/Topbar.jsx'
import MyMap from '../components/MapComponent.jsx'


export default function Map() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />

      {/* Horizontal Bar */}
      <div className='horizontal-bar'/>

      {/* Main content: full height */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Scrollable left column */}
        <div style={{ width: '40%', overflowY: 'auto', padding: '1rem' }}>
          <h1 className='white-text'>Whoops</h1>
        </div>

        {/* Vertical Divider */}
        <div className="vertical-bar"></div>

        {/* Fixed map area */}
        <div style={{ flex: 1 }}>
          <MyMap />
        </div>
      </div>
    </div>
  );
}