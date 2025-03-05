import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './assets/pages/LoginPage';
import Dashboard from './assets/pages/Dashboard';
import CreateMeeting from './assets/pages/CreateMeeting';
import MeetingHistory from './assets/pages/MeetingHistory'
import Notifications from './assets/pages/Notifications'
import Settings from './assets/pages/Settings'

function App() {
  

  return (
    <>
    <div className='bg-white'>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/create" element={<CreateMeeting />} /> 
      <Route path="/history" element={<MeetingHistory />} /> 
      <Route path="/notification" element={<Notifications />} /> 
      <Route path="/settings" element={<Settings />} /> 
    </Routes>
    </div>
   
  </>
);
}

export default App
