import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import postsReducer from "./features/posts/postSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
});
