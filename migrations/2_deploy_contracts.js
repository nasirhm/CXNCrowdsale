var CXNcontract = artifacts.require("./CXNcontract.sol");

module.exports = function (deployer) {
    deployer.deployed(CXNcontract);
}