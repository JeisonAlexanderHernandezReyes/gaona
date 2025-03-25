import { create } from 'zustand';
import axios from 'axios';
import { Airport, Flight } from '@/types';

interface AirportStore {
  airports: Airport[];
  selectedAirport: Airport | null;
  loading: boolean;
  error: string | null;
  fetchAirports: () => Promise<void>;
  fetchAirportByIATA: (iataCode: string) => Promise<void>;
}

interface FlightStore {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  fetchFlights: () => Promise<void>;
}

const API_KEY = 'd873f362ab68a7be72ee44d91a79530b';
const API_URL = 'https://api.aviationstack.com/v1';

export const useFlightStore = create<FlightStore>((set) => ({
  flights: [],
  loading: false,
  error: null,
  fetchFlights: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_URL}/flights`, {
        params: {
          access_key: API_KEY,
        },
      });
      set({ flights: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred while fetching flights',
        loading: false
      });
    }
  },
}));

export const useAirportStore = create<AirportStore>((set) => ({
  airports: [],
  selectedAirport: null,
  loading: false,
  error: null,
  fetchAirports: async () => {
    try {
      set({ loading: true, error: null });

      // Set pagination parameters
      const params = {
        access_key: API_KEY,
        limit: 6710
      };

      const response = await axios.get(`${API_URL}/airports`, { params });

      // Validate response structure
      if (response.data && Array.isArray(response.data.data)) {
        set({ airports: response.data.data, loading: false });
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching airports:', error);
      set({
        error: error instanceof Error ? error.message : 'An error occurred while fetching airports',
        loading: false
      });
    }
  },
  fetchAirportByIATA: async (iataCode: string) => {
    try {
      set({ loading: true, error: null });

      const params = {
        access_key: API_KEY,
        iata_code: iataCode
      };

      const response = await axios.get(`${API_URL}/airports`, { params });

      // Validate response structure
      if (response.data && Array.isArray(response.data.data)) {
        if (response.data.data.length > 0) {
          set({
            selectedAirport: response.data.data[0],
            airports: [response.data.data[0]], // Update the airports list with just this one
            loading: false
          });
        } else {
          throw new Error(`No airport found with IATA code: ${iataCode}`);
        }
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error(`Error fetching airport with IATA code ${iataCode}:`, error);
      set({
        error: error instanceof Error ? error.message : `An error occurred while fetching airport with IATA code: ${iataCode}`,
        loading: false
      });
    }
  }
}));