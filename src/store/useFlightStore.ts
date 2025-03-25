import { create } from 'zustand';
import axios from 'axios';

interface Flight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    scheduled: string;
  };
  arrival: {
    airport: string;
    scheduled: string;
  };
  airline: {
    name: string;
  };
  flight: {
    number: string;
  };
}

interface Airport {
  airport_name: string;
  iata_code: string;
  city: string;
  country: string;
}

interface FlightStore {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  fetchFlights: () => Promise<void>;
}

interface AirportStore {
  airports: Airport[];
  loading: boolean;
  error: string | null;
  fetchAirports: () => Promise<void>;
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
  loading: false,
  error: null,
  fetchAirports: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_URL}/airports`, {
        params: {
          access_key: API_KEY,
        },
      });
      set({ airports: response.data.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred while fetching airports',
        loading: false 
      });
    }
  },
})); 