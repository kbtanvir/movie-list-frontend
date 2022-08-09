import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieEntity } from "../../models/MovieEntity";

// Define a service using a base URL and expected endpoints
export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: builder => ({
    getMovieByID: builder.query<MovieEntity, string>({
      query: id => `pokemon/${id}`,
    }),
    getAllMovies: builder.query<MovieEntity[], void>({
      query: () => "movies",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetMovieByIDQuery, useGetAllMoviesQuery } = moviesAPI;
