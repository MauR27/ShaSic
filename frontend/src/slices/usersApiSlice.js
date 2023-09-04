import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    postData: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/post`,
        method: "POST",
        body: data,
      }),
    }),
    getPostData: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/post`,
        method: "GET",
        body: data,
      }),
    }),
    getUsersData: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "GET",
        body: data,
      }),
    }),
    addComment: builder.mutation({
      query: (data) => {
        return {
          url: `${USERS_URL}/post/${data.values.postId}/comments`,
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
