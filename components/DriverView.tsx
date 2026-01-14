
import React, { useState } from 'react';
import { RideStatus, Ride } from '../types';
import InteractiveMap from './InteractiveMap';

interface DriverViewProps {
  store: any;
}

const DriverView: React.FC<DriverViewProps> = ({ store }) => {
  const [online, setOnline] = useState(true);

  const pendingRides = store.allRides.filter((r: Ride) => r.status === RideStatus.REQUESTED && !r.driverId);

  if (store.activeRide && store.activeRide.driverId === store.user.id) {
    const r = store.activeRide;
    return (
      <div className="h-screen bg-slate-900 flex flex-col relative">
        <div className="flex-1">
          <InteractiveMap status={r.status} pickup={r.pickup} dropoff={r.dropoff} />
        </div>
        
        <div className="p-8 bg-white rounded-t-[40px] shadow-2xl z-20">
           <div className="flex items-center space-x-6 mb-8">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=pass`} className="w-16 h-16 rounded-full border-4 border-slate-50" />
              <div className="flex-1">
                <h4 className="text-xl font-black text-slate-800">Sarah Jenkins</h4>
                <p className="text-sm font-bold text-slate-400">Premium Member • 5.0 ★</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-indigo-600 uppercase">Incoming Fare</p>
                <p className="text-3xl font-black text-slate-900">{r.currency}{r.offeredPrice}</p>
              </div>
           </div>

           <div className="space-y-4">
              {r.status === RideStatus.ACCEPTED && (
                <button 
                  onClick={() => store.updateRideStatus(r.id, RideStatus.ARRIVED)}
                  className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black shadow-xl shadow-indigo-600/30"
                >
                  I'm Here
                </button>
              )}
              {r.status === RideStatus.ARRIVED && (
                <button 
                  onClick={() => store.updateRideStatus(r.id, RideStatus.IN_PROGRESS)}
                  className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black shadow-xl shadow-emerald-600/30"
                >
                  Start Trip
                </button>
              )}
              {r.status === RideStatus.IN_PROGRESS && (
                <button 
                  onClick={() => store.updateRideStatus(r.id, RideStatus.COMPLETED)}
                  className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black"
                >
                  Finish Trip
                </button>
              )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <div className="p-8 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm">
         <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Driver Hub</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{online ? 'Receiving Global Bids' : 'System Offline'}</p>
         </div>
         <button 
            onClick={() => setOnline(!online)}
            className={`w-16 h-8 rounded-full transition-all relative ${online ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${online ? 'right-1' : 'left-1'}`}></div>
          </button>
      </div>

      <div className="p-6">
        <div className="bg-indigo-600 p-8 rounded-[32px] text-white shadow-2xl shadow-indigo-600/30 mb-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10"></div>
           <p className="text-xs font-black opacity-60 uppercase tracking-widest mb-1">Today's Revenue</p>
           <h3 className="text-4xl font-black tracking-tighter">{store.country.symbol}248.50</h3>
           <div className="mt-6 flex space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-2xl text-[10px] font-black uppercase">8.2 Hrs Online</div>
              <div className="bg-white/20 px-4 py-2 rounded-2xl text-[10px] font-black uppercase">14 Trips</div>
           </div>
        </div>

        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Nearby Opportunities</h4>
        
        <div className="space-y-4">
          {!online && (
            <div className="text-center py-20 opacity-30">
               <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
               </div>
               <p className="font-black">You are currently offline</p>
            </div>
          )}

          {online && pendingRides.length === 0 && (
            <div className="text-center py-20">
               <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
               <p className="text-slate-400 font-bold">Scanning Global Bids...</p>
            </div>
          )}

          {online && pendingRides.map((ride: Ride) => (
            <div key={ride.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 animate-slideUp">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Premium Bid</span>
                    <p className="text-lg font-black text-slate-800 mt-2">To: {ride.dropoff.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-emerald-600">{ride.currency}{ride.offeredPrice}</p>
                    <p className="text-[10px] font-bold text-slate-400">Cash / Wallet</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3 mt-6">
                  <button className="py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100">Ignore</button>
                  <button 
                    onClick={() => store.updateRideStatus(ride.id, RideStatus.ACCEPTED, store.user.id)}
                    className="py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/20"
                  >
                    Accept Offer
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverView;
