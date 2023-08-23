import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await fetch(POSTS_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
});

export const addPosts = createAsyncThunk('posts/addPosts', async (postData) => {
  try {
    const response = await fetch(POSTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        // This works instead of having to do spread operator because redux toolkit uses immer js (only inside createSlice)
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedPosts = action.payload.map((post) => {
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        // Immer Js handles concat() so that it doesnt mutate the global store
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
