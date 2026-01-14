
export type UserRole = 'passenger' | 'driver' | 'admin' | 'superadmin';

export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  taxRate: number;
  baseFare: number;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export enum RideStatus {
  REQUESTED = 'requested',
  BIDDING = 'bidding',
  ACCEPTED = 'accepted',
  ARRIVED = 'arrived',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: Location;
  dropoff: Location;
  offeredPrice: number;
  currency: string;
  status: RideStatus;
  timestamp: number;
  distance: string;
  duration: string;
  country: string;
  rating?: number;
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  role: UserRole;
  avatar: string;
  country: string;
  verified: boolean;
  rating?: number;
  totalRides?: number;
  walletBalance?: number;
}
