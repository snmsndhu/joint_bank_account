// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

contract BankAccount {

    event Deposit (address indexed user, uint indexed accountId, uint value, uint timestamp);
    event WithdrawRequest(address indexed user, uint indexed accountId, uint indexed withdrawId, uint amount, uint timestamp);
    constructor() {
        
    }
}