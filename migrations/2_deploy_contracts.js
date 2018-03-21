var CxNcontract = artifacts.require("./CxNcontract.sol");
var CxNtoken = artifacts.require("./CxNtoken.sol");

module.exports = function (deployer) {
    deployer.deploy(CxNtoken, web3.eth.coinbase);
}