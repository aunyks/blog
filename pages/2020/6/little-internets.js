import Post from 'components/Post'

export default function LittleInternets() {
  return (
    <Post
      title="Little Internets"
      description="Understanding next-gen cloud networks"
      date="2020-06-07"
      cardImage="https://blog.aunyks.com/img/tech/little-internets.png">
      <p>
        After reading the websites of next-generation cloud computing companies
        like Vercel, Cloudflare, and Fastly, you may see the word "Edge" appear
        pretty often. "At the Edge" this, "To the Edge" that. When they say
        mention the Edge, are they referring to the edge of the Internet?
      </p>
      <p>
        When I first saw that term being used, I got confused as I thought it
        was a reference to the Internet, where the Edge of the network is
        essentially all computers not owned by Internet Service Providers, like
        our phones and laptops in addition to any web servers, file servers, and
        more. The Edge of the Internet differs from the Core, which consists of
        cell towers, routers, switches, autonomous systems, and more systems
        owned by ISPs that own almost all of the <i>core</i> network
        functionality of the Internet. The Core is often called the network's
        backbone.
      </p>
      <figure className="my-5">
        <img
          className="w-full lg:w-1/2"
          src="/img/tech/inet-core-and-edge.gif"
          alt="Eight computers are split into groups of four. The first group is at the top left of the image, and the second group is at the bottom right of the image. Each group is connected to an Edge Router. Both Edge Routers are connected to a group of Core Routers that, themselves, are interconnected ontop of a blue area. The computers in the red areas are connected to each other by the routers in the blue area. The red is the Edge. The blue is the Core."
        />
        <figcaption className="w-full lg:w-1/2 text-xs mx-auto">
          This is a simplified model of the Internet. The red areas are the
          edge. The blue area is the core.
        </figcaption>
      </figure>
      <p>
        "Of course my stuff will be at the Edge. It wouldn't be doing much of
        anything at the Core," I thought. Later I found out, though, that these
        companies are referring to the edges of <i>their own</i> networks. This
        led me to believe that these companies also have cores to their networks
        (which they do).
      </p>
      <p>
        This is a pretty interesting concept, and it's a somewhat
        straightforward one that nobody ever told me about. These companies
        structure their networks like the Internet, where there's a core of the
        network that functions almost like a brain and is exclusive to the
        owners and operators of the network and an edge of the network where
        users or customers can do what they want. They're like little Internets!
      </p>
      <h2>In Conclusion</h2>
      <p>
        These newer models of cloud computing are called edge computing. The
        edges of their networks are servers in datacenters spread all over the
        world. Ideally, one of their servers is much closer to some user of your
        software than a server that you'd self-host or operate in one cloud
        location. The core of their networks coordinate the publishing of your
        apps to their global network. So, the companies essentially sell speed
        and availability and continue to innovate in these areas.
      </p>
    </Post>
  )
}
