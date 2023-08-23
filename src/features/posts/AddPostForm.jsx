import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPosts } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const selectRef = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const [addingState, setAddingState] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = Boolean(title && content && userId) && addingState === 'idle';

  const onSavePostClicked = async (e) => {
    e.stopPropagation();

    if (canSave) {
      try {
        setAddingState('pending');
        // Unwrap throws an error if addPosts is rejected
        dispatch(addPosts({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        selectRef.current.selectedIndex = 0;
      } catch (error) {
        console.log(error);
      } finally {
        setAddingState('idle');
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
        <label htmlFor="postAuthor">Author:</label>
        <select ref={selectRef} id="postAuthor" name="postAuthor" onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
