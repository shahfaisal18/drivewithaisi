
import React, { useState, useEffect } from 'react';
import { RideStatus, Location, Ride } from '../types';
import { MOCK_LOCATIONS, BRAND_COLORS } from '../constants';
import { getSuggestedPrice, simulateDriverAcceptance } from '../services/geminiService';
import InteractiveMap from './InteractiveMap';

interface PassengerViewProps {
  store: any;
}

const PassengerView: React.FC<PassengerViewProps> = ({ store }) => {
  const [pickup, setPickup] = useState<Location>(MOCK_LOCATIONS[0]);
  const [dropoff, setDropoff] = useState<Location>(MOCK_LOCATIONS[1]);
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const fetchAIData = async () => {
    const data = await getSuggestedPrice(pickup.address, dropoff.address);
    setPrediction(data);
    setOfferPrice(data.suggestedPrice);
  };

  const handleRequest = async () => {
    const ride: Ride = {
      id: `RF-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      passengerId: store.user.id,
      pickup,
      dropoff,
      offeredPrice: offerPrice,
      currency: store.country.symbol,
      status: RideStatus.REQUESTED,
      timestamp: Date.now(),
      distance: '3.5 km',
      duration: '15 min',
      country: store.country.code
    };
    store.requestRide(ride);
    setIsNegotiating(true);

    setTimeout(async () => {
      const resp = await simulateDriverAcceptance(ride);
      if (resp.accept) {
        store.updateRideStatus(ride.id, RideStatus.ACCEPTED, 'driver_1');
      }
    }, 5000);
  };

  if (store.activeRide) {
    const r = store.activeRide;
    return (
      <div className="h-screen bg-slate-50 flex flex-col relative overflow-hidden">
        <div className="flex-1">
          <InteractiveMap status={r.status} pickup={r.pickup} dropoff={r.dropoff} />
        </div>

        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center space-x-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-xs font-bold text-slate-700">LIVE RIDE: {r.id}</span>
          </div>
          <button className="bg-red-500 text-white p-3 rounded-2xl shadow-lg shadow-red-200 font-bold text-xs uppercase tracking-tighter">SOS</button>
        </div>

        <div className="bg-white p-6 rounded-t-[40px] shadow-2xl border-t border-slate-100 z-30 animate-slideUp">
          <div className="flex justify-between items-start mb-6">
            <div>
               <h3 className="text-2xl font-black text-slate-800 capitalize">{r.status.replace('_', ' ')}</h3>
               <p className="text-sm text-slate-400 font-medium">Arrival in approx 4 mins</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-600">{r.currency}{r.offeredPrice}</span>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Agreed Fare</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-slate-50 rounded-3xl border border-slate-100 mb-6">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=driver`} className="w-14 h-14 rounded-full border-4 border-white shadow-md mr-4" />
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Marco "The Flash" Rossi</h4>
              <div className="flex items-center text-xs text-amber-500 font-black">
                 <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                 4.98 (4,120 rides)
              </div>
            </div>
            <button className="bg-indigo-600 p-4 rounded-2xl text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold">Cancel Ride</button>
             <button 
                onClick={() => store.updateRideStatus(r.id, RideStatus.COMPLETED)}
                className="py-4 rounded-2xl bg-slate-900 text-white font-bold"
             >
               Complete (Demo)
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 relative">
        <InteractiveMap pickup={pickup} dropoff={dropoff} />
        <div className="absolute top-4 left-4 right-4 space-y-3 z-10">
          <div className="bg-white p-5 rounded-[32px] shadow-2xl border border-slate-100">
             <div className="flex items-start space-x-4 pb-4 border-b border-slate-50">
                <div className="w-3 h-3 rounded-full bg-indigo-600 mt-1.5 ring-4 ring-indigo-100"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Pickup</p>
                  <select 
                    className="w-full text-sm font-bold bg-transparent outline-none appearance-none"
                    onChange={(e) => setPickup(MOCK_LOCATIONS.find(l => l.address === e.target.value) || MOCK_LOCATIONS[0])}
                  >
                    {MOCK_LOCATIONS.map(l => <option key={l.address}>{l.address}</option>)}
                  </select>
                </div>
             </div>
             <div className="flex items-start space-x-4 pt-4">
                <div className="w-3 h-3 rounded-full bg-rose-500 mt-1.5 ring-4 ring-rose-100"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Destination</p>
                  <select 
                    className="w-full text-sm font-bold bg-transparent outline-none appearance-none"
                    onChange={(e) => setDropoff(MOCK_LOCATIONS.find(l => l.address === e.target.value) || MOCK_LOCATIONS[1])}
                    defaultValue={MOCK_LOCATIONS[1].address}
                  >
                    {MOCK_LOCATIONS.map(l => <option key={l.address}>{l.address}</option>)}
                  </select>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center mb-6">
           <div>
              <h2 className="text-xl font-black text-slate-800">Your Offer</h2>
              <p className="text-xs text-slate-400 font-medium italic">What's fair for this trip?</p>
           </div>
           <div className="bg-indigo-50 border border-indigo-100 px-6 py-4 rounded-3xl flex items-center space-x-2">
              <span className="text-2xl font-black text-indigo-600">{store.country.symbol}</span>
              <input 
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-20 bg-transparent text-2xl font-black text-indigo-600 outline-none"
              />
           </div>
        </div>

        {prediction && (
          <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start space-x-3">
             <div className="bg-emerald-500 p-2 rounded-xl text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
             </div>
             <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Faisi AI Suggestion</p>
                <p className="text-xs text-emerald-800 font-medium">{prediction.reasoning}</p>
             </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={fetchAIData}
            className="p-5 rounded-3xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center space-x-2 hover:bg-slate-200 transition-all"
          >
            <span>⚡ Analyze Demand</span>
          </button>
          <button 
            onClick={handleRequest}
            className="p-5 rounded-3xl bg-indigo-600 text-white font-black shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Request Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerView;
