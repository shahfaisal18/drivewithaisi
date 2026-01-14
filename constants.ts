
import { CountryConfig, Location } from './types';

export const SUPPORTED_COUNTRIES: CountryConfig[] = [
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', taxRate: 0.08, baseFare: 5 },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', taxRate: 0.20, baseFare: 4 },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', symbol: '₨', taxRate: 0.15, baseFare: 200 },
  { code: 'AE', name: 'UAE', currency: 'AED', symbol: 'د.إ', taxRate: 0.05, baseFare: 12 },
];

export const MOCK_LOCATIONS: Location[] = [
  { lat: 40.7128, lng: -74.0060, address: "Times Square, New York" },
  { lat: 40.7580, lng: -73.9855, address: "Central Park, New York" },
  { lat: 51.5074, lng: -0.1278, address: "Trafalgar Square, London" },
  { lat: 25.2048, lng: 55.2708, address: "Burj Khalifa, Dubai" },
];

export const BRAND_COLORS = {
  primary: '#4F46E5', // Indigo
  secondary: '#0F172A', // Deep Slate
  accent: '#10B981', // Emerald
  danger: '#EF4444', // Rose
  warning: '#F59E0B', // Amber
};
