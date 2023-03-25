// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

pragma solidity 0.8.18;

contract BadgerCoin is ERC20 {

    constructor() ERC20("BadgerCoin", "BC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

}