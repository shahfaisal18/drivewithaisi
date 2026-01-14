
import React from 'react';
import { UserRole } from '../types';

interface NavigationProps {
  currentRole: UserRole;
  onLogout: () => void;
  onSwitch: (role: UserRole) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentRole, onLogout, onSwitch }) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-t flex items-center justify-around px-6 z-50">
      <button className="flex flex-col items-center space-y-1 text-blue-600">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
      </button>

      <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
      </button>

      <div className="relative -top-6">
        <button 
          onClick={() => onSwitch(currentRole === 'passenger' ? 'driver' : 'passenger')}
          className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 ring-4 ring-white"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
        </button>
      </div>

      <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
      </button>

      <button onClick={onLogout} className="flex flex-col items-center space-y-1 text-gray-400 hover:text-red-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">Exit</span>
      </button>
    </nav>
  );
};

export default Navigation;
