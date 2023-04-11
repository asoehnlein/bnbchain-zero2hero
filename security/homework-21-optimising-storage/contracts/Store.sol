// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Store {

    uint256 public number;
    mapping (address=>uint256) balances;
    bool flag1;
    bool flag2;
    bool flag3;
    uint8 index;
    address admin;
    address admin2;
    payments[8] topPayments;

    struct payments {
        uint256 initialAmount;
        uint256 finalAmount;
        uint256 amount;
        uint8 paymentType;
        bool valid;
        bool checked;
        address sender;
        address receiver;
    }

    constructor(){

    }


    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}