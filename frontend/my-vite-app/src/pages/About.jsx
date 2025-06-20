import '../App.css';
import logo from  '../assets/logo-white.png'
import Topbar from '../components/Topbar.jsx'

export default function About() {

  return (
     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}> 
      
      <Topbar icon = {logo}/>
      <div className="horizontal-bar" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Scrollable left column */}
        <div style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none',}}>
          <div className="white-text" style = {{marginLeft:"100px", marginTop:"80px", marginRight: "100px", fontSize: "20px"}}>
                    When he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blahWhen he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blah
                </div>

        </div>

      <div style={{ flex: 1 }}>
          <div className="white-text" style = {{width: "200px", marginLeft: "20px", fontFamily: "Futura"}}>
              <h1 style = {{fontFamily: "Futura"}}> Overview</h1>
              <h1> Tech Stack</h1>
              <h1> About Me </h1>
              <h1> Future </h1>
          </div>
        </div>

      </div>


    </div>
    );
}