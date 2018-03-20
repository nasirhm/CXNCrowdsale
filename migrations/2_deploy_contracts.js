var CXNcontract = artifacts.require("./CXNcontract.sol");
var StandardToken = artifacts.require("./token/ERC20/StandardToken.sol")

module.exports = function (deployer) {
    deployer.deploy(CXNcontract,1523426400, 1523926800, 0x627306090abab3a6e1400e9345bc60c78a8bef57, 1e6, StandardToken.new(), 1e7);
}