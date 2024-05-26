import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import './Home.css';
import Navbar from '../components/Navbar';

const Home = () => {
  const [activeScreen, setActiveScreen] = useState('sidebar');

  const toggleScreen = () => {
    setActiveScreen(activeScreen === 'sidebar' ? 'chat' : 'sidebar');
  };

  return (
    <div className='home'>
      <div className="top-bar">
        <span>Chatwell</span>
        <div className="accounts">
          <Navbar />
        </div>
      </div>
      {activeScreen === 'sidebar' ? <Sidebar /> : <Chat />}
      <div className="bottom-navbar">
        <span onClick={toggleScreen}>
          Menu
        </span>
        <span onClick={toggleScreen}>
          Chat
        </span>
      </div>
    </div>
  );
}

export default Home;
