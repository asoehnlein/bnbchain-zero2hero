// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

/*
interface Isolution3 {
    function solution(address addr) external view returns (uint256 codeSize);
}
*/

contract L3 {
    function solution(address _addr) external view returns (uint256 _codeSize){
        assembly { _codeSize := extcodesize(_addr) }
        return _codeSize;
    }
}
