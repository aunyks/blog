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
        If you want a quick IDE that you can use <em>right now</em> for developing, testing, and / or deploying, use <a target="_blank" href="https://remix.ethereum.org">Remix</a>! Tutorialspoint has a great <a target="_blank" href="https://www.tutorialspoint.com/solidity/index.htm">lesson in
          Solidity</a> for beginners with some prior coding experience.
      </p>
      <p>
        For contracts where certain addresses have privileges, consider using OZ's <a href="https://docs.openzeppelin.com/contracts/4.x/access-control#using-access-control" target="_blank">AccessControl</a> contract.
      </p>
      <CodeSnippet title="Hi-Voltage Token v1">
        <p>
          The source code for $HV1, my first personal token.
        </p>
        <CodeBlock lang="solidity">{`
// SPDX-License-Identifier: GPL-v3.0

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol';
import 'delegated-transfer-token/contracts/DTT.sol';

contract HiVoltageToken is Ownable, ERC20Snapshot, DTT {
    constructor(
        string memory name,
        string memory symbol,
        // Number of whole tokens to mint
        uint256 initialTokenSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialTokenSupply * (10 ** uint256(decimals())));
    }
    
    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return hasDTTInterface(interfaceId);
    }
    
    function takeSnapshot() public onlyOwner {
        _snapshot();
    } 
    
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Simple ERC1155 Token">
        <p>
          A simple contract for quickly creating a <Hint msg="ERC1155 tokens are more often called semi-fungible tokens, because they're fungible like ERC20 tokens but hold metadata about each token like ERC721 tokens. I call them fungible data tokens, since being fungible and simultaneously containing metadata are what makes them unique.">fungible data token</Hint> that
          follows the <a target="_blank" href="https://eips.ethereum.org/EIPS/eip-1155">ERC1155</a> standard.  It makes 10<sup>18</sup> Health Boost tokens and 10<sup>27</sup> Elite Skin tokens that can be used in video games. Metadata about each of these tokens can be found at <code>{"https://example.com/item/{id}.json"}</code>, where
          <code>{"{id}"}</code> is <Hint msg="0 in the case of the Health Boost, 1 in the case of the Elite Skin">the ID number of the token for which metadata is being requested</Hint>.
        </p>
        <CodeBlock lang="solidity">{`
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.2/contracts/token/ERC1155/ERC1155.sol";

contract FungibleDataToken is ERC1155 {
    uint256 public constant HEALTH_BOOST = 0;
    uint256 public constant ELITE_SKIN = 1;

    constructor() ERC1155("https://example.com/item/{id}.json") {
        _mint(msg.sender, HEALTH_BOOST, 10**18, "");
        _mint(msg.sender, ELITE_SKIN, 10**27, "");
    }
}
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Simple ERC20 Token">
        <p>
          A simple contract for quickly creating a <Hint msg="Something being fungible means that every copy of it is exactly like the others and can be used and interchanged as such. My $1 bill can be used everywhere your $1 bill can, so the $1 is fungible. A token being fungible means that every token is the same and can be used as such.">fungible</Hint> token that follows
          the <a target="_blank" href="https://github.com/ethereum/eips/issues/20">ERC20</a> standard. It makes 1,000,000 tokens with up to 18 decimal places, token name "MyToken", and symbol "TKN". Upon creation / deployment, it grants the deploying wallet the entire supply.
        </p>
        <CodeBlock lang="solidity">{`
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.2/contracts/token/ERC20/ERC20.sol";

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