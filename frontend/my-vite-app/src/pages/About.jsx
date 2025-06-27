import '../App.css';
import Topbar from '../components/Top-bar.jsx'

export default function About() {

  return (
     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}> 
      
      <Topbar/>
      <div className="horizontal-bar" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Scrollable left column */}
        <div style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none',}}>
          <div className="white-text" style = {{marginLeft:"100px", marginTop:"150px", marginRight: "500px", fontSize: "20px"}}>
                    This project was first created to provide a tool to help give thorough details regarding tennis courts in San Francisco. 
                    The current reservation system is through a private, San Francisco based company: Rec.us, with a partnership with the San Francisco Park’s Department. 
                    While Rec.us does maintain a reservation system, it lacks information and a way to elegantly navigate the information that is provided. 
                    This project exists to do just that. Built as a proper tool, I intend to offer it to the community it was geared to and continually 
                    develop it with consideration. 
                </div>

        </div>

      <div style={{ flex: 1 }}>
          <div className="white-text" style = {{width: "200px", marginLeft: "20px", fontFamily: "Futura", fontSize: "30px", textAlign: "right", marginRight: "30px"}}>
              <div style = {{marginTop: "80px"}}> Overview</div>
              <div style = {{marginTop: "20px"}}> About Me </div>
              <div style = {{marginTop: "20px"}}> Tech Stack</div>
              <div style = {{marginTop: "20px"}}> Costs </div>
              <div style = {{marginTop: "20px"}}> Additional </div>
              <div style = {{marginTop: "20px"}}> Future </div>
              <div style = {{marginTop: "20px"}}> Contact </div>
          </div>
        </div>

      </div>


    </div>
    );
}