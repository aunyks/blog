import Post from 'components/Post'

export default function ThoughtsPost(props) {
  return <Post {...props}>{props.children}</Post>
}
