import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    fetchAllVideos: builder.query({
      query: () => "/videos",
    }),
    fetchAVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
    fetchRelatedVideos: builder.query({
      query: ({ videoId, title }) => {
        const titleArray = title.split(" ");
        const queryString = titleArray
          .map((title) => `title_like=${title}`)
          .join("&");
        return `/videos?${queryString}&_limit=4&id_ne=${videoId}`;
      },
    }),
  }),
});

export const {
  useFetchAllVideosQuery,
  useFetchAVideoQuery,
  useFetchRelatedVideosQuery,
} = apiSlice;
