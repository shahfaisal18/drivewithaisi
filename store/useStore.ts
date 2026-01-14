
import { useState, useCallback } from 'react';
import { User, Ride, UserRole, RideStatus, CountryConfig } from '../types';
import { SUPPORTED_COUNTRIES, MOCK_LOCATIONS } from '../constants';

export const useStore = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('passenger');
  const [country, setCountry] = useState<CountryConfig>(SUPPORTED_COUNTRIES[0]);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [allRides, setAllRides] = useState<Ride[]>([]);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);

  const login = (phone: string, selectedRole: UserRole, selectedCountry: string) => {
    const countryData = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      phone,
      name: phone.split('-')[0] || 'User',
      role: selectedRole,
      country: selectedCountry,
      verified: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
      walletBalance: selectedRole === 'driver' ? 500 : 50,
    };
    setUser(newUser);
    setRole(selectedRole);
    setCountry(countryData);
    logAction(`User ${newUser.id} logged in as ${selectedRole} in ${selectedCountry}`);
  };

  const logAction = (msg: string) => {
    setSystemLogs(prev => [ `${new Date().toLocaleTimeString()}: ${msg}`, ...prev.slice(0, 49) ]);
  };

  const logout = () => {
    setUser(null);
    setActiveRide(null);
  };

  const requestRide = (ride: Ride) => {
    setActiveRide(ride);
    setAllRides(prev => [ride, ...prev]);
    logAction(`New ride requested: ${ride.id}`);
  };

  const updateRideStatus = (id: string, status: RideStatus, driverId?: string) => {
    setActiveRide(prev => {
      if (prev && prev.id === id) {
        const updated = { ...prev, status, driverId: driverId || prev.driverId };
        if (status === RideStatus.COMPLETED) {
          logAction(`Ride ${id} completed.`);
          return null;
        }
        return updated;
      }
      return prev;
    });

    setAllRides(prev => prev.map(r => r.id === id ? { ...r, status, driverId: driverId || r.driverId } : r));
  };

  return {
    user,
    role,
    country,
    activeRide,
    allRides,
    systemLogs,
    login,
    logout,
    requestRide,
    updateRideStatus,
    setRole,
    setCountry
  };
};
