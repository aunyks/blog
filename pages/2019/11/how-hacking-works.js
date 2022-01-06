import Post from 'components/Post'

export default function HowHackingWorks() {
  return (
    <Post title="How Hacking Works" date="2019-11-20">
      <p>
        For almost a year, I've had lots of people ask me how I "do my hacking".
        And, for the longest time I haven't been able to provide them with a
        good answer. Honestly, it wasn't until a few days ago that I think I've
        nailed down my (typical) steps to doing security research.
      </p>
      <h3>What is security research?</h3>
      <p>
        Often referred to as "hacking", I define security research as the
        discovery and exploitation of vulnerabilities found in a target's
        products or services. This research can closely resemble that of
        academic research or be more amorphous in nature.
      </p>
      <p>
        To the masses, all kinds of security research is or leads to "hacking",
        but to individuals in technology hacking could mean a myriad of other
        things.
      </p>
      <h3>My research workflow</h3>
      <p>
        I love how the{' '}
        <a href="https://www.metasploit.com/">Metasploit Framework</a> outlines
        research.
      </p>
      <img
        width="300"
        src="https://2.bp.blogspot.com/-pcii66AQeo0/WIsByzcvH-I/AAAAAAAAChw/aVlCPu8ZuUMO-0ZVotX_O7BOf2mbLfjQQCLcB/s1600/3.jpg"
        alt="The Metasploit Framework outlines security research with the steps: recon, exploit, payload, and loot."
      />
      <p>
        Not only is "Recon, Exploit, Payload, Loot" pretty catchy and badass, I
        think it pretty succinctly and accurately describes most of the
        non-academic forms of security research. Let's discuss what each step is
        and how they can apply to real life.
      </p>
      <h3>1 - Recon</h3>
      <img
        alt="A woman looking around."
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2F667a0bcc55a1275fdb92ad6e6c933825%2Ftenor.gif%3Fitemid%3D9553729&f=1&nofb=1"
      />
      <p>
        Short for reconnaissance, recon is the act of finding a target and
        collecting as much information about it as possible. It's at this point
        that you'll not only be trying your best to map out the target's
        infrastructure, behavior, and possible weak links in the two but also
        you'll try to match what you find with known attacks that are enabled by
        your findings.
      </p>
      <h3>2 - Exploit</h3>
      <img
        alt="A man scratching his chin thinking."
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F3oKIP9uJqdNt9jRrCU%2Fgiphy.gif&f=1&nofb=1"
      />
      <p>
        Once you've found a vulnerability in the target's infrastructure or
        practices that may appear interesting, you must try to exploit it. What
        does that mean, though? At this point you must ask yourself what
        attacks, or <i>exploits</i>, against your target can be achieved given
        the vulnerabilities that you've found during the recon step.
      </p>
      <h3>3 - Payload</h3>
      <img
        alt="A man hammering metal to forge a sword."
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.makeagif.com%2Fmedia%2F5-04-2015%2FKHEbRE.gif&f=1&nofb=1"
      />
      <p>
        After you've come up with possible ways to exploit the vulnerabilities
        you've found in your target, you need to craft a payload that will
        perform your desired attack on the target. A payload is an action that
        you perform on the target or an item that you give to the target which
        takes advantage of the vulnerability you've found in the target.
        Applying a payload to the target is typically called "dropping" the
        payload.
      </p>
      <p>
        After using the payload to exploit the vulnerabilities in your target,
        you must observe the effects of your actions. Did the attack succeed? If
        so, you can advance to the next step. If not, you need to craft another
        payload that will have an effect on the target or go back to step 1 or
        2.
      </p>
      <h3>4 - Loot</h3>
      <img
        alt="A man clapping to celebrate."
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.gfycat.com%2FShowyAromaticArrowana-size_restricted.gif&f=1&nofb=1"
      />
      <p>
        Now that your attack has succeeded, you've likely acquired information
        that shouldn't normally be in your possession or broken infrastructure
        important to the target's operation. At this point in time, what you do
        is dependent on your intentions.
      </p>
      <p>
        If you're a good, or white hat, hacker, you'll likely report your
        findings to the target in an effort to see them fix the vulnerabilities
        you've found so they can no longer be exploited. If you're a bad, or
        black hat, hacker, you'll likely report or sell your findings to other
        malicious individuals if you're not already a part of a motivated group
        like an{' '}
        <a href="https://en.wikipedia.org/wiki/Advanced_persistent_threat">
          Advanced Persistent Threat
        </a>
        .
      </p>
      <h3>Research in Action</h3>
      <p>
        Let's take computers out of the picture and walk through doing security
        research on a target offline, with locks and doors and stuff!
      </p>
      <h4>Recon</h4>
      <p>
        You find out that 123 Bank has a good relationship with white hat
        hackers and has a{' '}
        <a href="https://en.wikipedia.org/wiki/Bug_bounty_program">
          bug bounty program
        </a>
        . You visit their headquarters and notice all the doors and windows in
        the building and observe how and when both employees and customers enter
        and exit the building, how long they're in the building at a time, etc.
      </p>
      <p>
        You notice that employees get access to a vault that lives behind a
        locked door. They all have keys to the lock and simply use those to
        unlock the door. The door is out in the open, so it wouldn't be
        suspicious if you messed with it. You recall that{' '}
        <em>most locks can be picked with normal lockpicking sets</em>, so the
        lock is a potential security vulnerability.
      </p>
      <h4>Exploit</h4>
      <p>
        The lock seems pickable, which is a vulnerability that can be exploited
        using a lockpick.
      </p>
      <h4>Payload</h4>
      <p>
        The next time you visit the headquarters, you walk in with your
        lockpicking set like you're a customer. You find the vault door and use
        your lockpicking skills to successfully open the door. In this case, the
        payload is your lockpicking set.
      </p>
      <h4>Loot</h4>
      <p>
        You successfully picked the lock to the door and entered the vault. Now
        that you have access to a restricted area, you could steal money or
        other valuable assets and information. Because you're a white hat
        hacker, you walk back out of the door, lock it back, and proceed with
        your day.
      </p>
      <p>
        Later, you inform the security team at 123 Bank that you were able to
        access the vault and tell them how you did it in addition to how they
        can prevent people from doing so in the future.
      </p>
      <p>Because they have a bug bounty program, they paid you some money!</p>
      <h3>Caveats</h3>
      <p>
        Although some non-academic security research does run this smoothly, it
        won't always be this straightforward. What if the HQ didn't have a
        vault? Then your recon might not have been as meaningful. What if they
        had enhanced locks to make it more difficult to open the vault door?
        Then you'd need a more complex exploit. And if the lock happened to be
        really tight and poorly made? Then you might've needed a different
        lockpicking set (ie payload). And if access to the door was guarded or
        closely monitored, you might've needed a much more complex series of
        exploits to get through the door.
      </p>
      <p>
        It's when your research isn't as straightforward as you predict that a
        researcher may find themselves using their creativity and
        problem-solving skills to successfully attack a target. Sometimes, this
        is what separates the more experienced hackers from the less
        experienced.
      </p>
      <h3>To wrap up</h3>
      <p>
        While security research can mean many things to different people and can
        be performed in a number of ways, I find that security research outside
        of academia can be broken down into reconnaissance, exploitation,
        dropping a payload, and looting or seeing results. These steps can be
        applied to several aspects of security such as physical{' '}
        <a href="https://en.wikipedia.org/wiki/Penetration_test">
          penetration testing
        </a>{' '}
        (breaking into physical places) and computer and network hacking.
      </p>
    </Post>
  )
}
