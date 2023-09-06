import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    postData: builder.mutation({
      query: (data) => ({
        url: `/post`,
        method: "POST",
        body: data,
      }),
    }),
    getPostData: builder.mutation({
      query: (data) => ({
        url: `/post`,
        method: "GET",
        body: data,
      }),
    }),
    getUsersData: builder.mutation({
      query: (data) => ({
        url: `/auth`,
        method: "GET",
        body: data,
      }),
    }),
    addComment: builder.mutation({
      query: (data) => {
        return {
          url: `/post/${data.values.postId}/comments`,
          method: "POST",
          body: data.values,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  usePostDataMutation,
  useGetPostDataMutation,
  useGetUsersDataMutation,
  useAddCommentMutation,
  useUpdatePostLikesMutation,
} = usersApiSlice;
