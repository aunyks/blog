import Post from 'components/Post'

export default function SecretPostv1({
  title,
  subtitle,
  description,
  date,
  cardImage,
  children,
  remark
}) {
  console.log('rendering')
  return (
    <Post
      title={title}
      subtitle={subtitle}
      description={description}
      date={date}
      cardImage={cardImage}
      remark={remark || (
        <></>
      )}>
      <p className="text-xs select-none">
        <em>
          This is a secret post (version 1). To decrypt it, copy the ciphertext and paste it between the single quotes <a target="_blank" href="https://repl.it/@aunyks/secretposts-v1-decrypt#main.sh">here</a>.
        </em>
      </p>
      <h3 className="select-none">Ciphertext</h3>
      <p className="break-words">
        {children}
      </p>
    </Post>
  )
}