export interface Location {
  id: string;
  address: string;
  latitude?: number;
  longitude?: number;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  startDate?: Date;
  endDate?: Date;
  price?: number;
} 