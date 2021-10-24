import VideoPost from 'components/VideoPost'

export default function OnBalance() {
  return (
    <VideoPost
      title="Making a Dual PS5 Controller Stand"
      description="Exploring balance as a natural law and how it governs life and nature."
      date="2021-04-12"
      src="/videos/making-a-dual-ps5-controller-stand/making-a-dual-ps5-controller-stand.mp4"
      poster="/videos/making-a-dual-ps5-controller-stand/making-a-dual-ps5-controller-stand.jpg"
      links={{
        'YouTube': 'https://www.youtube.com/watch?v=2UlX9Y-jH5o'
      }}
      timestamps={{
        '0:00': 'Intro & What We\'ll Be Making',
        '0:06': 'Modeling',
        '3:23': 'Slicing',
        '5:42': 'Printing',
        '5:49': 'Reviewing Final Output'
      }}>
      <style jsx>{`
        li {
          list-style-type: none;
        }
        `}</style>
      <p>
        Spent a day designing and 3D printing a stand for my Dualsense controllers. It's my first time modeling
        and printing something from start to finish. It's not perfect, but it looks pretty good and definitely gets the job done.
        </p>
      <p>
        Design inspired by <a href="https://www.thingiverse.com/3dxia/designs">3DXIA</a>.
        </p>
      <p>
        Music:<br />
        <ul>
          <li>See You In My Dreams - After The Fall</li>
          <li>The Feelings - STEESH</li>
        </ul>
      </p>
    </VideoPost>
  )
}