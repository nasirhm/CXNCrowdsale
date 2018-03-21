var CxNcontract = artifacts.require("./CxNcontract.sol");
var CxNtoken = artifacts.require("./CxNtoken.sol");

module.exports = function (deployer) {
    deployer.deploy(CxNtoken, web3.eth.coinbase).then(function() {

        let cap = web3.toWei(3, "ether" );
        let goal = web3.toWei(1, "ether" );
        
        let timeNow = new Date();

        let expiry = timeNow.setMinutes(timeNow.getMinutes() + 5);

        let timestampExpiry = (expiry / 1000).toFixed(0);

        return deployer.deploy(CxNcontract, 1521594000, timestampExpiry, web3.eth.coinbase, cap, CxNtoken.address, goal, web3.eth.accounts[3]);
    });
    
}