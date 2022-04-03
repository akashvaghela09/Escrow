const Escrow = artifacts.require("Escrow");   //Contract Name
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("Escrow Contract Testing", async (accounts) => {
    let myEscrow;
    beforeEach(async () => {
        myEscrow = await Escrow.new();
    })

    describe("Create and Update transaction Test cases ::", () => {
        it('Should be able to create transaction', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
        });

        it('Should be able to mark work done complete', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.markComplete(0, {from: accounts[1]});
        });

        it('Revert for mark work done complete if not a receiver', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await expectRevert(myEscrow.markComplete(0), "Not an authorized person to Mark Complete!!")
        });

        it('Revert for mark work done complete if transaction is Already Complete', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.markComplete(0, {from: accounts[1]});
            await expectRevert(myEscrow.markComplete(0, {from: accounts[1]}), "Already Marked as Complete!!")
        });
    })

    describe("approve transaction Test cases ::", () => {
        it('Should be able to approve transaction', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.markComplete(0, {from: accounts[1]});
            await myEscrow.approve(0, {value: 1000});
        });

        it('Revert for approve if not an owner', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.markComplete(0, {from: accounts[1]});
            await expectRevert(myEscrow.approve(0, {from: accounts[1]}), "Not an authorized person to Approve!!")
        });

        it('Revert for approve if transaction is Already Complete', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.markComplete(0, {from: accounts[1]});
            await myEscrow.approve(0, {value: 1000});
            await expectRevert(myEscrow.approve(0, {value: 1000}), "Already Approved and Closed Transaction!!")
        });

        it('Revert for approve if work done is pending', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await expectRevert(myEscrow.approve(0, {value: 1000}), "Work is still pending!!")
        });

        it('Revert if fund amount is more than required', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.markComplete(0, {from: accounts[1]});
            await expectRevert(myEscrow.approve(0, {value: 1600}), "Can't add more than required!!")
        });

        it('Revert if fund amount is less than required', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.markComplete(0, {from: accounts[1]});
            await expectRevert(myEscrow.approve(0, {value: 500}), "Add sufficient fund amount!!")
        });
    })

    describe("Get transaction Test cases ::", () => {
        it('Should be able to get all transaction Data', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.createTransaction("C22", 500, accounts[2]);
            let tx = await myEscrow.getAllData();
            // console.log(tx);
        });

        it('Should be able to get single transaction Data', async () => {
            await myEscrow.createTransaction("C11", 1000, accounts[1]);
            await myEscrow.createTransaction("C22", 500, accounts[2]);
            let tx = await myEscrow.getTransaction(0);
            // console.log(tx);
        });
    })
})