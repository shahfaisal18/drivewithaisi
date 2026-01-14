
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { SUPPORTED_COUNTRIES } from '../constants';
import InteractiveMap from './InteractiveMap';

const data = [
  { name: 'Mon', revenue: 4200, users: 120 },
  { name: 'Tue', revenue: 3800, users: 140 },
  { name: 'Wed', revenue: 5600, users: 210 },
  { name: 'Thu', revenue: 8900, users: 450 },
  { name: 'Fri', revenue: 12400, users: 800 },
  { name: 'Sat', revenue: 15600, users: 1200 },
  { name: 'Sun', revenue: 11000, users: 950 },
];

interface AdminViewProps {
  store: any;
}

const AdminView: React.FC<AdminViewProps> = ({ store }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'regions' | 'fraud' | 'logs' | 'live_map'>('overview');

  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Super Admin Navigation */}
      <div className="w-72 bg-slate-900 border-r border-white/5 p-8 flex flex-col">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <span className="font-black text-xl text-white tracking-tighter">FAISI CENTRAL</span>
        </div>

        <nav className="flex-1 space-y-2">
          {['overview', 'regions', 'live_map', 'fraud', 'logs'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all capitalize font-bold text-sm ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-white/5 text-slate-400'}`}
            >
               <span className="capitalize">{tab.replace('_', ' ')}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Logged in as</p>
           <div className="flex items-center space-x-3">
              <img src={store.user.avatar} className="w-8 h-8 rounded-full border border-white/10" />
              <div className="truncate">
                <p className="text-xs font-bold text-white">Super Admin</p>
                <p className="text-[10px] text-slate-500">ID: FA-001</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-8 flex justify-between items-center border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
           <div>
              <h2 className="text-3xl font-black text-white tracking-tight capitalize">{activeTab.replace('_', ' ')}</h2>
              <p className="text-sm text-slate-500">Global monitoring across {SUPPORTED_COUNTRIES.length} regions.</p>
           </div>
           <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500">SYSTEM HEALTH</p>
                <p className="text-emerald-400 font-black text-lg">99.98%</p>
              </div>
              <button onClick={store.logout} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-rose-500 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </button>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'live_map' && (
            <div className="h-[600px] w-full bg-slate-900 rounded-[32px] overflow-hidden border border-white/10 relative">
               <InteractiveMap />
               <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur p-4 rounded-2xl border border-white/10 z-20">
                  <div className="flex items-center space-x-3 mb-2">
                     <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                     <span className="text-xs font-bold">42 Active Pickups</span>
                  </div>
                  <div className="flex items-center space-x-3">
                     <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                     <span className="text-xs font-bold">128 Drivers Online</span>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'Global Gross Revenue', value: '$842,500', trend: '+18.4%' },
                  { label: 'Active Sessions', value: '4,120', trend: '+5.1%' },
                  { label: 'Pending Approvals', value: '12', trend: '-2' },
                  { label: 'Server Latency', value: '24ms', trend: 'Stable' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-sm">
                    <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                    <p className={`text-xs mt-3 font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>{stat.trend}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 border border-white/5 p-8 rounded-[32px]">
                <h4 className="text-xl font-black text-white mb-8">Revenue Growth (Global)</h4>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12}} />
                      <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                      <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'regions' && (
            <div className="grid grid-cols-2 gap-6">
              {SUPPORTED_COUNTRIES.map(c => (
                <div key={c.code} className="bg-slate-900 border border-white/5 p-6 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl font-black">
                      {c.code}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white">{c.name}</h4>
                      <p className="text-sm text-slate-500">Tax: {c.taxRate * 100}% | Base: {c.symbol}{c.baseFare}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                     <button className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all">Configure</button>
                     <button className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-500 transition-all">Lock</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'logs' && (
             <div className="bg-slate-900 border border-white/5 rounded-[32px] overflow-hidden">
                <div className="p-6 bg-white/5 border-b border-white/5 font-black text-white">SYSTEM AUDIT TRAIL</div>
                <div className="divide-y divide-white/5">
                  {store.systemLogs.map((log: string, idx: number) => (
                    <div key={idx} className="p-4 flex items-center space-x-4 hover:bg-white/5 transition-all">
                       <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                       <p className="text-xs font-mono">{log}</p>
                    </div>
                  ))}
                  {store.systemLogs.length === 0 && (
                    <div className="p-20 text-center text-slate-500 italic">No events recorded in this session.</div>
                  )}
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminView;
