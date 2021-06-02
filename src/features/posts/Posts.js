import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { ReactionButtons } from "./../../ReactionButtons";
import React from "react";
import { getAllPosts } from "./postSlice";

export function Posts() {
  const posts = useSelector(getAllPosts);

  const postItems = (
    <ul>
      {posts.map((post) => (
        <li key={nanoid()}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <ReactionButtons post={post} />
        </li>
      ))}
    </ul>
  );

  return <>{postItems}</>;
}
