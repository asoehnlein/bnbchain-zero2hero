// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.18;

contract DogCoin {
    uint public totalSupply;
    address owner;
    // In order to store balances and match them to different addresses the data type should be of mapping(address => uint)
    // balances variable can be exposed to public by defining it here or writing a seperate function for it
    mapping(address => uint) public balances;

    struct Payment {
        address recipientAddr;
        uint transferAmount;
    }

    mapping(address => Payment[]) public paymentHistory;

    event totalSupplyChange(uint);
    event tokenTransfered(uint,address);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        totalSupply = 2000000;
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    // function returnTotalSupply() public view returns (uint) {
    //     return totalSupply;
    // }

    function increaseTotalSupply() public onlyOwner {
        totalSupply += 1000;
        emit totalSupplyChange(totalSupply);
    }

    // We need the senders address in order to substract their balance when transfering token
    // In addition after emit we want to have a payment history for each users address
    function transferToken(uint _amount, address _recipient) public {
        require(balances[msg.sender] >= _amount);
        balances[_recipient] += _amount;
        balances[msg.sender] -= _amount;

        emit tokenTransfered(_amount,_recipient);

        Payment memory pushPaymentHistory;

        pushPaymentHistory.recipientAddr = _recipient;
        pushPaymentHistory.transferAmount = _amount;

        paymentHistory[msg.sender].push(pushPaymentHistory);
    }

}
