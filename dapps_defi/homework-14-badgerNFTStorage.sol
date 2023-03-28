// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts@4.8.1/token/ERC721/extensions/ERC721URIStorage.sol";

contract BadgerNFT is ERC721URIStorage {

    address public owner;

    constructor() ERC721("BadgerNFT", "BNFT") {
        owner = msg.sender;
    }

    function createToken(uint256 _tokenId) public returns (uint256) {
        string memory tokenURI = "ipfs://bafkreigmnpqiqj7qadt346bfork2oqzrztn7zngl2pqstpwkodslldhwjm";
        _mint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, tokenURI);
        return _tokenId;
    }

}
