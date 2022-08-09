export type MovieEntity = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  genres: string[];
  actors: string[];
  directors: string[];
  productionCompanies: string[];
  rating: number;
};
