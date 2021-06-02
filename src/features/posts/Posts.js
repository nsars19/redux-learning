import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { ReactionButtons } from "./../../ReactionButtons";
import React, { useEffect } from "react";
import { getAllPosts, fetchPosts } from "./postSlice";

export function Posts() {
  const posts = useSelector(getAllPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const postItems = (
    <ul>
      {posts.map((post) => (
        <li key={nanoid()}>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          {/* <ReactionButtons post={post} /> */}
        </li>
      ))}
    </ul>
  );

  let content;

  if (postStatus === "loading") {
    content = <h1>Loading...</h1>;
  } else if (postStatus === "succeeded") {
    content = postItems;
  } else if (postStatus === "failed") {
    content = <h1>{error}</h1>;
  }

  return <>{content}</>;
}
