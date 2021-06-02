import { createSlice, nanoid } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: [
    {
      id: nanoid(),
      title: "Hello",
      content: "World",
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
  ],
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    addPost: {
      reducer(state, action) {
        state.push(action.payload);
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
});

export const getPostByTitle = (state, title) =>
  state.posts.find((post) => post.title === title);

export const { addPost, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
