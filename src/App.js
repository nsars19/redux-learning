import { Counter } from "./features/counter/Counter";
import { Posts } from "./features/posts/Posts";
import { PostForm } from "./features/posts/PostForm";

function App() {
  return (
    <div className="App">
      <PostForm />
      <Posts />
    </div>
  );
}

export default App;
