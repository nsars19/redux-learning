import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch("https://frozen-thicket-71687.herokuapp.com/posts");
  const data = await res.json();
  return data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post._id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const newPosts = action.payload.map((post) => ({
        ...post,
        reactions: {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        },
      }));

      state.posts = state.posts.concat(newPosts);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
export const getAllPosts = (state) => state.posts.posts;
export const getPostByTitle = (state, title) =>
  state.posts.find((post) => post.title === title);

export const { addPost, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
