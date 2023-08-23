import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <PostAuthor userId={post.userId} />
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
