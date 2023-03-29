// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

pragma solidity 0.8.19;

contract BadgerCoin is ERC20, Pausable, Ownable {

    constructor() ERC20("BadgerCoin", "BC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function pause() external onlyOwner returns (bool) {
        _pause();
        return true;
    }

    function unpause() external onlyOwner returns (bool) {
        _unpause();
        return true;
    }

    function approve(address spender, uint256 amount) public whenNotPaused virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transfer(address to, uint256 amount) public whenNotPaused virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public whenNotPaused virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function burn(address account, uint256 _burnAmount) external whenNotPaused onlyOwner returns (bool){
        _burn(account, _burnAmount);
        return true;
    }

    function mint(address account, uint256 _mintAmount) external whenNotPaused onlyOwner returns (bool){
        _mint(account, _mintAmount);
        return true;
    }

}