export interface Airport {
  airport_id: string;
  airport_name: string;
  city_iata_code: string;
  country_iso2: string;
  country_name: string;
  geoname_id: string;
  gmt: string;
  iata_code: string;
  icao_code: string;
  id: string;
  latitude: string;
  longitude: string;
  phone_number?: string | null;
  timezone: string;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  origin: {
    code: string;
    city: string;
  };
  destination: {
    code: string;
    city: string;
  };
  departureTime: string;
  arrivalTime: string;
  airline: string;
  status: "OnTime" | "Delayed" | "Boarding" | "Cancelled" | "Landed";
  price?: number;
}
