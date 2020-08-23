import Post from 'components/Post'
import Hint from 'components/Hint'

export default () => (
  <Post
    title="To Be American Is To Rebel"
    subtitle="The Constant Fight Against Tyranny"
    description="Recounting the inspiration and process for designing my first credit card."
    date="2020-08-23"
    remark={(
      <>
        This is a short post purposefully lacking detail. If you wish to discuss this further, I may be willing to do so on <a href="https://twitter.com/aunyks">Twitter</a>.
        Thanks for reading.
      </>
    )}>
    <p>
      As American children grow up, we're indoctrinated in the American ideas of freedom and liberty. We're told that the Constitution, Bill of Rights, and always-growing list of amendments delivers them from any form of <Hint msg={`A more modern equivalent of the word "tyranny" is "oppression".`}>tyranny</Hint> that the government could impose.
      Should we be dissatisfied with the status of their government, we know to wield our democratic power to cause the change they want to see.
      </p>
    <p>
      We learn that the founders of the country fought for these "inalienable" rights and that any time some government tries to infinge on them we must fight hard to reject it. We're told to look back at the founders and remind ourselves of the valor we should have in the face of tyranny.
    </p>
    <p>
      We're told that, throughout the history of our country, these values of freedom have always been upheld and have, in many cases, expanded to include previously underrepresented groups.
      We love this freedom so much that we have great patriotism and passion for this country.
    </p>
    <p>
      When we see the current events occurring in the country, many of the same patriots can be found critiquing and demonizing protestors. They call these fighters "rioters", "anarchists", and "thieves" in an attempt to make their acts appear to be morally ruinous.
      They suggest that law enforcement use "any means necessary" policies when trying to suppress protests. They want the government to infringe on these people's rights to prevent property damage and disruption to nearby individuals and businesses.
    </p>
    <p>
      But, this is where the cognitive dissonance starts. If put in the conditions of the American revolution, these same patriots would be furious with the revolutionaries of the time. They'd call them the same names and want the British troops stationed in the colonies
      to quell any troublesome activity. As a matter of fact, those loyal to the crown did just that. Some loyalists went so far as to assist the British military in fighting the revolutionaries.
    </p>
    <p>
      Does that sound familiar? Supporting a government so much that you're willing to support its acts of tyranny against fellow citizens is something that not only loyalists did but also so-called "patriots" do. This is not to say that each time a group causes good trouble
      they're trying to secede from the country and start anew. This is to say that causing trouble to see a better future is inherently American, by any means necessary like the founders of our country believed.
    </p>
    <p>
      To be American is to fight for a better future. To be American is to rebel.
    </p>
  </Post>
)