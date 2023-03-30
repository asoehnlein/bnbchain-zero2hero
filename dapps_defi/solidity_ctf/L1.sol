// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

/*
interface Isolution1 {
    function solution(
        uint256[2][2] calldata x, 
        uint256[2][2] calldata y
    ) external pure returns (
        uint256[2][2] memory
    );
}
*/

contract L1 {
    function solution(uint256[2][2] calldata _x, uint256[2][2] calldata _y) external pure returns (uint256[2][2] memory){
        uint256[2][2] memory _val;
        for (uint256 i = 0; i < 2; ++i) {
            for (uint256 j = 0; j < 2; ++j) {
                _val[i][j] = _x[i][j] + _y[i][j];
            }
        }
        return _val;
    }
}
