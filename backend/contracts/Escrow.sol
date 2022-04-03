//SPDX-License-Identifier: MIT
// 0xb926B456367863619D544d621aa6B7B27C50d938

pragma solidity ^0.8.4;

contract Escrow {

    struct Transaction {
        uint256 id;
        string title;
        bool workDone;
        bool approved;
        uint256 amount;
        address payable receiver;
        address sender;
    }
    
    uint256 internal nextId = 0;
    Transaction[] internal transactionArr;

    function getAllData () public view returns (Transaction[] memory) {
        return transactionArr;
    }

    function getTransaction (uint _id) public view returns (uint256, string memory, bool, bool, uint256, address payable, address) {
        return (
            transactionArr[_id].id,
            transactionArr[_id].title,
            transactionArr[_id].workDone,
            transactionArr[_id].approved,
            transactionArr[_id].amount,
            transactionArr[_id].receiver,
            transactionArr[_id].sender
        );
    }

    function createTransaction (string memory _title, uint256 _amount, address payable _receiver) public  {
        transactionArr.push(
            Transaction(
                nextId, 
                _title, 
                false, 
                false, 
                _amount, 
                _receiver, 
                msg.sender
            )
        );

        nextId += 1;
    }

    function markComplete (uint256 _id) public checkIfReceiver(_id) checkWorkStatus(_id){
        transactionArr[_id].workDone = true;
    }

    function approve (uint256 _id) public checkIfOwner(_id) checkFunds(_id) checkContractStatus(_id) payable {
        address payable to = transactionArr[_id].receiver;
        uint256 payment = transactionArr[_id].amount;

        to.transfer(payment);

        transactionArr[_id].approved = true;
    }

    modifier checkIfOwner(uint256 _id) {
        require(transactionArr[_id].sender == msg.sender, "Not an authorized person to Approve!!");
        _;
    }

    modifier checkIfReceiver(uint256 _id) {
        require(transactionArr[_id].receiver == msg.sender, "Not an authorized person to Mark Complete!!");
        _;
    }

    modifier checkFunds(uint256 _id) {
        if(msg.value > transactionArr[_id].amount){
            revert("Can't add more than required!!");
        } else if (msg.value < transactionArr[_id].amount){
            revert("Add sufficient fund amount!!");
        }
        _;
    }
    
    modifier checkContractStatus(uint256 _id) {
        if(transactionArr[_id].workDone == false){
            revert("Work is still pending!!");
        } else if (transactionArr[_id].approved == true){
            revert("Already Approved and Closed Transaction!!");
        }
        _;
    }

    modifier checkWorkStatus(uint256 _id) {
        if(transactionArr[_id].approved == true){
            revert("Already Approved and Closed Transaction!!");
        } else if (transactionArr[_id].workDone == true){
            revert("Already Marked as Complete!!");
        }
        _;
    }
}