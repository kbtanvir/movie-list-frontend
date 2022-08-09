import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../lib/store/store.basequery";
import { MovieEntity } from "../../models/MovieEntity";

export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery,
  endpoints: builder => ({
    getMovieByID: builder.query<MovieEntity, string>({
      query: id => `movies/${id}`,
    }),
    getAllMovies: builder.query<MovieEntity[], void>({
      query: () => "movies",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieByIDQuery, useGetAllMoviesQuery } = moviesAPI;
