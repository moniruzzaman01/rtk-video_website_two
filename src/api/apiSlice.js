import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["videos", "video"],
  endpoints: (builder) => ({
    fetchAllVideos: builder.query({
      query: () => "/videos",
      providesTags: ["videos"],
    }),

    fetchAVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, error, arg) => [{ type: "video", id: arg }],
    }),

    fetchRelatedVideos: builder.query({
      query: ({ videoId, title }) => {
        const titleArray = title.split(" ");
        const queryString = titleArray
          .map((title) => `title_like=${title}`)
          .join("&");
        return `/videos?${queryString}&_limit=4&id_ne=${videoId}`;
      },
      providesTags: (result, error, arg) => [
        { type: "relatedVideos", id: arg.videoId },
      ],
    }),

    addAVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),

    editAVideo: builder.mutation({
      query: ({ videoId, data }) => ({
        url: `videos/${videoId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "video", id: arg.videoId },
        { type: "relatedVideos", id: arg.videoId },
      ],
    }),
  }),
});

export const {
  useFetchAllVideosQuery,
  useFetchAVideoQuery,
  useFetchRelatedVideosQuery,
  useAddAVideoMutation,
  useEditAVideoMutation,
} = apiSlice;
