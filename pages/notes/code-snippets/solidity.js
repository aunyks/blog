import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function SolidityCodeSnippets() {
  return (
    <CodeSnippetPost
      title="Solidity Code Snippets"
      description="Useful bites of Solidity code that I often write and rewrite."
      hasCodeSnippet
    >
      <p>
        Remember to use audited code whenever you can, like <a target="_blank" href="https://openzeppelin.com/contracts">OpenZeppelin's contracts</a>, for example.
        If you want a quick IDE that you can use now, use <a target="_blank" href="https://remix.ethereum.org">Remix</a>! Tutorialspoint has a great <a target="_blank" href="https://www.tutorialspoint.com/solidity/index.htm">lesson in
          Solidity</a> for beginners with some prior coding experience.
      </p>
      <CodeSnippet title="Simple ERC20 Token">
        <p>
          A simple contract for creating a <Hint msg="Something being fungible means that every copy of it is exactly like the others and can be used and interchanged as such. My $1 bill can be used everywhere your $1 bill can, so the $1 is fungible. A token being fungible means that every token is the same and can be used as such.">fungible</Hint> token that follows
          the <a target="_blank" href="https://github.com/ethereum/eips/issues/20">ERC20</a> standard. It makes 1,000,000 tokens with up to 18 decimal places, token name "MyToken", and symbol "TKN". Upon creation / deployment, it grants the deploying wallet the entire supply.
        </p>
        <CodeBlock lang="solidity">{`
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.1/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "TKN") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
`}</CodeBlock>
      </CodeSnippet>
    </CodeSnippetPost>
  )
}