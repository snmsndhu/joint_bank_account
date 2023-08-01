// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

contract BankAccount {

    event Deposit (address indexed user, uint indexed accountId, uint value, uint timestamp);
    event WithdrawRequested(address indexed user, uint indexed accountId, uint indexed withdrawId, uint amount, uint timestamp);
    event Withdraw(uint indexed withdrawId, uint timestamp);
    event AccountCreated(address[] owners, uint indexed id, uint timestamp);

    struct WithdrawRequest{
        address user;
        uint amount;
        uint approvals;
        mapping(address => bool) ownersApproved;
        bool approved;
    }
    struct Account {
        address[] owners;
        uint balance;
        mapping(uint => WithdrawRequest) withdrawRequests;
    }

    mapping(uint => Account) accounts;
    mapping(address => uint[]) userAccounts;

    uint nextAccountId;
    uint nextWithdrawId;

    function deposit(uint accountId) external payable {

    }

    function createAccount(address[] calldata otherOwners) external {

    }

   
}