// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts@4.8.0/token/ERC20/ERC20.sol";

pragma solidity 0.8.18;

contract BadgerCoin is ERC20 {

    constructor() ERC20("BadgerCoin", "BC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

}
