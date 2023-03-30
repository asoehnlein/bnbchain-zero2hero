// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

/*
  interface Isolution2 {
    function solution(uint256[10] calldata unsortedArray) external returns (uint256[10] memory sortedArray);
}
*/

contract L2 {
    function solution(uint256[10] calldata _unsortedArray) external pure returns (uint256[10] memory _sortedArray){
        uint256[10] memory _tempArray = _unsortedArray;
        
        for (uint i = 0; i <= 9; i++) {
            uint _index = i;
            for (uint j = i + 1; j < 10; j++) {
                if (_tempArray[j] < _tempArray[_index]) {
                    _index = j;
                }
            }
            if (_index != i) {
                uint temp = _tempArray[i];
                _tempArray[i] = _tempArray[_index];
                _tempArray[_index] = temp;
            }
        }
        
        _sortedArray = _tempArray;
    }
}
