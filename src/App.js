import './App.css';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Redux Toolkit.</p>
      </header>
      <main>
        <AddPostForm />
        <PostsList />
      </main>
    </div>
  );
}

export default App;
