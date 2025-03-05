import React from 'react';
import SideBar from '../../components/SideBar';
import Calendar from '../../components/Calendar';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar: Fixed width, Full height */}
      <div className="w-64 bg-gray-100">
        <SideBar />
      </div>

      {/* Calendar: Takes the remaining space */}
      <div className="flex-1 p-4 w-[1200px] max-w-full h-[800px] max-h-[90vh]">
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;

