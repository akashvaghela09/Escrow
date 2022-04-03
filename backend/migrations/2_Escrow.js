const Escrow = artifacts.require("Escrow");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Escrow);
  const wallet = await Escrow.deployed()
};
