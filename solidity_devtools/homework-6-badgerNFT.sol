// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BadgerNFT is ERC721 {
    constructor() ERC721("BadgerNFT", "BNFT") {}

    function safeMint(address to, uint8 tokenId) public {
        _safeMint(to, tokenId);
    }
}
