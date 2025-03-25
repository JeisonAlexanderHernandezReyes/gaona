export interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  code: string;
  image?: string;
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
