
import React from 'react';
import { useStore } from './store/useStore';
import PassengerView from './components/PassengerView';
import DriverView from './components/DriverView';
import AdminView from './components/AdminView';
import AuthScreen from './components/AuthScreen';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const store = useStore();

  if (!store.user) {
    return <AuthScreen onLogin={store.login} />;
  }

  const isAdmin = store.role === 'admin' || store.role === 'superadmin';

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-slate-950' : 'bg-slate-900 flex justify-center'}`}>
      <div className={isAdmin ? 'w-full' : 'mobile-frame w-full relative border-x border-white/5'}>
        {store.role === 'passenger' && <PassengerView store={store} />}
        {store.role === 'driver' && <DriverView store={store} />}
        {isAdmin && <AdminView store={store} />}
        
        {!isAdmin && <Navigation currentRole={store.role} onLogout={store.logout} onSwitch={store.setRole} />}
      </div>
    </div>
  );
};

export default App;
