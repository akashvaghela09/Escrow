const { ethers } = require("hardhat");

async function main() {
    const Escrow = await ethers.getContractFactory(
        "Escrow"   // Contract Name
    );

    // Create new instance
    const newEscrowContract = await Escrow.deploy()

    await newEscrowContract.deployed();
    console.log("Success, Contract Deployed: ", newEscrowContract.address);
}

main()
.then(() => {
    process.exit(0)
})
.catch((err) => {
    console.error(err);
    process.exit(1);
})