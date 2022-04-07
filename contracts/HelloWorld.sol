//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

/// Simple contract to demonstrate the ability to store and retrieve a value via a smart contract
contract HelloWorld {
    uint256 private number;

    /// event emitted when a number is stored
    event StoredNumber(uint256 indexed _number);

    /*
     * Can be called by anyone to store a number
     * @params _number number that is going to be stored
     */
    function storedNumber(uint256 _number) external {
        number = _number;
        emit StoredNumber(_number);
    }

    /*
     * Retrieve the number that is stored
     * @return The number that is stored
     */
    function retrieveNumber() external view returns (uint256) {
        return number;
    }
}
