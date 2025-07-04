import '../App.css';
import Topbar from '../components/Topbar.jsx';

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Topbar />
      <div className="horizontal-bar" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', alignItems: 'flex-start' }}>
        {/* Scrollable left column */}
        <div style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', flex: 1 }}>
          <div
            className="white-text"
            style={{
              marginLeft: '100px',
              marginTop: '150px',
              marginRight: '100px',
              fontSize: '20px',
              maxWidth: '800px',
              lineHeight: '1.6',
            }}
          >
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              This project was first created to provide a tool to help give thorough details regarding tennis courts in San Francisco.
              The current reservation system is through a private, San Francisco based company: Rec.us, with a partnership with the San Francisco Park’s Department.
              While Rec.us does maintain a reservation system, it lacks information and a way to elegantly navigate the information that is provided.
              This project exists to do just that. Built as a proper tool, I intend to offer it to the community it was geared to and continually develop it with consideration.
            </p>

            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              My name is Vincent Alfaro. I’m 24 years old and have lived in San Francisco since starting my undergraduate degree in 2020. 
              I currently work two service industry jobs while also maintaining and continually developing this website. I have several active 
              hobbies, the most relevant being tennis, running, reading, and cooking. I care deeply about the city I’ve embraced as my home and 
              want to continue giving back to it in any way I can.
            </p>
          </div>

        </div>

        {/* Right bar: only takes up as much width as it needs */}
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          <div
            className="white-text"
            style={{
              fontFamily: 'Futura',
              fontSize: '30px',
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            {/* <div style={{ marginTop: '80px' }}>Overview</div>
            <div style={{ marginTop: '20px' }}>About Me</div>
            <div style={{ marginTop: '20px' }}>Tech Stack</div>
            <div style={{ marginTop: '20px' }}>Costs</div>
            <div style={{ marginTop: '20px' }}>Additional</div>
            <div style={{ marginTop: '20px' }}>Future</div>
            <div style={{ marginTop: '20px' }}>Contact</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
