import React from 'react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AirportInformation from '@/components/airport/AirportInformation'
import { useRouter, useSearchParams } from 'next/navigation';

// Mock next/navigation
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  useSearchParams: () => ({
    get: () => null
  }),
}));

// Mock the components that are rendered based on tabs
jest.mock('@/components/airport/General', () => {
  return function MockGeneral({ airport }: { airport: any }) {
    return (
      <div>
        <h2>Información General - {airport.airport_name}</h2>
      </div>
    );
  };
});

jest.mock('@/components/airport/Ubication', () => {
  return function MockUbication({ airport }: { airport: any }) {
    return (
      <div>
        Ubicación Tab - {airport.airport_name}
      </div>
    );
  };
});

jest.mock('@/components/airport/ZoneTime', () => {
  return function MockZoneTime({ airport }: { airport: any }) {
    return (
      <div>
        Zona Horaria Tab - {airport.airport_name}
      </div>
    );
  };
});

const mockAirport = {
  airport_name: "Anaa",
  iata_code: "AAA",
  // Add other required airport properties as needed
};

describe('AirportInformation', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset all mocks
    jest.clearAllMocks();
    mockBack.mockClear();
    
    // Reset window size
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  it('displays error when no airport data is found', async () => {
    render(<AirportInformation />);
    await waitFor(() => {
      expect(screen.getByText(/Airport information not found/i)).toBeInTheDocument();
    });
  });

  it('loads and displays airport data from localStorage', async () => {
    localStorage.setItem('selectedAirport', JSON.stringify(mockAirport));
    render(<AirportInformation />);
    
    await waitFor(() => {
      expect(screen.getByText(mockAirport.airport_name)).toBeInTheDocument();
      expect(screen.getByText(`(${mockAirport.iata_code})`)).toBeInTheDocument();
    });
  });

  it('switches between tabs correctly', async () => {
    localStorage.setItem('selectedAirport', JSON.stringify(mockAirport));
    render(<AirportInformation />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('general-tab')).toBeInTheDocument();
    });

    // Switch to Ubicación tab
    fireEvent.click(screen.getByRole('button', { name: /ubicación/i }));
    expect(screen.getByTestId('ubicacion-tab')).toBeInTheDocument();

    // Switch to Zona Horaria tab
    fireEvent.click(screen.getByRole('button', { name: /zona horaria/i }));
    expect(screen.getByTestId('zona-horaria-tab')).toBeInTheDocument();
  });

  
}); 