
import React from 'react';
import { RideStatus } from '../types';

interface MapMockProps {
  status?: RideStatus;
  isDriverView?: boolean;
}

const MapMock: React.FC<MapMockProps> = ({ status, isDriverView }) => {
  return (
    <div className="w-full h-full bg-slate-100 overflow-hidden relative">
      {/* Simulated Map Grid */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20 pointer-events-none">
         {Array.from({length: 100}).map((_, i) => (
           <div key={i} className="border border-slate-300"></div>
         ))}
      </div>

      {/* Simulated Roads */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 L100,50 M50,0 L50,100 M20,0 L20,100 M80,0 L80,100 M0,20 L100,20 M0,80 L100,80" stroke="#cbd5e1" strokeWidth="2" fill="none" />
        <path d="M20,20 L80,80 M80,20 L20,80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" fill="none" />
      </svg>

      {/* Landmarks (Boxes) */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-slate-200 rounded border border-slate-300"></div>
      <div className="absolute bottom-1/4 right-1/4 w-16 h-10 bg-slate-200 rounded border border-slate-300"></div>
      <div className="absolute top-1/2 right-1/3 w-10 h-14 bg-slate-200 rounded border border-slate-300"></div>

      {/* Markers */}
      {!status && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      {status === RideStatus.REQUESTED && (
        <>
          <div className="absolute top-1/3 left-1/4 w-8 h-8 flex flex-col items-center animate-bounce">
             <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 w-8 h-8 flex flex-col items-center">
             <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
        </>
      )}

      {(status === RideStatus.ACCEPTED || status === RideStatus.ARRIVED) && (
        <div className="absolute transition-all duration-1000" style={{
          top: status === RideStatus.ARRIVED ? '33.3%' : '20%',
          left: status === RideStatus.ARRIVED ? '25%' : '10%'
        }}>
           <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center shadow-lg border-2 border-white transform rotate-45">
              <svg className="w-5 h-5 -rotate-45 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V9.414a1 1 0 00-.293-.707l-2-2A1 1 0 0017 6.414H14z" /></svg>
           </div>
        </div>
      )}

      {status === RideStatus.IN_PROGRESS && (
        <div className="absolute animate-pulse" style={{top: '45%', left: '45%'}}>
           <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center shadow-lg border-2 border-white transform rotate-45">
              <svg className="w-5 h-5 -rotate-45 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V9.414a1 1 0 00-.293-.707l-2-2A1 1 0 0017 6.414H14z" /></svg>
           </div>
        </div>
      )}
    </div>
  );
};

export default MapMock;
