import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPost } from "./postSlice";

export function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const dispatchPost = (e) => {
    e.preventDefault();

    dispatch(addPost(title, content));

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={dispatchPost}>
      <label htmlFor="postTitle">Title</label>
      <input
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={onTitleChange}
      />
      <label htmlFor="postContent">Content</label>
      <input
        id="postContent"
        name="postContent"
        value={content}
        onChange={onContentChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
